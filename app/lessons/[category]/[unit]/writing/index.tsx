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
import { useLessons } from '@/hooks/useLessons';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { analysisNLP } from '@/services/nlpAnalysis.service';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import { shouldShowLessonAd } from '@/monetization/ads.frequency';
import { interstitialController } from '@/monetization/ads.service';

const attemptId = randomUUID();

const WritingSession = () => {
  const { colors } = useTheme();
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const { start, stop, isRunning } = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const { data: readingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );

  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeLessonOrderRef = React.useRef<number>(0);
  const currentLessonRef = React.useRef<WritingSessionType | null>(null);
  
  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  const lessonData = React.useMemo<WritingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  // Handlers
  const reset = React.useCallback(() => {
    setTextContent("");
    setError("");
    setLoading(false);
  }, []);

  const onLessonComplete = React.useCallback(async (lesson: WritingSessionType, score: number) => {
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
        lessonId: lesson.id ?? lesson?._id,
        lessonOrder: lessonOrder,
        sessionType,
        lessonType: sessionType,
        score: score,
        duration_ms,
        isFinalLesson
      });

      if( result?.sessionCompleted ) triggerSessionCompletion( performanceSessionKey );
      if( result?.streakUpdated && result?.streakPayload ) {
        console.log("TRIGGERING STREAK MODAL");
        triggerStreak( result.streakPayload );
      }
    }
    catch(error) {
      console.error("onLessonComplete error:", error)
    }
  }, [userId, slug, userId, lessonData?.length, stop]);
  
  const analyzeWritingHandler = React.useCallback(async (expectedText: string) => {
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
    // goToNextRef?.current && goToNextRef.current?.();
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
  }, [reset, onLessonComplete, resolveCurrent]);

  const activeItemChangeHandler = React.useCallback(({ item, index, goToNext }: {item: WritingSessionType, index: number, goToNext: () => void}) => {
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