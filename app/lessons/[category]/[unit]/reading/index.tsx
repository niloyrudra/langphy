import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import { getCardContainerWidth } from '@/utils';
import { SelectiveResultType, ReadingSessionType, SessionType } from '@/types';
import HorizontalLine from '@/components/HorizontalLine';
import Options from '@/components/list-loops/Options';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import SessionLayout from '@/components/layouts/SessionLayout';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import SIZES from '@/constants/size';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import SpeakerWithQuestion from '@/components/lesson-components/SpeakerWithQuestion';
import Query from '@/components/lesson-components/Query';
// import { interstitialController } from '@/monetization/ads.service';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';

const ReadingLessons = () => {
  const attemptId = React.useMemo(() => randomUUID(), []);
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const userId = authSnapshot.getUserId() ?? "";
  const { colors } = useTheme();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const cardWidth = getCardContainerWidth();

  const { data: readingLessons, isLoading, isFetching, error: readingError } = useLessons( categoryId as string, unitId as string, slug as SessionType );

  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ isCorrect, setIsCorrect ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string>('')

  const lessonData = React.useMemo<ReadingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  const getOptions = React.useCallback((item: ReadingSessionType): [string, string, string, string] => {
    const options = Array.isArray(item?.options) && item.options.length > 0 ? item.options : ["", "", "", ""];
    return [options[0] || "", options[1] || "", options[2] || "", options[3] || ""] as [string, string, string, string];
  }, []);

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<ReadingSessionType>({
    userId,
    categoryId: categoryId as string,
    unitId: unitId as string,
    slug: slug as SessionType,
    lessonCount: lessonData.length,
    performanceSessionKey,
    onSessionComplete: triggerSessionCompletion,
    onStreakUpdate: triggerStreak,
  });

  const buttonWrapperStyles = useMemo(() => [
    styles.buttonWrapper,
    {
      backgroundColor: colors.background,
      borderTopColor: colors.hLineColor
    }
  ], []);

  // Handlers
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsSelectionHappened(true);
  };

  const reset = React.useCallback(() => {
    setSelectedOption(null);
    setIsSelectionHappened(false);
    setIsCorrect(false);
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
          console.error("Reading Question Completion error:", error);
        }
      },
      onRetry: reset
    });
  }, [ selectedOption, triggerLessonResult, reset, onLessonComplete, resolveCurrent ]);
 
  if( isLoading || isFetching ) return (<LoadingScreenComponent />)
  if (readingError || !lessonData?.length) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={readingError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
      />
    );
  }

  return (
    <SessionLayout<ReadingSessionType>
      preFetchedData={lessonData}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item, wordRefs, containerRef, setTooltip }) => {
        const handleTooltip = (value: any) => setTooltip(value);        
        return (
          <View style={styles.wrapper}>
            <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <View style={styles.flex}>
              {/* Title Section */}
              <ChallengeScreenTitle title="Read The Comprehension." />

              <SpeakerWithQuestion
                phrase={item?.phrase}
                handleTooltip={handleTooltip}
                wordRefs={wordRefs}
                containerRef={containerRef}
              />

              <HorizontalLine />

              <View style={styles.questionSection}>
                {/* Query */}
                <Query question={item?.question_en} containerStyle={{marginBottom: 10}} regular />

                {/* QUIZ Answer Options */}
                <Options 
                  height={cardWidth / 2} 
                  options={getOptions(item)}
                  answer={item?.answer || ""}
                  isCorrect={ isCorrect }
                  selectedOption={selectedOption || ""}
                  onSelect={handleSelect}
                  isSelectionHappened={isSelectionHappened}
                />
              </View>
            </View>

            </ScrollView>

            {/* Action Buttons */}
            <View style={buttonWrapperStyles}>
              {error && (<Error text={error} />)}
              <ActionPrimaryButton
                buttonTitle='Check'
                onSubmit={() => checkAnswerHandler(item?.answer)}
                disabled={!selectedOption ? true : false }
              />
            </View>
          </View>
        );
      }}
    </SessionLayout>
  );
}

export default ReadingLessons;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative"
  },
  flex: {flex:1},
  container: {
    marginTop: 30,
    marginBottom: 0,
    position: 'relative',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    gap: 20
  },
  questionSection: {flex:1, marginBottom: 120},
  questionWrapper: {marginBottom:10},
  queryIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  question: {fontSize: 16},
  textContainer: {
    width: SIZES.screenWidth - 100,
  },
  buttonWrapper: {
    // marginTop: "auto",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderStyle: "solid",
    paddingVertical: 20,
  }
});