import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionType, WritingSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import { analysisNLP } from '@/services/nlp.service';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import { toastError } from '@/services/toast.service';
import { useNetwork } from '@/context/NetworkContext';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';
// import { interstitialController } from '@/monetization/ads.service';

const WritingSession = () => {
  const { colors } = useTheme();
  const { isOnline } = useNetwork();
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const { data: readingLessons, isLoading, isFetching, error: writingError } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  
  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  const lessonData = React.useMemo<WritingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<WritingSessionType>({
    userId,
    categoryId: categoryId as string,
    unitId: unitId as string,
    slug: slug as SessionType,
    lessonCount: lessonData.length,
    performanceSessionKey,
    onSessionComplete: triggerSessionCompletion,
    onStreakUpdate: triggerStreak,
  });

  // Handlers
  const reset = React.useCallback(() => {
    setTextContent("");
    setError("");
    setLoading(false);
  }, []);

  const analyzeWritingHandler = React.useCallback(async (expectedText: string) => {
    if (!isOnline) {
      toastError(
        "You're offline — your answer can't be checked right now. Your progress will be saved locally and sync when you reconnect."
      );
      return;
    }
    if(!textContent.trim()) {
      setError("Please write your answer first!");
      return;
    }
    if (!expectedText) {
      setError("No expected text found!");
      return;
    }

    try {
      setLoading(true);
      const data = await analysisNLP( expectedText, textContent );
      if( data ) {
        triggerLessonResult({
          actualQuery: expectedText,
          result: data,
          onRetry: reset,
          onContinue: async () => onContinue(data),
        });
      }
      console.log("data:", data);
    } catch (err: any) {
      console.error(err);
      setError("Speech analysis failed");
    } finally {
      setLoading(false);
    }
  }, [textContent, analysisNLP, triggerLessonResult, reset]);

  const onContinue = React.useCallback(async (result: any) => {
    const score = (result && result!.similarity) ? result!.similarity*100 : 0;
    await onLessonComplete(currentLessonRef.current!, score);
    reset();
    goToNextRef?.current && goToNextRef.current?.();
    // Use After 3 Lessons Completed
    // if( await shouldShowLessonAd() ) {
    //   interstitialController.show(() => {
    //     goToNextRef.current?.();
    //   });
    // }
    // else {
    //   goToNextRef.current?.();
    // }
    
    resolveCurrent();
  }, [reset, onLessonComplete, resolveCurrent]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />);
  if (writingError || !lessonData?.length) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={writingError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
      />
    );
  }

  return (
    <SessionLayout<WritingSessionType>
      keyboardAvoid={true}
      preFetchedData={lessonData}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item }) => {
        const onCheckHandler = () => analyzeWritingHandler(item?.phrase);
        
        return (
          <View style={styles.flex}>
            {/* Content */}
            <View style={styles.flex}>
              {/* Title Section */}
              <ChallengeScreenTitle title="Listen And Write." />
              {/* Writing Section Starts */}
              <ChallengeScreenQuerySection
                query={item.meaning}
                lang="en-US"
                style={styles.query}
              />

              <View style={styles.flex}/>

            </View>

            { error && (<Error text={error} />) }

            {/* Writing Text Field/Input/Area Section */}
            <TextInputComponent
              maxLength={500}
              placeholder='Write here...'
              value={textContent}
              onChange={setTextContent}
              onBlur={() => {}}
              placeholderTextColor={colors.placeholderColor}
              inputMode="text"
              contentContainerStyle={styles.textInput}
            />

            {/* Action Buttons */}
            <ActionPrimaryButton
              buttonTitle='Check'
              onSubmit={onCheckHandler}
              isLoading={loading}
              disabled={textContent.length === 0}
            />

          </View>
        );
      }}
    </SessionLayout>
  );
}

export default WritingSession;

const styles = StyleSheet.create({
  flex: {flex: 1},
  query: {width: '80%'},
  textInput: {marginBottom: 20}
});