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
import { useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { randomUUID } from 'expo-crypto';
import { analysisNLP } from '@/services/nlpAnalysis.service';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import { shouldShowLessonAd } from '@/monetization/ads.frequency';
import { interstitialController } from '@/monetization/ads.service';

const attemptId = randomUUID();

const ListeningLessons = () => {
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const userId: string = authSnapshot.getUserId() ?? "";
  const { colors } = useTheme();
  const { start, stop, isRunning } = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();

  const { data: listeningLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const { resultHandler } = useListening();
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeLessonOrderRef = React.useRef<number>(0);
  const currentLessonRef = React.useRef<ListeningSessionType | null>(null);

  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  const lessonData = React.useMemo<ListeningSessionType[]>(() => {
    if( !listeningLessons ) return [];
    return listeningLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [listeningLessons]);

  // Handlers
  const reset = React.useCallback(() => {
    setTextContent("");
    setError("");
    setLoading(false);
  }, []);

  const analyzeListeningHandler = React.useCallback(async (expectedText: string) => {
    if(!textContent) {
      setError("No expected text found!");
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

  const onLessonComplete = React.useCallback(async (lesson: ListeningSessionType, score: number) => {
    if(!userId) return;
    try {
      const duration_ms = stop();
      const sessionType = slug as SessionType;
      const sessionKey = `${unitId}:${sessionType}`;
      const lessonOrder = activeLessonOrderRef.current;
      const isFinalLesson = lessonOrder === lessonData.length - 1;
  
      const result = await lessonCompletionChain({
        categoryId: categoryId as string,
        unitId: unitId as string,
        userId,
        sessionKey,
        performanceSessionKey,
        lessonId: lesson?.id ?? lesson?._id,
        lessonOrder: lessonOrder,
        sessionType,
        lessonType: sessionType,
        score: score,
        duration_ms,
        isFinalLesson
      });
      if(result?.sessionCompleted) triggerSessionCompletion(performanceSessionKey);
      if(result?.streakUpdated && result?.streakPayload) triggerStreak(result.streakPayload);
    }
    catch(error) {
      console.error("onLessonComplete error:", error)
    }
  }, [userId, slug, lessonData?.length, stop]);
  
  const lessonCompletionHandler = React.useCallback( async (result: any) => {
    try {
      const score = result!.similarity ? result!.similarity*100 : 0;
      await onLessonComplete(currentLessonRef.current!, score);
      resultHandler(result!);
      reset();

      // Use After 3 Lessons Completed
      if( await shouldShowLessonAd() ) {
        interstitialController.show(() => {
          goToNextRef.current?.();
        });
      }
      else {
        goToNextRef.current?.();
      }

      resolveCurrent();
    }
    catch(error) {
      console.error("lessonCompletionHandler error:", error)
    }
  }, [ reset, onLessonComplete, resultHandler ]);
  
  const activeItemChangeHandler = React.useCallback(({ item, index, goToNext }: {item: ListeningSessionType, index: number, goToNext: () => void}) => {
    activeLessonOrderRef.current = index;
    currentLessonRef.current = item;
    goToNextRef.current = goToNext;
  }, []);

  // Timer
  React.useEffect(() => {
    if(!isRunning) start();
  }, [isRunning]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

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