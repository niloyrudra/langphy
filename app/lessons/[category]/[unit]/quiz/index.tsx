import React from 'react';
import { StyleSheet, View } from 'react-native'
import QuizOptionCardList from '@/components/list-loops/Options';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { getCardContainerWidth, parseLessonData } from '@/utils';
import { SessionType, QuizSessionType, SelectiveResultType } from '@/types';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import Query from '@/components/lesson-components/Query';
import { useNetwork } from '@/context/NetworkContext';
// import { interstitialController } from '@/monetization/ads.service';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';

const QuizSession = () => {
  const {isOnline} = useNetwork();
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId = authSnapshot.getUserId() ?? "";
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const cardWidth = getCardContainerWidth();

  const { data: quizLessons, isLoading, isFetching, error: quizError, refetch } = useLessons( categoryId as string, unitId as string, slug as SessionType );

  const quizzes = React.useMemo<QuizSessionType[]>(
    () => parseLessonData<QuizSessionType>( quizLessons ),
    [quizLessons]
  );
  
  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string>('')

  const getOptions = React.useCallback((item: QuizSessionType): [string, string, string, string] => {
    const options = Array.isArray(item?.options) && item.options.length > 0 ? item.options.sort() : ["", "", "", ""];
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
  
  // ── Auto-retry when network returns ──────────────────────────────────────
  const hasData = !!quizLessons?.length;
  React.useEffect(() => {
      if (isOnline && !hasData) refetch();
  }, [isOnline]);

  const onRefresh = React.useCallback(async () => {
      try {
        await refetch();
      } finally {
        // setRefreshing(false);
      }
  }, [refetch]);

  if (isLoading || (isFetching && !hasData)) return <LoadingScreenComponent />;
  if (quizError || !hasData) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={quizError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
        onRetry={onRefresh}
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

              <Query question={item?.question} containerStyle={{marginVertical: 30}} />

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
  // queryIcon: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 15,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // question: {
  //   fontSize: 20,
  //   wordWrap: 'break-word',
  //   flexShrink: 1,
  // }
});