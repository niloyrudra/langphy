/**
 * listening/index.tsx
 *
 * LAYOUT FIX: Top content (speaker/ripple) must never be pushed behind
 * the status bar when the keyboard opens.
 *
 * Root cause of the push-up bug:
 * The cell was structured as:
 *   <View flex:1>
 *     <TaskAllocation flex:1 />      ← grows to fill remaining space
 *     <KeyboardAvoidingView>         ← adds padding when keyboard opens
 *       <TextInput />
 *       <Button />
 *     </KeyboardAvoidingView>
 *   </View>
 *
 * When the keyboard opens, KAV adds bottom padding inside the outer flex:1
 * View. Flex layout responds by SQUEEZING TaskAllocation upward to make room.
 * Because the FlatList cell has a fixed height (ITEM_WIDTH from getItemLayout),
 * the content overflows upward — behind the header and status bar.
 *
 * Fix: Give the bottom section (KAV) a fixed height instead of letting flex
 * distribute space. TaskAllocation gets the remaining height via flex:1 and
 * is anchored by the known fixed height of the input area. When the keyboard
 * opens, KAV's padding only affects its own internal layout — it does NOT
 * squeeze TaskAllocation because TaskAllocation's parent is no longer sharing
 * flex space with the KAV.
 *
 * Structure after fix:
 *   <View flex:1>
 *     <TaskAllocation flex:1 />      ← fills all space above the input area
 *     <View> (non-flex, natural height)
 *       <KeyboardAvoidingView behavior="padding">
 *         <TextInput />
 *         <Button />
 *       </KeyboardAvoidingView>
 *     </View>
 *   </View>
 *
 * The outer View is not flex-distributed between TaskAllocation and the input
 * section — TaskAllocation takes all remaining space and the input section
 * sits at its natural height at the bottom. Keyboard padding shifts only the
 * input section's internal content upward, not the whole cell.
 */

import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import SessionLayout from '@/components/layouts/SessionLayout';
import { SessionType, ListeningSessionType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import TaskAllocation from '@/components/listening-components/TaskAllocation';
import { useListening } from '@/context/ListeningContext';
import { OfflineCacheMissError, useLessons } from '@/hooks/useLessons';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { randomUUID } from 'expo-crypto';
import { useCelebration } from '@/context/CelebrationContext';
import { analysisNLP } from '@/services/nlp.service';
import { toastError } from '@/services/toast.service';
import { useSessionLesson } from '@/hooks/useSessionLesson';
import OfflineSessionGuard from '@/components/offline/OfflineSessionGuard';
import { useNetwork } from '@/context/NetworkContext';
import SessionInputArea from '@/components/form-components/SessionInputArea';
import { parseLessonData } from '@/utils';
// import { shouldShowLessonAd } from '@/monetization/ads.frequency';
// import { interstitialController } from '@/monetization/ads.service';

// ─── Component ────────────────────────────────────────────────────────────────
const ListeningLessons = () => {
  const attemptId = React.useMemo(() => randomUUID(), []);
  const userId: string = authSnapshot.getUserId() ?? "";
  const { categoryId, slug, unitId } = useLocalSearchParams();
  const { colors } = useTheme();
  const { isOnline } = useNetwork();

  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const { triggerLessonResult, triggerSessionCompletion, triggerStreak, resolveCurrent } = useCelebration();

  const { data: listeningLessons, isLoading, isFetching, error: listeningError, refetch } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  
  const { resultHandler } = useListening();

  const [ textContent, setTextContent ] = React.useState<string>('')
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)

  // ✅ Ref mirrors state — keeps analyzeListeningHandler stays stable during typing
  const textContentRef = React.useRef<string>('');
  const handleTextChange = React.useCallback((val: string) => {
    textContentRef.current = val;
    setTextContent(val);
  }, []);

  const lessonData = React.useMemo<ListeningSessionType[]>(
    () => parseLessonData<ListeningSessionType>( listeningLessons ),
    [listeningLessons]
  );

  // ── Shared session logic ──────────────────────────────────────────────────
  const { currentLessonRef, goToNextRef, activeItemChangeHandler, onLessonComplete } = useSessionLesson<ListeningSessionType>({
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

  const lessonCompletionHandler = React.useCallback( async (result: any) => {
    try {
      const score = result!.similarity ? result!.similarity*100 : 0;
      await onLessonComplete(currentLessonRef.current!, score);
      resultHandler(result!);
      reset();

      // // Use After 3 Lessons Completed
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
    }
    catch(error) {
      console.error("lessonCompletionHandler error:", error)
    }
  }, [ reset, onLessonComplete, resultHandler, resolveCurrent ]);

  // ✅ Stable — no textContent in dep array
  const analyzeListeningHandler = React.useCallback(async (expectedText: string) => {
    if (!isOnline) {
      // toastError("You're offline — your answer can't be checked right now. Your progress will be saved locally and sync when you reconnect.");
      toastError("You're offline!");
      return;
    }

    const current = textContentRef.current;  // ✅ ref, not state
    if (!current) {
      setError('No answer entered!');
      toastError('No answer entered!');
      return;
    }

    if (!expectedText) {
      setError("No expected text found!");
      // toastError("No expected text found!");
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
          onContinue: async () => lessonCompletionHandler(data)
        });
      }

    } catch (err: any) {
      console.error(err);
      setError("Analysis failed");
    } finally {
      setLoading(false);
    }
  }, [isOnline, triggerLessonResult, reset, lessonCompletionHandler]);

  const [refreshing, setRefreshing] = React.useState(false);
 
  // ── Auto-retry when network returns ──────────────────────────────────────
  const hasData = !!lessonData?.length;
  React.useEffect(() => {
      if (isOnline && !hasData) refetch();
  }, [isOnline]);

  const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      try {
        await refetch();
      } finally {
        setRefreshing(false);
      }
  }, [refetch]);

  if (isLoading || (isFetching && !hasData)) return <LoadingScreenComponent />;
  if (listeningError || !hasData) {
    return (
      <OfflineSessionGuard
        sessionType={slug as SessionType}
        reason={listeningError instanceof OfflineCacheMissError ? "no_cache" : "unknown"}
        onRetry={onRefresh}
      />
    );
  }

  return (
    <SessionLayout<ListeningSessionType>
      preFetchedData={lessonData}
      onActiveItemChange={activeItemChangeHandler}
    >
      {({ item }) => {
      // {({ item, index, currentIndex }) => {
          // const isActive = index === currentIndex;
        const onCheckHandler = () => analyzeListeningHandler(item.phrase);
        return (
          <View style={styles.cell}>
            {/*
              * TaskAllocation takes all available space above the input area.
              * flex:1 here means "fill whatever space remains after the
              * inputSection below claims its natural height."
              * It is NOT in a flex competition with inputSection, so the
              * keyboard cannot squeeze it upward.
              */}
            <TaskAllocation
              taskTitle="Listen and Write afterwards."
              taskPhrase={item.phrase}
              rippleSize={150}
            />

            {/*
              * Bottom input section — NO KeyboardAvoidingView on Android.
              *
              * KAV inside a FlatList cell causes layout corruption on Android
              * tablet during goToNext: the cell splits visually — top slides
              * correctly but bottom stays anchored by KAV's padding, and
              * TextInput + button collide.
              *
              * On Android: KAV is removed. The keyboard overlays the input,
              * which is acceptable since the input is already at screen bottom.
              *
              * On iOS: KAV with behavior="padding" is kept — iOS does not have
              * this FlatList mid-scroll layout issue.
              */}
            {Platform.OS === 'ios' ? (
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={90}
              >
                <SessionInputArea
                  error={error}
                  textContent={textContent}
                  placeholderColor={colors.placeholderColor}
                  onChange={handleTextChange}
                  onCheck={onCheckHandler}
                  loading={loading}
                />
              </KeyboardAvoidingView>
            ) : (
              <SessionInputArea
                error={error}
                textContent={textContent}
                placeholderColor={colors.placeholderColor}
                onChange={handleTextChange}
                onCheck={onCheckHandler}
                loading={loading}
              />
            )}



            {/*
              * inputSection has no flex — it takes only its natural height.
              * KAV adds padding INSIDE this section when the keyboard opens,
              * pushing TextInput and Button upward within the section only.
              * TaskAllocation above is completely unaffected.
              *
              * behavior="padding" on both platforms:
              * Adding padding (not shrinking height) keeps the FlatList cell
              * dimensions stable, which is required for getItemLayout accuracy.
              */}
              {/* <View style={styles.inputSection}> */}
                {/* {
                    isActive ? ( */}
                            {/* <KeyboardAvoidingView
                               behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                               keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                            >
                              {error ? <Error text={error} /> : null}

                              <TextInputComponent
                                maxLength={500}
                                placeholder="Write here..."
                                value={textContent}
                                onChange={handleTextChange}
                                placeholderTextColor={colors.placeholderColor}
                                inputMode="text"
                                onBlur={() => {}}
                                contentContainerStyle={styles.textInput}
                              />

                              <ActionPrimaryButton
                                buttonTitle="Check"
                                onSubmit={onCheckHandler}
                                isLoading={loading}
                                disabled={textContent.length === 0}
                              />
                            </KeyboardAvoidingView> */}
                        {/* ) : (
                            <>
                                {error ? <Error text={error} /> : null}

                                                                      <TextInputComponent
                                                                        maxLength={500}
                                                                        placeholder="Write here..."
                                                                        value={textContent}
                                                                        onChange={handleTextChange}
                                                                        placeholderTextColor={colors.placeholderColor}
                                                                        inputMode="text"
                                                                        onBlur={() => {}}
                                                                        contentContainerStyle={styles.textInput}
                                                                      />

                                                                      <ActionPrimaryButton
                                                                        buttonTitle="Check"
                                                                        onSubmit={onCheckHandler}
                                                                        isLoading={loading}
                                                                        disabled={textContent.length === 0}
                                                                      />
                            </>
                        )
                } */}

              {/* </View> */}
          </View>
        );
      }}
    </SessionLayout>
  );
}

export default ListeningLessons;

const styles = StyleSheet.create({
  /**
   * Outer cell — flex column. TaskAllocation gets flex:1 (all remaining
   * space). inputSection gets its natural height. No flex competition.
   */
  cell: {
    flex: 1,
    flexDirection: 'column',
  }
});