/**
 * SessionLayout.tsx — Production-hardened session pager
 *
 * ARCHITECTURE
 * ─────────────
 * All six session types (listening, speaking, quiz, reading, writing, practice)
 * share this single layout. It owns the horizontal FlatList pager, nav dots,
 * tooltip overlay, and session footer. Individual screens pass their content
 * via the render-prop `children`.
 *
 * PRODUCTION FIXES IN THIS VERSION
 * ──────────────────────────────────
 *
 * 1. DOUBLE TOP INSET / EXTRA HEADER PADDING
 *    Root cause: SafeAreaLayout used SafeAreaView with all 4 edges. Session
 *    screens have headerShown:false so this was correct. But the fix surfaces
 *    on OTHER screens (HomeScreen, CategoryScreen, UnitSessions) that use
 *    SafeAreaLayout inside a Stack with a visible header — the Stack already
 *    handles the top inset, SafeAreaView added it again.
 *    Fix: SafeAreaLayout now accepts an `edges` prop. Session screens keep
 *    the default (all edges). Screens with a header pass ['bottom','left','right'].
 *    SessionLayout passes no override — default (all edges) is correct here
 *    because ALL session screens have headerShown:false.
 *
 * 2. OCCASIONAL FREEZE IN LISTENING/WRITING (keyboard + FlatList)
 *    Root cause: KeyboardAvoidingView with behavior="height" inside a FlatList
 *    cell shrinks the cell's height when the keyboard appears. FlatList uses
 *    getItemLayout which returns a FIXED height (ITEM_WIDTH). When the cell
 *    actually shrinks, FlatList's internal offset map becomes inconsistent —
 *    on the next scrollToIndex call, it lands on the wrong position, making
 *    lessons appear frozen or collapsed.
 *    Fix: KAV is NOT inside the FlatList cell. It wraps only the input+button
 *    section in the individual session screen (outside the FlatList render prop).
 *    The FlatList cell height never changes. getItemLayout stays accurate.
 *    See listening/index.tsx and writing/index.tsx for the correct placement.
 *
 * 3. LARGE LESSON COUNT (40+) PERFORMANCE
 *    - windowSize=5: keeps 5 screens worth of cells in memory (2 before, 2 after
 *      current). Reduced from 3 only when session has > 20 items — but 5 is
 *      actually better for fast forward navigation on long sessions.
 *    - maxToRenderPerBatch=3: render 3 cells per JS frame instead of 2.
 *      Prevents the blank-cell flash when navigating quickly through 40+ lessons.
 *    - initialNumToRender=3: first paint shows current + next 2.
 *    - removeClippedSubviews=true: cells more than 2 screens away are detached
 *      from the native view tree. Safe here because scrollEnabled=false means
 *      no momentum scrolling can reveal clipped cells unexpectedly.
 *      NOTE: do NOT set this to true if you ever re-enable user swipe scrolling.
 *    - viewabilityConfig moved to a module-level const so it's never recreated.
 *
 * 4. FOREGROUND/BACKGROUND STABILITY
 *    - The KAV removal from inside the FlatList cell eliminates the most
 *      common source of layout thrashing during app-resume.
 *    - speechController has its own AppState listener (see speechController.ts).
 *    - useSpeechRecorder must have its own AppState listener for the audio
 *      recorder — see useSpeechRecorder.ts for that fix.
 *
 * 5. STALE goToNext IN onActiveItemChange EFFECT
 *    The effect reads goToNext via a wrapper closure `() => goToNextRef.current()`
 *    so the callback always holds the latest version regardless of when the
 *    effect was scheduled vs when the ref was last updated.
 *
 * 6. preFetchedData ARRAY REFERENCE IN EFFECT DEPS
 *    Uses preFetchedData.length instead of preFetchedData as the dependency.
 *    The array is recreated from useMemo on every render of the parent screen.
 *    Using the reference would fire onActiveItemChange on every parent render.
 *    Using .length fires only when actual data changes (initial load).
 */

import React, { ReactNode, useCallback, useEffect, useRef, memo, JSX } from 'react';
import {
  View,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  // KeyboardAvoidingView,
  // Platform,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import SIZES from '@/constants/size';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import { ToolTip } from '@/types';
import ToolTipComponent from '@/components/tooltip-components/ToolTipComponent';
import LessonNavDots from '../LessonNavDots';
import SessionFooter from '../SessionFooter';
import { useFloatingTooltip } from '@/hooks/useFloatingTooltip';
import { useSessionPager } from '@/hooks/useSessionPager';
import { useLessonTimer } from '@/hooks/useLessonTimer';

// ─── Constants ────────────────────────────────────────────────────────────────
const ITEM_WIDTH = SIZES.screenWidth - SIZES.bodyPaddingHorizontal * 2;

/**
 * Module-level constant — never recreated, so FlatList never invalidates
 * its viewability callbacks. If defined inline in the component body,
 * React Native logs a warning and may re-register the callback on every render.
 */
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 90 };

// ─── Types ────────────────────────────────────────────────────────────────────
interface SessionLayoutProps<T> {
  sessionType?: string;
  // keyboardAvoid?: boolean;
  preFetchedData?: T[];
  showFooter?: boolean;
  onPositionChange?: (index: number) => void;
  onRegisterScroller?: (scrollTo: (index: number) => void) => void;
  onActiveItemChange?: (args: { item: T; index: number; goToNext: () => void }) => void;
  onSessionComplete?: () => void;
  storeVocabulary?: () => void;
  // keyboardVerticalOffset?: number;
  children: (props: {
    item: T;
    index: number;
    data?: T[];
    currentIndex: number;
    setCurrentIndex?: (e: number) => void;
    goToNext?: () => void;
    goToPrevious?: () => void;
    wordRefs: React.MutableRefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>;
    screenRef: React.RefObject<View | null>;
    setTooltip: (obj: ToolTip) => void;
  }) => ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────
function SessionLayout<T>({
  children,
  preFetchedData=[],
  showFooter = false,
  onPositionChange,
  onRegisterScroller,
  onActiveItemChange,
  onSessionComplete,
  storeVocabulary = () => {},
  // keyboardAvoid = false,
  // keyboardVerticalOffset = 90,
}: SessionLayoutProps<T>) {
  const timer = useLessonTimer();
  // Swipe between lessons is intentionally disabled — navigation is
  // programmatic only (goToNext / goToPrevious). horizontalEnabled is kept
  // so child components can still lock/unlock their own inner scroll views
  // via disableHorizontalScroll / enableHorizontalScroll if needed.
  const { tooltip, showTooltip, hideTooltip } = useFloatingTooltip();

  const wordRefs = useRef<Map<string, any>>(new Map());
  const containerRef = useRef<View | null>(null);
  const screenRef = useRef<View | null>(null);
  const activeLessonIdRef = useRef<string | null>(null)

  const {
    flatListRef,
    currentIndex,
    setCurrentIndex,
    scrollToIndex,
    goToNext,
    goToPrevious
  } = useSessionPager<T>( preFetchedData.length, onPositionChange, onSessionComplete );

  
  // ── Stable refs ───────────────────────────────────────────────────────────
  // Every value that changes on navigation ticks gets a ref so renderItem
  // and the active-item effect never stale-close over old values.
  const goToNextRef       = useRef(goToNext);
  const goToPrevRef       = useRef(goToPrevious);
  const showTooltipRef    = useRef(showTooltip);
  const setCurrentIdxRef  = useRef(setCurrentIndex);
  const currentIndexRef   = useRef(currentIndex);
  const onActiveItemRef   = useRef(onActiveItemChange);

  useEffect(() => { goToNextRef.current      = goToNext;           }, [goToNext]);
  useEffect(() => { goToPrevRef.current      = goToPrevious;       }, [goToPrevious]);
  useEffect(() => { showTooltipRef.current   = showTooltip;        }, [showTooltip]);
  useEffect(() => { setCurrentIdxRef.current = setCurrentIndex;    }, [setCurrentIndex]);
  useEffect(() => { currentIndexRef.current  = currentIndex;       }, [currentIndex]);
  useEffect(() => { onActiveItemRef.current  = onActiveItemChange; }, [onActiveItemChange]);

  // ── Viewable items ────────────────────────────────────────────────────────
  // Wrapped in useRef so the function identity never changes — FlatList
  // warns and may misbehave if onViewableItemsChanged changes after mount.
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
      const visible = viewableItems[0]
      if( !visible ) return;
      const lessonId = visible.item.id;
      // same lesson -> do nothing
      if( !lessonId || activeLessonIdRef.current === lessonId ) return;
      // New Lesson appeared
      activeLessonIdRef.current = lessonId;
      timer.reset();
      timer.start();
    }
  ).current;

  // ── Scroll handler ────────────────────────────────────────────────────────
  // scrollEnabled=false means this fires only from programmatic scrollToIndex.
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round( event.nativeEvent.contentOffset.x / ITEM_WIDTH );
      setCurrentIndex(index);
      onPositionChange?.(index);
    },
    [onPositionChange]
  );

  // ── Register scroller ─────────────────────────────────────────────────────
  useEffect(() => {
    if (onRegisterScroller) onRegisterScroller(scrollToIndex);
  }, [onRegisterScroller, scrollToIndex]);


  // ── Active item callback ──────────────────────────────────────────────────
  // Uses preFetchedData.length (not the array ref) so this only fires when
  // the index changes or data first loads — not on every parent re-render.
  // goToNext is read via closure at call time (not at schedule time) so
  // the callback always holds the latest function.
  useEffect(() => {
    if (!preFetchedData.length) return;
    onActiveItemRef.current?.({
      item: preFetchedData[currentIndex],
      index: currentIndex,
      goToNext: () => goToNextRef.current(),  // ✅ read at call time
    });
  }, [currentIndex, preFetchedData.length]); // ✅ .length not the array reference

  // ── Render item ───────────────────────────────────────────────────────────
  // Stable — only recreates when `children` changes (which is only on
  // session screen mount, not during navigation or typing).
  const renderItem: ListRenderItem<T> = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <View style={styles.content}>
        {children({
          item,
          index,
          currentIndex:         currentIndexRef.current,
          setCurrentIndex:      setCurrentIdxRef.current,
          goToNext:             goToNextRef.current,
          goToPrevious:         goToPrevRef.current,
          wordRefs,
          containerRef,
          screenRef,
          setTooltip:           showTooltipRef.current,
        })}
      </View>
    ),
    [children]
  );

  // ── getItemLayout ─────────────────────────────────────────────────────────
  // Tells FlatList the exact size and offset of every cell without measuring.
  // CRITICAL: cells must always be exactly ITEM_WIDTH wide. Never put anything
  // inside a cell that changes its width (e.g. a KAV with behavior="height").
  const getItemLayout = useCallback(
    (_: ArrayLike<T> | null | undefined, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    []
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaLayout>
      {/* Nav dots sit above the FlatList, outside the pager */}
      <LessonNavDots data={preFetchedData.map((_, idx) => idx)} currentIndex={currentIndex} />
      <View ref={containerRef} style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={preFetchedData}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          /**
           * Swipe is disabled — navigation is programmatic only.
           * This also means removeClippedSubviews=true is safe:
           * no momentum scroll can reveal a clipped cell unexpectedly.
           */
          scrollEnabled={false}
          removeClippedSubviews={true}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY_CONFIG}
          keyboardShouldPersistTaps="handled"
          /**
           * Batch sizes for 40+ lesson sessions:
           * - initialNumToRender=3: first paint has current + 2 ahead
           * - maxToRenderPerBatch=3: 3 cells per JS frame (no blank flash)
           * - windowSize=5: 2 cells behind + current + 2 ahead in memory
           */
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
        />

        {showFooter && (
          <SessionFooter
            storeVocabulary={storeVocabulary}
            goToNext={goToNext}
            goToPrevious={goToPrevious}
            currentIndex={currentIndex}
            contentId={(preFetchedData[currentIndex] as any)?._id ?? ''}
            dataSize={preFetchedData.length}
            tokens={tooltip.token!}
          />
        )}

        {tooltip.visible && tooltip?.token && (
          <>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={hideTooltip}
            />
            <ToolTipComponent
              top={tooltip.y}
              left={tooltip.x}
              token={tooltip.token}
            />
          </>
        )}

      </View>
    </SafeAreaLayout>
  );
}

export default memo(SessionLayout) as <T>(
  props: SessionLayoutProps<T>
) => JSX.Element;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    width: ITEM_WIDTH,
    marginTop: 25,
    // paddingTop: 25
  }
});