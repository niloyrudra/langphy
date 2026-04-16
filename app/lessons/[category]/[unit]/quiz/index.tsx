import React from 'react';
import { StyleSheet, View } from 'react-native'
import QuizOptionCardList from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { getCardContainerWidth } from '@/utils';
import { SessionType, QuizSessionType, SelectiveResultType } from '@/types';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import { useTheme } from '@/theme/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import LangphyText from '@/components/text-components/LangphyText';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
// import { interstitialController } from '@/monetization/ads.service';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';

const QuizSession = () => {
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId = authSnapshot.getUserId() ?? "";
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const {colors} = useTheme();
  const cardWidth = getCardContainerWidth();

  const { data: quizLessons, isLoading, isFetching, error: quizError } = useLessons( categoryId as string, unitId as string, slug as SessionType );

  const quizzes = React.useMemo<QuizSessionType[]>(() => {
    if( !quizLessons ) return [];
    return quizLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [quizLessons]);
  
  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string>('')

  const getOptions = React.useCallback((item: QuizSessionType): [string, string, string, string] => {
    const options = Array.isArray(item?.options) && item.options.length > 0 ? item.options : ["", "", "", ""];
    return [options[0] || "", options[1] || "", options[2] || "", options[3] || ""] as [string, string, string, string];
  }, []);

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<QuizSessionType>({
    userId,
    categoryId: categoryId as string,
    unitId: unitId as string,
    slug: slug as SessionType,
    lessonCount: quizzes.length,
    performanceSessionKey,
    onSessionComplete: triggerSessionCompletion,
    onStreakUpdate: triggerStreak,
  });

  // Handlers
  const handleSelect = React.useCallback((option: string) => {
    setSelectedOption(option);
    setIsSelectionHappened(true);
  }, []);

  const reset = React.useCallback(() => {
    setSelectedOption(null);
    setIsSelectionHappened(false);
    setError("");
  }, []);

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
          await onLessonComplete(currentLessonRef.current!, score);
          reset();
          goToNextRef.current?.();

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
        }
        catch(error) {
          console.error("Quiz Question Completion error:", error);
        }
      },
      onRetry: reset
    });
  }, [ selectedOption, triggerLessonResult, reset, onLessonComplete, resolveCurrent ]);
  
  if( isLoading || isFetching ) return (<LoadingScreenComponent />)
  if (quizError || !quizLessons?.length) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={quizError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
      />
    );
  }

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
                <View style={[styles.queryIcon, {backgroundColor: colors.cardIconBackgroundColor}]}>
                  <AntDesign name="question" size={20} color={colors.text} />
                </View>
                <LangphyText weight="semibold" style={[styles.question, {color: colors.text}]}>
                  {item?.question}
                </LangphyText> 
              </View>

              {/* QUIZ Answer Options */}
              <QuizOptionCardList
                height={cardWidth / 2} 
                options={getOptions(item)}
                answer={item?.answer ?? ""}
                selectedOption={selectedOption ?? ""}
                onSelect={handleSelect}
                isSelectionHappened={isSelectionHappened}
              />
            </View>
            {/* QUIZ Section Ends */}
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
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    gap: 20
  },
  // questionWrapper: {
  //   flexDirection :"row",
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   marginBottom: 20,
  //   marginTop: 10,
  //   gap: 10
  // },
  queryIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    fontSize: 20,
    wordWrap: 'break-word',
    flexShrink: 1,
  }
});