import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import SessionLayout from '@/components/layouts/SessionLayout';
import { router, useLocalSearchParams } from 'expo-router';
import { SessionType, PracticeSessionType, Token } from '@/types';
import ListeningComponent from '@/components/listening-components/ListeningComponent';
import { useSession } from '@/context/SessionContext';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import PracticeLessonDetails from '@/components/practice-components/LessonDetails';
import { useLessons } from '@/hooks/useLessons';
import { useProgress } from '@/hooks/useProgress';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { randomUUID } from 'expo-crypto';
import LangphyText from '@/components/text-components/LangphyText';
import LessonList from '@/components/practice-components/LessonList';
import { useCelebration } from '@/context/CelebrationContext';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { useSaveVocabulary } from '@/hooks/useVocabulary';

const PracticeLessons = () => {
  const attemptId = React.useMemo(() => randomUUID(), []);
  const { colors } = useTheme();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const {start, stop, isRunning} = useLessonTimer();
  const { mutate: saveVocabulary } = useSaveVocabulary();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const sessionKey = `${unitId}:${slug}`;
  const userId: string = authSnapshot.getUserId() ?? "";
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();

  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeLessonOrderRef = React.useRef<number>(0);
  const currentLessonRef = React.useRef<PracticeSessionType | null>(null);
  const scrollToLessonRef = React.useRef<((index: number) => void) | null>(null);
  const scrollToRef = React.useRef<ScrollView>(null);
  
  // ── KEY CHANGE ────────────────────────────────────────────────────────────
  // Store tokens in a REF, not state. This means:
  // 1. handleVocabulary always reads the latest tokens (no stale closure)
  // 2. Updating tokens never triggers a re-render of the practice screen
  // 3. No dependency array issues in useCallback
  // NLPAnalyzedPhase calls getTokens(tokens) when NLP resolves — we store
  // them here immediately so they're ready when the user taps Done.
  // const tokensRef = React.useRef<Token[]>([]);
  // ─────────────────────────────────────────────────────────────────────────
 
  const { currentPosition, showLessonList, setCurrentPosition } = useSession();

  // Essential Custom hooks
  const { data: practiceLessons, isLoading: lessonsLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const { data: progress } = useProgress( sessionKey );

  // Fetch Primary Lesson data
  const practiceData = useMemo<PracticeSessionType[]>(() => {
    if (!practiceLessons) return [];

    return practiceLessons.map(l => JSON.parse(l.payload));
  }, [practiceLessons]);

  // Update LessonList data
  const lessonListData = useMemo(() => {
    if (!practiceLessons || !progress) return [];

    return practiceLessons.map(l => {
      const payload = JSON.parse(l.payload);
      const p = progress.find(pr => pr.content_id === l.id);

      return {
        id: l.id,
        title: payload.meaning,
        completed: p?.completed === 1,
      };
    });
  }, [practiceLessons, progress]);

  const onLessonComplete = React.useCallback(async (lesson: PracticeSessionType, score: number) => {
    if(!userId) return;
    try {
      const duration_ms = stop();
      const sessionType = slug as SessionType;
      const sessionKey = `${unitId}:${sessionType}`;
      const lessonOrder = activeLessonOrderRef.current;
      const isFinalLesson = lessonOrder === practiceData.length - 1;
  
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
  }, [userId, slug, userId, practiceData?.length, stop]);
  
  const onContinue = React.useCallback(async () => {
    await onLessonComplete(currentLessonRef.current!, 100);
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
  }, [onLessonComplete, resolveCurrent]);

  // Replace tokensRef with a Map
  const tokensMapRef = React.useRef<Map<string, Token[]>>(new Map());

  // Store tokens keyed by phrase — no guard needed, all lessons can write freely
  const handleGetTokens = React.useCallback((incoming: Token[], phrase: string) => {
    tokensMapRef.current.set(phrase, incoming);
  }, []);

  // Snapshot by reading the current lesson's phrase at tap time
  const handleVocabulary = React.useCallback(async () => {
    const currentPhrase = currentLessonRef.current?.phrase ?? "";
    const tokens = [...(tokensMapRef.current.get(currentPhrase) ?? [])];

    if (tokens.length > 0 && userId) {
      try {
        saveVocabulary({
          userId,
          tokens,
          unitId: unitId as string,
          categoryId: categoryId as string,
        });
      } catch (err) {
        console.warn("Vocabulary save failed (non-blocking):", err);
      }
    }

    triggerLessonResult({
      result: {
        words: tokens,
        practiceScore: 100
      },
      onRetry: resolveCurrent,
      onContinue: onContinue,
    });
  }, [userId, unitId, categoryId, saveVocabulary, resolveCurrent, onContinue]);

  const activeItemChangeHandler = React.useCallback(
    ({ item, index, goToNext }: { item: PracticeSessionType; index: number; goToNext: () => void }) => {
      activeLessonOrderRef.current = index;
      currentLessonRef.current = item;
      setCurrentPosition(index);
      goToNextRef.current = goToNext;
      // tokensRef.current = []; // ← this is fine, handleVocabulary already snapshotted before goToNext ran
    },
    [setCurrentPosition]
  );

  const onPositionChangeHandler = React.useCallback((index: number) => setCurrentPosition(index), [setCurrentPosition]);
  const onScrollerHandler = React.useCallback((scrollFn: ((index: number) => void)) => {scrollToLessonRef.current = scrollFn}, []);

  React.useEffect(() => {
    if(!isRunning) start();
  }, [ isRunning ])

  if( lessonsLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<PracticeSessionType>
        preFetchedData={practiceData}
        showFooter={true}
        onPositionChange={onPositionChangeHandler}
        onRegisterScroller={onScrollerHandler}
        onActiveItemChange={activeItemChangeHandler}
        storeVocabulary={handleVocabulary}
      >
        {/* {({ item, wordRefs, containerRef, disableHorizontalScroll, enableHorizontalScroll, setTooltip }) => { */}
        {({ item, wordRefs, containerRef, setTooltip }) => {
          const handleTooltip = (value: any) => setTooltip(value);
          return (
            <>
              <ScrollView
                ref={scrollToRef}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                // onScrollBeginDrag={disableHorizontalScroll}
                // onScrollEndDrag={enableHorizontalScroll}
                scrollEventThrottle={16}
              >
                <View style={styles.container}>
                  {/* English Section */}
                  <ListeningComponent
                    language="English"
                    color="#0A9AB0"
                    style={{backgroundColor: colors.listeningCardBackgroundColor}}
                    buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
                    speechContent={item.meaning}
                    speechLang="en-US"
                  >
                    <LangphyText weight='semibold' style={[styles.text, { color: colors.text }]}>
                      {item.meaning}
                    </LangphyText>
                  </ListeningComponent>

                  <View style={styles.space} />

                  {/* German Section */}
                  <ListeningComponent
                    language="German"
                    color="#1B7CF5"
                    style={{backgroundColor: colors.listeningCardBackgroundColor}}
                    buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
                    speechContent={item.phrase}
                    speechLang="de-DE"
                  >

                    {/* Tappable Words with ToolTip */}
                    <NLPAnalyzedPhase
                      phrase={item.phrase}
                      onHandler={handleTooltip}
                      getTokens={handleGetTokens}
                      wordRefs={wordRefs}
                      containerRef={containerRef}
                      textContainerStyle={styles.nlp}
                    />

                    {/* Sentence Footer */}
                    {
                      item?.usage_context && (
                        <PracticeLessonDetails
                          usage_context={item?.usage_context || ""}
                          german_level={item?.german_level || null}
                          formality={item?.formality || ""}
                          discussion={item?.discussion || ""}
                          region={item?.region || ""}
                          grammar_note={item?.grammar_note || ""}
                          examples={item?.examples || []}
                        />
                      )
                    }

                  </ListeningComponent>
                </View>
              </ScrollView>            
            </>
          )
        }}
        
      </SessionLayout>

      {
        showLessonList && (
          <LessonList
            lessons={lessonListData}
            scrollToLessonRef={scrollToLessonRef}
            currentPosition={currentPosition}
          />
        )
      }
    </>
  );
};

export default PracticeLessons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginBottom: 30
  },
  space: {
    height: 80
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    alignItems: "center"
  },
  mainText: {
    fontSize: 20,
    fontWeight: "700",
  },
  subText: {
    fontSize: 13,
    fontWeight: "400",
    // flexWrap: "wrap"
  },
  levelText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10
  },
  nlp: {
    marginBottom: 15
  }
});