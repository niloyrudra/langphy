import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionType, ListeningSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import TaskAllocation from '@/components/listening-components/TaskAllocation';
import { useListening } from '@/context/ListeningContext';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import { analysisNLP } from '@/services/nlp.service';
import { toastError } from '@/services/toast.service';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import { useNetwork } from '@/context/NetworkContext';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';
// import { interstitialController } from '@/monetization/ads.service';

const ListeningLessons = () => {
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const { colors } = useTheme();
  const { isOnline } = useNetwork();

  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();

  const { data: listeningLessons, isLoading, isFetching, error: listeningError } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  
  const { resultHandler } = useListening();

  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  const lessonData = React.useMemo<ListeningSessionType[]>(() => {
    if( !listeningLessons ) return [];
    return listeningLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [listeningLessons]);

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<ListeningSessionType>({
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
    // toastSuccess("Lesson Reset")
  }, []);

  const analyzeListeningHandler = React.useCallback(async (expectedText: string) => {
    if (!isOnline) {
      toastError("You're offline — your answer can't be checked right now. Your progress will be saved locally and sync when you reconnect.");
      return;
    }
    if(!textContent) {
      setError("No expected text found!");
      toastError("No expected text found!");
      return;
    }
    if (!expectedText) {
      setError("No expected text found!");
      toastError("No expected text found!");
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
          onContinue: async () => lessonCompletionHandler(data)
        });
      }

    } catch (err: any) {
      console.error(err);
      setError("Speech analysis failed");
    } finally {
      setLoading(false);
    }
  }, [textContent, analysisNLP, triggerLessonResult, reset, setError, setLoading]);

  const lessonCompletionHandler = React.useCallback( async (result: any) => {
    try {
      const score = result!.similarity ? result!.similarity*100 : 0;
      await onLessonComplete(currentLessonRef.current!, score);
      resultHandler(result!);
      reset();

      // // Use After 3 Lessons Completed
      // if( await shouldShowLessonAd() ) {
      //   interstitialController.show(() => {
      //     goToNextRef.current?.();
      //   });
      // }
      // else {
      //   goToNextRef.current?.();
      // }
      goToNextRef.current?.();

      resolveCurrent();
    }
    catch(error) {
      console.error("lessonCompletionHandler error:", error)
    }
  }, [ reset, onLessonComplete, resultHandler ]);
  
  if( isLoading || isFetching ) return (<LoadingScreenComponent />);
  if (listeningError || !lessonData.length) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={listeningError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
      />
    );
  }

  return (
    <SessionLayout<ListeningSessionType>
      keyboardAvoid={true}
      preFetchedData={lessonData}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item }) => {
        const onCheckHandler = () => analyzeListeningHandler( item.phrase );
        return (
          <View style={styles.flex}>
            {/* Content */}
            <TaskAllocation
              taskTitle={'Listen and Write afterwards.'}
              taskPhrase={item.phrase}
              rippleSize={150}
            />

            {error && (<Error text={error} />)}

            {/* Writing Text Field/Input/Area Section */}
            <TextInputComponent
              maxLength={500}
              placeholder='Write here...'
              value={textContent}
              onChange={setTextContent}
              placeholderTextColor={colors.placeholderColor}
              inputMode="text"
              onBlur={() => {}}
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

export default ListeningLessons;

const styles = StyleSheet.create({
  flex: {flex: 1},
  textInput: {marginBottom: 20}
});