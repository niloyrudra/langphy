import React from 'react';
import { View, StyleSheet } from 'react-native'
import STYLES from '@/constants/styles';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
import { SessionType, SpeakingSessionType, SpeechResultType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import RecorderActionButton from '@/components/recorder-components/RecorderActionButton';
import useSpeechRecorder from '@/hooks/useSpeechRecorder';
import { useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
// import { useLessonTimer } from '@/hooks/useLessonTimer';
// import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import RefreshPlayer from '@/components/RefreshPlayer';
import { useSessionLesson } from '@/hooks/useSessionLesson';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';
// import { interstitialController } from '@/monetization/ads.service';

const SpeakingLessons = () => {
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const { triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();

  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;

  const { data: speakingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  
  const lessonData = React.useMemo<SpeakingSessionType[]>(() => {
    if( !speakingLessons ) return [];
    return speakingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [speakingLessons]);

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
    try {
      if ( isCompletingRef.current ) return;
      isCompletingRef.current = true;

      // ✅ result comes in as param — no stale closure
      const score = speechResult?.analysis?.similarity
        ? Math.round(speechResult.analysis.similarity * 100)
        : 0;

      console.log("Speaking Score:", score, speechResult?.analysis?.similarity);

      // ✅ complete the lesson first (this may trigger session/streak modals)
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

      // ✅ advance to next lesson
      goToNextRef?.current?.();

      // ✅ reset AFTER everything — don't call resolveCurrent here,
      // lessonCompletionChain handles the modal queue via triggerSessionCompletion
      reset();
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

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

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
              
              <View style={[styles.container]}>
                {/* Query Listen with Query Text Section */}
                <SpeakerComponent
                  speechContent={item.phrase}
                  speechLang='de-DE'
                  style={styles.phrase}
                />
                                          
                {/* Tappable Words with ToolTip */}
                <NLPAnalyzedPhase
                  phrase={item.phrase}
                  onHandler={(tooltip: any) => setTooltip(tooltip)}
                  wordRefs={wordRefs}
                  containerRef={containerRef}
                  textContainerStyle={styles.nlpWidth}
                />
              </View>

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