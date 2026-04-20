/**
 * reading/index.tsx
 *
 * FIX: Check button now sticks to the bottom of the screen at all times,
 * regardless of how much content is in the ScrollView above it.
 *
 * Root cause of the floating button:
 * The old layout used `position: 'absolute', bottom: 0` on the button wrapper,
 * but the outer `wrapper` View had no explicit height or flex — it collapsed
 * to the height of its children, so `absolute` positioning had no real parent
 * height to anchor against. On shorter content the button floated in the middle.
 *
 * Fix: The cell uses a flex column layout split into two parts:
 *   1. ScrollView with flex:1 — takes all available space, scrollable
 *   2. Button wrapper with no flex — sits at natural height at the bottom
 *
 * The button wrapper is NOT inside the ScrollView so it is always visible
 * regardless of scroll position. It is NOT absolutely positioned so it
 * anchors correctly to the bottom of the flex column on all screen sizes.
 *
 * The questionSection inside the ScrollView no longer needs marginBottom:120
 * (which was a hack to prevent the absolute button from overlapping content).
 * Content scrolls freely and the button is always at the bottom.
 */

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
// import SIZES from '@/constants/size';
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
          /*
          * Outer cell: flex column with two children:
          *   1. ScrollView (flex:1) — all scrollable content
          *   2. Button wrapper (no flex) — always at the bottom
          *
          * This is the correct pattern for "sticky bottom button
          * with scrollable content above". No absolute positioning
          * needed — normal flex flow handles it perfectly.
          */
        <View style={styles.cell}>
            {/* ── Scrollable content ───────────────────────── */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
            >
              <ChallengeScreenTitle title="Read The Comprehension." />

              <SpeakerWithQuestion
                phrase={item?.phrase}
                handleTooltip={handleTooltip}
                wordRefs={wordRefs}
                containerRef={containerRef}
              />

              <HorizontalLine />

              <View style={styles.questionSection}>
                <Query
                  question={item?.question_en}
                  containerStyle={styles.query}
                  regular
                />

                <Options
                  height={cardWidth / 2}
                  options={getOptions(item)}
                  answer={item?.answer || ''}
                  isCorrect={isCorrect}
                  selectedOption={selectedOption || ''}
                  onSelect={handleSelect}
                  isSelectionHappened={isSelectionHappened}
                />
              </View>
            </ScrollView>

            {/* ── Sticky bottom button ─────────────────────── */}
            {/*
              * Sits outside the ScrollView — always visible at the
              * bottom of the flex column regardless of content height
              * or scroll position. No position:absolute needed.
              */}
            <View style={styles.buttonWrapper}>
              {error ? <Error text={error} /> : null}
              <ActionPrimaryButton
                buttonTitle="Check"
                onSubmit={() => checkAnswerHandler(item?.answer)}
                disabled={!selectedOption}
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
  /**
   * Full FlatList cell — flex column. Two children share vertical space:
   * scroll (flex:1) and buttonWrapper (natural height).
   */
  cell: {
    flex: 1,
    flexDirection: 'column',
  },
  /**
   * ScrollView fills all space above the button.
   * flex:1 is set on the ScrollView itself, not contentContainer.
   */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16, // breathing room at the bottom of scrollable content
  },
  questionSection: {
    marginTop: 8,
    marginBottom: 8, // no longer needs 120 — button is not absolutely positioned
  },
  query: {
    marginBottom: 10,
  },
  /**
   * Button wrapper — no flex, no absolute positioning.
   * Sits at its natural height at the bottom of the flex column.
   * Border top gives a visual separator from the scrollable content.
   */
  buttonWrapper: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
});