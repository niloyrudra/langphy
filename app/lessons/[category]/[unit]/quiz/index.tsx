import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import QuizOptionCardList from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { getCardContainerWidth } from '@/utils';
import { SessionType, QuizSessionType, SelectiveResultType } from '@/types';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import { useTheme } from '@/theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import LangphyText from '@/components/text-components/LangphyText';
import { interstitialController } from '@/monetization/ads.service';
import { shouldShowLessonAd } from '@/monetization/ads.frequency';

const attemptId = randomUUID();

const QuizSession = () => {
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const userId = authSnapshot.getUserId() ?? "";
  const {start, stop, isRunning} = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const {colors} = useTheme();
  const cardWidth = getCardContainerWidth();

  const { data: quizLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeQuizQuestionOrderRef = React.useRef<number>(0);
  const currentQuizQuestionRef = React.useRef<QuizSessionType | null>(null);

  const quizzes = React.useMemo<QuizSessionType[]>(() => {
    if( !quizLessons ) return [];
    return quizLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [quizLessons]);
  
  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string>('')

  const handleSelect = React.useCallback((option: string) => {
    setSelectedOption(option);
    setIsSelectionHappened(true);
  }, []);

  const reset = React.useCallback(() => {
    setSelectedOption(null);
    setIsSelectionHappened(false);
    setError("");
  }, []);

  const onQuizQuestionCompletion = React.useCallback( async (quizQuestion: QuizSessionType, score: number) => {
    if( !userId ) return;
    try {
      const duration_ms = stop();
      const sessionType = slug as SessionType;
      const sessionKey = `${unitId}:${slug}`;
      const quizQuestionOrder = activeQuizQuestionOrderRef.current;
      const isFinalLesson = quizQuestionOrder === quizzes.length - 1;

      const result = await lessonCompletionChain({
        categoryId: categoryId as string,
        unitId: unitId as string,
        userId,
        sessionKey,
        performanceSessionKey,
        lessonId: quizQuestion.id ?? quizQuestion?._id,
        lessonOrder: quizQuestionOrder,
        sessionType,
        lessonType: sessionType,
        score,
        duration_ms,
        isFinalLesson
      });
      if(result?.sessionCompleted) triggerSessionCompletion(performanceSessionKey);
      if(result?.streakUpdated && result?.streakPayload) triggerStreak(result.streakPayload);
    }
    catch(error) {
      console.error("onQuizQuestionCompletion error:", error);
    }
  }, [userId, slug, unitId, quizzes?.length, stop]);

  const checkAnswerHandler = React.useCallback((answer: string) => {
    const isCorrect: boolean = selectedOption === answer;
    const resultPayload = {
      isCorrect: isCorrect,
      answered: selectedOption || "",
      feedback: {
        label: isCorrect ? "Correct" : "Incorrect",
        color: isCorrect ? "green" : "red"
      }
    } as SelectiveResultType;

    triggerLessonResult({
      result: resultPayload,
      onContinue: async () => {
        try {
          const score = resultPayload.isCorrect ? 100 : 0;
          await onQuizQuestionCompletion(currentQuizQuestionRef.current!, score);
          reset();
          // goToNextRef.current?.();

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
          console.error("Quiz Question Completion error:", error);
        }
      },
      onRetry: reset
    });
  }, [ selectedOption, triggerLessonResult, reset, onQuizQuestionCompletion, resolveCurrent ]);
  
  const activeItemChangeHandler = React.useCallback(({item, index, goToNext}: {item: QuizSessionType, index: number, goToNext: () => void}) => {
    activeQuizQuestionOrderRef.current = index;
    currentQuizQuestionRef.current = item;
    reset();
    // You can use goToNextRef.current() to navigate to the next item from outside
    goToNextRef.current = goToNext;
  }, [ reset ])

  // Timer
  React.useEffect(() => {
    if(!isRunning) start();
  }, [isRunning]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <SessionLayout<QuizSessionType>
      preFetchedData={quizzes}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item }) => (
        <View style={styles.flex}>
          <View style={styles.flex}>
            {/* Title Section */}
            <ChallengeScreenTitle title="Choose The Correct Answer." />
            {/* QUIZ Section Starts */}
            <View>
              <View style={styles.questionWrapper}>
                <MaterialIcons name="quiz" size={32} color={colors.primary} />
                <LangphyText weight="bold" style={[styles.question, {color: colors.primary}]}>
                  {item?.question}
                </LangphyText> 
              </View>

              {/* QUIZ Answer Options */}
              <QuizOptionCardList
                height={cardWidth / 2} 
                options={Array.isArray(item?.options) && item.options.length > 0 ? item.options : ["", "", "", ""]}
                answer={item?.answer || ""}
                selectedOption={selectedOption || ""}
                onSelect={handleSelect}
                isSelectionHappened={isSelectionHappened}
              />
            </View>
            {/* QUIZ Section Ens */}
          </View>

          {error && (<Error text={error} />)}

          {/* Action Buttons */}
          <ActionPrimaryButton
            buttonTitle='Check'
            onSubmit={() => checkAnswerHandler(item?.answer)}
            disabled={ !selectedOption ? true : false}
          />
        </View>
      )}
    </SessionLayout>
  );
}

export default QuizSession;

const styles = StyleSheet.create({
  flex: {flex:1},
  questionWrapper: {
    flexDirection :"row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 10,
    gap: 20
  },
  question: {
    fontSize: 24,
    wordWrap: 'break-word',
    flexShrink: 1,
  }
});