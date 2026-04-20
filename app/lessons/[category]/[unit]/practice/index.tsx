import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { SessionType, PracticeSessionType, Token } from '@/types';
import ListeningComponent from '@/components/listening-components/ListeningComponent';
import { useSession } from '@/context/SessionContext';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import PracticeLessonDetails from '@/components/practice-components/PracticeLessonDetails';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { useProgress } from '@/hooks/useProgress';
import { randomUUID } from 'expo-crypto';
import LangphyText from '@/components/text-components/LangphyText';
import LessonList from '@/components/practice-components/LessonList';
import { useCelebration } from '@/context/CelebrationContext';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useSaveVocabulary } from '@/hooks/useVocabulary';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import { useNetwork } from '@/context/NetworkContext';

// ── Constants ────────────────────────────────────────────────────────────
const SORTED_UNIT_ID = "69233eac0146d50fc37df9b0";
const SORT_FIELD = "phrase" as const; // keyof PracticeSessionType

// ── Components ────────────────────────────────────────────────────────────
const PracticeLessons = () => {
  const attemptId = React.useMemo(() => randomUUID(), []);
  const { colors } = useTheme();
  const { isOnline } = useNetwork();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const { mutate: saveVocabulary } = useSaveVocabulary();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const sessionKey = `${unitId}:${slug}`;
  const userId: string = authSnapshot.getUserId() ?? "";
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();

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
  const { data: practiceLessons, isLoading: lessonsLoading, isFetching, error, refetch } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const { data: progress } = useProgress( sessionKey );

  // ── Step 1: Parse all payloads once ──────────────────────────────────────────
  // Both practiceData and lessonListData need the parsed payload.
  // Parsing inside each memo separately = 2x JSON.parse calls per lesson.
  // Parse here once and share the result.
  const parsedLessons = useMemo(() => {
    if (!practiceLessons) return [];
    return practiceLessons.map(l => ({
      id:      l.id,
      payload: JSON.parse(l.payload) as PracticeSessionType,
    }));
  }, [practiceLessons]);

  // ── Step 2: Sort once if this is the alphabetical unit ───────────────────────
  // Sorting is derived from parsedLessons so no double-parsing happens.
  // Both arrays below consume this — the sort is applied in exactly one place.
  const sortedLessons = useMemo(() => {
    if (unitId !== SORTED_UNIT_ID) return parsedLessons;
    return [...parsedLessons].sort((a, b) =>
      a.payload[SORT_FIELD].localeCompare(b.payload[SORT_FIELD])
    );
  }, [parsedLessons, unitId]);
  
  // ── Step 3: Derive practiceData (what SessionLayout gets) ────────────────────
  const practiceData = useMemo<PracticeSessionType[]>(
    () => sortedLessons.map(l => l.payload),
    [sortedLessons]
  );

  // ── Step 4: Derive lessonListData (what LessonList gets) ─────────────────────
  // progress lookup is O(n²) with .find() — acceptable for typical lesson counts
  // but if you ever have 100+ lessons, replace with a Map lookup instead.
  const lessonListData = useMemo(() => {
    return sortedLessons.map(l => {
      const p = progress?.find(pr => pr.content_id === l.id);
      return {
        id:        l.id,
        title:     l.payload.meaning,
        completed: p?.completed === 1,
      };
    });
  }, [sortedLessons, progress]);

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<PracticeSessionType>({
    userId,
    categoryId: categoryId as string,
    unitId: unitId as string,
    slug: slug as SessionType,
    lessonCount: practiceData.length,
    performanceSessionKey,
    onSessionComplete: triggerSessionCompletion,
    onStreakUpdate: triggerStreak,
  });

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

  const onPositionChangeHandler = React.useCallback((index: number) => setCurrentPosition(index), [setCurrentPosition]);
  const onScrollerHandler = React.useCallback((scrollFn: ((index: number) => void)) => {scrollToLessonRef.current = scrollFn}, []);

  // ── Auto-retry when network returns ──────────────────────────────────────
  const hasData = !!practiceData?.length;
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

  if (lessonsLoading || (isFetching && !hasData)) return <LoadingScreenComponent />;
  if (error || !hasData) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={error instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
        onRetry={onRefresh}
      />
    );
  }

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
        {({ item, wordRefs, containerRef, setTooltip }) => {
          const handleTooltip = (value: any) => setTooltip(value);
          return (
            <>
              <ScrollView
                ref={scrollToRef}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
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
                    <LangphyText weight='medium' style={[styles.text, { color: colors.text }]}>
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
    fontSize: 16,
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