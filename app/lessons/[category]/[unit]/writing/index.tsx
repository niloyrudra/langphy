import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionType, WritingSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import Error from '@/components/Error';
import { analysisNLP } from '@/services/nlp.service';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import { toastError } from '@/services/toast.service';
import { useNetwork } from '@/context/NetworkContext';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';
// import { interstitialController } from '@/monetization/ads.service';

// ─── Component ────────────────────────────────────────────────────────────────
const WritingSession = () => {
  const { colors } = useTheme();
  const { isOnline } = useNetwork();
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();
  const { data: readingLessons, isLoading, isFetching, error: writingError } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  
  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  // ✅ Ref mirrors state so callbacks stay stable even as the user types
  const textContentRef = React.useRef<string>('');
  const handleTextChange = React.useCallback((val: string) => {
    textContentRef.current = val;
    setTextContent(val);
  }, []);

  const lessonData = React.useMemo<WritingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<WritingSessionType>({
    userId,
    categoryId: categoryId as string,
    unitId: unitId as string,
    slug: slug as SessionType,
    lessonCount: lessonData.length,
    performanceSessionKey,
    onSessionComplete: triggerSessionCompletion,
    onStreakUpdate: triggerStreak,
  });

  // Handlers
  const reset = React.useCallback(() => {
    textContentRef.current = '';
    setTextContent("");
    setError("");
    setLoading(false);
  }, []);

  const onContinue = React.useCallback(async (result: any) => {
    const score = (result && result!.similarity) ? result.similarity * 100 : 0;
    await onLessonComplete(currentLessonRef.current!, score);
    reset();
    
    // Use After 3 Lessons Completed
    // if( await shouldShowLessonAd() ) {
      //   interstitialController.show(() => {
      //     goToNextRef.current?.();
      //   });
      // }
    // else {
      //   goToNextRef.current?.();
    // }
          
    goToNextRef.current?.();
    resolveCurrent();
  }, [reset, onLessonComplete, resolveCurrent]);

  // ✅ No longer depends on textContent state — uses ref instead.
  // This means analyzeWritingHandler is created ONCE and never re-creates
  // during typing, so the children prop passed to SessionLayout stays stable.
  const analyzeWritingHandler = React.useCallback(async (expectedText: string) => {
    if (!isOnline) {
      // toastError( "You're offline — your answer can't be checked right now. Your progress will be saved locally and sync when you reconnect.");
      toastError( "You're offline!");
      return;
    }

    const current = textContentRef.current;  // ✅ read from ref, not state
    if (!current.trim()) {
      setError('Please write your answer first!');
      return;
    }

    if (!expectedText) {
      setError("No expected text found!");
      return;
    }

    try {
      setLoading(true);
      const data = await analysisNLP( expectedText, current );
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
      setError("Analysis failed");
    } finally {
      setLoading(false);
    }
  }, [ isOnline, triggerLessonResult, reset, onContinue ]);

  
  if( isLoading || isFetching ) return (<LoadingScreenComponent />);
  if (writingError || !lessonData?.length) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={writingError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
      />
    );
  }

  return (
    <SessionLayout<WritingSessionType>
      preFetchedData={lessonData}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item }) => {
        const onCheckHandler = () => analyzeWritingHandler(item?.phrase);
        return (
          <View style={styles.cell}>
            {/*
              * Top section — title + query. flex:1 fills all space
              * above the input section. Never moves when keyboard opens
              * because it is not in flex competition with inputSection.
              */}
            <View style={styles.topSection}>
              <ChallengeScreenTitle title="Write it in German" />
              <ChallengeScreenQuerySection
                query={item.meaning}
                lang="en-US"
                style={styles.query}
              />
            </View>

            {/*
              * Input section — no flex, natural height only.
              * KAV padding stays inside here, never pushing the top
              * section behind the status bar.
              */}
            <View style={styles.inputSection}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                  keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                >
                  {error ? <Error text={error} /> : null}

                  <TextInputComponent
                    maxLength={500}
                    placeholder="Write here..."
                    value={textContent}
                    onChange={handleTextChange}
                    onBlur={() => {}}
                    placeholderTextColor={colors.placeholderColor}
                    inputMode="text"
                    contentContainerStyle={styles.textInput}
                  />

                  <ActionPrimaryButton
                    buttonTitle="Check"
                    onSubmit={onCheckHandler}
                    isLoading={loading}
                    disabled={textContent.length === 0}
                  />
                </KeyboardAvoidingView>
            </View>
          </View>
        );
      }}
    </SessionLayout>
  );
}

export default WritingSession;

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'column',
  },
  /**
   * Top section fills all available space above the input area.
   * It never shrinks because inputSection has no flex weight.
   */
  topSection: {
    flex: 1,
  },
  query: {
    width: '80%',
  },
  /**
   * Input section — no flex. Sits at its natural height at the bottom.
   * KAV padding goes inside here only.
   */
  inputSection: {
    // No flex — natural height only
  },
  textInput: {
    marginBottom: 12,
  },
});