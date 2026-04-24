import React from 'react';
import { View, StyleSheet } from 'react-native'
import STYLES from '@/constants/styles';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionType, SpeakingSessionType, SpeechResultType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import RecorderActionButton from '@/components/recorder-components/RecorderActionButton';
import useSpeechRecorder from '@/hooks/useSpeechRecorder';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import RefreshPlayer from '@/components/RefreshPlayer';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import { useNetwork } from '@/context/NetworkContext';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import { toastError } from '@/services/toast.service';
import SpeakerWithQuestion from '@/components/lesson-components/SpeakerWithQuestion';
import { parseLessonData } from '@/utils';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';
// import { interstitialController } from '@/monetization/ads.service';

const SpeakingLessons = () => {
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const { triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const { isOnline } = useNetwork();

  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;

  const { data: speakingLessons, isLoading, isFetching, error: speakingError, refetch } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  
  const lessonData = React.useMemo<SpeakingSessionType[]>(
    () => parseLessonData<SpeakingSessionType>( speakingLessons ),
    [speakingLessons]
  );

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<SpeakingSessionType>({
    userId,
    categoryId: categoryId as string,
    unitId: unitId as string,
    slug: slug as SessionType,
    lessonCount: lessonData.length,
    performanceSessionKey,
    onSessionComplete: triggerSessionCompletion,
    onStreakUpdate: triggerStreak,
  });

  // ── Recorder ──────────────────────────────────────────────────────────────
  const {
    isRecording,
    isPaused,
    isPlaying,
    startRecording,
    stopRecording,
    play,
    reset,
    analyzeSpeech,
    isRecordingDone,
    loading,
    error,
  } = useSpeechRecorder();

  // Handlers
  // Guard against double-submission (rapid taps on Check)
  const isCompletingRef = React.useRef<boolean>(false);

  const onContinue = React.useCallback(async (speechResult: SpeechResultType) => {
    if ( isCompletingRef.current ) return;
    isCompletingRef.current = true;

    try {
      // ✅ result comes in as param — no stale closure
      const score = speechResult?.analysis?.similarity
        ? Math.round(speechResult.analysis.similarity * 100)
        : 0;

      console.log("Speaking Score:", score, speechResult?.analysis?.similarity);

      // 1️⃣ Complete the lesson (may enqueue session/streak modals)
      await onLessonComplete(currentLessonRef.current!, score);

      // Use After 3 Lessons Completed
      // if( await shouldShowLessonAd() ) {
      //   interstitialController.show(() => {
      //     goToNextRef.current?.();
      //   });
      // }
      // else {
      //   goToNextRef.current?.();
      // }

      // 2️⃣ Advance to the next lesson immediately
      goToNextRef?.current?.();

      // ✅ reset AFTER everything — don't call resolveCurrent here,
      // lessonCompletionChain handles the modal queue via triggerSessionCompletion
      // 3️⃣ Reset recorder state — do NOT await, let it run in background.
      //    Awaiting reset() blocks the UI and causes the recorder to be
      //    re-prepared before the next lesson's useEffect has settled.
      reset().catch(console.warn);

      // 4️⃣ Resolve the celebration modal LAST — this is what dismisses
      //    the current modal and potentially shows the next one.
      //    Must come after goToNext so the FlatList has already advanced.
      resolveCurrent();

    }
    catch (error) {
      console.error("Speaking lesson Completion error:", error);
    }
    finally {
      isCompletingRef.current = false;
    }
  }, [onLessonComplete, reset, resolveCurrent]); // ✅ no result dependency needed anymore

  const onRefresh = React.useCallback(() => {
    reset();
    resolveCurrent();
  }, [reset, resolveCurrent]);

  const recorderHandler = React.useCallback(() => {
    if (isRecordingDone) play();
    else if (isRecording) stopRecording();
    else startRecording();
  }, [isRecordingDone, isRecording, play, stopRecording, startRecording]);

  // ── Auto-retry when network returns ──────────────────────────────────────
  const hasData = !!speakingLessons?.length;
  React.useEffect(() => {
      if (isOnline && !hasData) refetch();
  }, [isOnline]);

  const onDataRefresh = React.useCallback(async () => {
      try {
        await refetch();
      } finally {
        // setRefreshing(false);
      }
  }, [refetch]);

  if (isLoading || (isFetching && !hasData)) return <LoadingScreenComponent />;
  if ( speakingError || !hasData ) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={speakingError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
        onRetry={onDataRefresh}
      />
    );
  }

  return (
    <SessionLayout<SpeakingSessionType>
      preFetchedData={lessonData}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item, wordRefs, containerRef, setTooltip }) => (
        <>
          <View style={styles.flex}>
            {/* Title Section */}
            <ChallengeScreenTitle title="Speak This Sentence" />
            {/* Writing Section Starts */}
            <View style={styles.taskContainer}>
              
              <SpeakerWithQuestion
                phrase={item?.phrase}
                wordRefs={wordRefs}
                containerRef={containerRef}
                handleTooltip={(tooltip: any) => setTooltip(tooltip)}
              />

              <View style={styles.flex} />
  
              {/* Writing Text Field/Input/Area Section */}
              <View style={STYLES.childContentCentered}>

                <View style={styles.actionButtonContainer}>
                  {isRecordingDone && (<RefreshPlayer onPress={onRefresh} />)}
                  <RecorderActionButton
                    isActive={!isRecording}
                    showRipple={false}
                    isRecording={isRecording}
                    isRecorded={isRecordingDone}
                    isPaused={isPaused}
                    isPlaying={isPlaying}
                    onActionHandler={recorderHandler}
                  />
                </View>

                { error && (<Error text={error} />) }

              </View>
            </View>
          </View>
  
          {/* Action Buttons */}
          <ActionPrimaryButton
            buttonTitle='Check'
            onSubmit={() => {
              if (!isOnline) {
                toastError(
                  "You're offline — speech analysis needs a connection."
                );
                return;
              }
              analyzeSpeech(item.phrase.trim(), onContinue);
            }}
            isLoading={loading}
            disabled={!isRecordingDone || loading}
          />
        </>
      )}
    </SessionLayout>
  );
}

export default SpeakingLessons;

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    marginTop: 30,
    marginBottom: 20,
    position: 'relative',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    gap: 20
  },
  actionButtonContainer: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  phrase: {
    alignItems: "flex-start"
  },
  taskContainer: {
    flex:1,
    marginBottom: 80
  },
  nlpWidth: {width: '80%'}
})