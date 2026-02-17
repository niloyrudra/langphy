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
import SessionResultModal from '@/components/modals/SessionResultModal';
import { useTheme } from '@/theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';

const attemptId = randomUUID();

const QuizSession = () => {
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const userId = authSnapshot.getUserId() ?? "";
  const {start, stop, isRunning} = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerSessionCompletion, triggerStreak } = useCelebration();
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
  const [ result, setResult ] = React.useState<SelectiveResultType | null>(null)

  const handleSelect = React.useCallback((option: string) => {
    setSelectedOption( prevValue => prevValue = option);
    setIsSelectionHappened( prevValue => prevValue = true);
  }, []);

  const reset = React.useCallback(() => {
    setSelectedOption("");
    setIsSelectionHappened(false);
    setResult(null);
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

  const onContinue = React.useCallback( async () => {
    try {
      const score = result?.isCorrect ? 100 : 0;
      await onQuizQuestionCompletion( currentQuizQuestionRef.current!, score );
      reset();
      goToNextRef?.current && goToNextRef.current?.();
    }
    catch(error) {
      console.error("Quiz Question Completion error:", error);
    }
  }, [reset, result, onQuizQuestionCompletion]);

  const sessionCompletionModalHandler = React.useCallback(() => triggerSessionCompletion(performanceSessionKey), [triggerSessionCompletion]);
  
  const activeItemChangeHandler = React.useCallback(({item, index, goToNext}: {item: QuizSessionType, index: number, goToNext: () => void}) => {
    activeQuizQuestionOrderRef.current = index;
    currentQuizQuestionRef.current = item;
    reset();
    // You can use goToNextRef.current() to navigate to the next item from outside
    goToNextRef.current = goToNext;
  }, [reset])

  // Timer
  React.useEffect(() => {
    if(!isRunning) start();
  }, [isRunning]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<QuizSessionType>
        preFetchedData={quizzes}
        onSessionComplete={sessionCompletionModalHandler}
        onActiveItemChange={activeItemChangeHandler}
      >
        {({ item }) => {

          const onCheckHandler = () => {
            const isCorrect: boolean = selectedOption === item?.answer;
            setResult({
              isCorrect: isCorrect,
              answered: selectedOption || "",
              feedback: {
                label: isCorrect ? "Correct" : "Incorrect",
                color: isCorrect ? "green" : "red"
              }
            });
          };

          return (
            <View style={styles.flex}>
              <View style={styles.flex}>
                {/* Title Section */}
                <ChallengeScreenTitle title="Choose The Correct Answer." />

                {/* QUIZ Section Starts */}
                <View>
                  <View style={styles.questionWrapper}>
                    <MaterialIcons name="quiz" size={32} color={colors.primary} />
                    <Text style={[styles.question, {color: colors.primary}]}>
                      {item?.question}
                    </Text> 
                  </View>

                  {/* QUIZ Answer Options */}
                  <QuizOptionCardList
                    height={cardWidth / 2} 
                    options={Array.isArray(item?.options) && item.options.length > 0 ? item.options : ["", "", "", ""]}
                    answer={item?.answer || ""}
                    selectedOption={selectedOption || ""}
                    onSelect={handleSelect}
                    isSelectionHappened={isSelectionHappened} />
                </View>
                {/* QUIZ Section Ens */}
              </View>

              {error && (<Error text={error} />)}

              {/* Action Buttons */}
              <ActionPrimaryButton
                buttonTitle='Check'
                onSubmit={onCheckHandler}
                disabled={ !selectedOption ? true : false}
              />
            </View>
          );
        }}
      </SessionLayout>

      {
        result && (<SessionResultModal
          isVisible={result ? true : false}
          result={result!}
          onContinue={onContinue}
          onModalVisible={reset}
          onRetry={reset}
        />)
      }
    </>
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
    fontWeight: '700',
    wordWrap: 'break-word',
    flexShrink: 1,
  }
});