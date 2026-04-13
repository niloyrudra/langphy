import React, { ReactNode, useCallback, useEffect, useRef, useState, memo, JSX } from 'react';
import {
  View,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  KeyboardAvoidingView,
  Platform,
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

interface SessionLayoutProps<T> {
  sessionType?: string;
  keyboardAvoid?: boolean;
  preFetchedData?: T[];
  showFooter?: boolean;
  onPositionChange?: (index: number) => void;
  onRegisterScroller?: (scrollTo: (index: number) => void) => void;
  onActiveItemChange?: (args: { item: T; index: number; goToNext: () => void }) => void;
  onSessionComplete?: () => void;
  storeVocabulary?: () => void;
  keyboardVerticalOffset?: number;
  children: (props: {
    item: T;
    index: number;
    data?: T[];
    currentIndex: number;
    setCurrentIndex?: (e: number) => void;
    // disableHorizontalScroll: () => void;
    // enableHorizontalScroll: () => void;
    goToNext?: () => void;
    goToPrevious?: () => void;
    wordRefs: React.MutableRefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>;
    screenRef: React.RefObject<View | null>;
    setTooltip: (obj: ToolTip) => void;
  }) => ReactNode;
}

const ITEM_WIDTH = SIZES.screenWidth - SIZES.bodyPaddingHorizontal * 2;

function SessionLayout<T>({
  children,
  preFetchedData=[],
  showFooter = false,
  onPositionChange,
  onRegisterScroller,
  onActiveItemChange,
  onSessionComplete,
  storeVocabulary = () => {},
  keyboardAvoid = false,
  keyboardVerticalOffset = 90,
}: SessionLayoutProps<T>) {
  const timer = useLessonTimer();
  // Swipe between lessons is intentionally disabled — navigation is
  // programmatic only (goToNext / goToPrevious). horizontalEnabled is kept
  // so child components can still lock/unlock their own inner scroll views
  // via disableHorizontalScroll / enableHorizontalScroll if needed.
  // const [ horizontalEnabled, setHorizontalEnabled ] = useState<boolean>(true)
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

  // On Viewable Item Changed
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 90,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      const visible = viewableItems[0]
      if( !visible ) return;
      const lessonId = visible.item.id;
      // same lesson -> do nothing
      if( activeLessonIdRef.current === lessonId ) return;
      // New Lesson appeared
      activeLessonIdRef.current = lessonId;
      timer.reset();
      timer.start();
    }
  ).current;

  // FlatList on scroll
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / ITEM_WIDTH
      );
      setCurrentIndex(index);
      onPositionChange?.(index);
    },
    [onPositionChange]
  );

  // Register scroller callback
  useEffect(() => {
    if (onRegisterScroller) onRegisterScroller(scrollToIndex);
  }, [onRegisterScroller, scrollToIndex]);

  // Active item callback
  // In SessionLayout — wrap goToNext in a ref so it's stable
  const goToNextRef = useRef(goToNext);
  useEffect(() => { goToNextRef.current = goToNext; }, [goToNext]);

  // Active item callback — only re-fire when currentIndex actually changes
  useEffect(() => {
    if (!preFetchedData.length) return;
    onActiveItemChange?.({ 
      item: preFetchedData[currentIndex], 
      index: currentIndex, 
      goToNext: goToNextRef.current  // stable ref, won't cause re-fires
    });
  }, [currentIndex, preFetchedData]); // ← removed goToNext and onActiveItemChange

  // Stable refs for callbacks that change on every navigation tick.
  // Keeps renderItem's dep array stable so FlatList doesn't invalidate
  // every rendered cell when currentIndex advances.
  const currentIndexRef    = useRef(currentIndex);
  const goToNextStableRef  = useRef(goToNext);
  const goToPrevStableRef  = useRef(goToPrevious);
  const showTooltipRef     = useRef(showTooltip);
  const setCurrentIdxRef   = useRef(setCurrentIndex);
  useEffect(() => { currentIndexRef.current    = currentIndex;   }, [currentIndex]);
  useEffect(() => { goToNextStableRef.current  = goToNext;       }, [goToNext]);
  useEffect(() => { goToPrevStableRef.current  = goToPrevious;   }, [goToPrevious]);
  useEffect(() => { showTooltipRef.current     = showTooltip;    }, [showTooltip]);
  useEffect(() => { setCurrentIdxRef.current   = setCurrentIndex;}, [setCurrentIndex]);

  // renderItem is now fully stable — only re-creates when children or the
  // scroll-lock toggles change, not on every page turn.
  const renderItem: ListRenderItem<T> = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <View style={styles.content}>
        {children({
          item,
          index,
          currentIndex:          currentIndexRef.current,
          setCurrentIndex:       setCurrentIdxRef.current,
          goToNext:              goToNextStableRef.current,
          goToPrevious:          goToPrevStableRef.current,
          wordRefs,
          containerRef,
          screenRef,
          setTooltip:            showTooltipRef.current,
        })}
      </View>
    ),
    [children]
  );

  // Fixed layout optimization for FlatList
  const getItemLayout = useCallback(
    (_: ArrayLike<T> | null | undefined, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    []
  );

  return (
    <SafeAreaLayout>
      {/*
       * KeyboardAvoidingView must sit INSIDE SafeAreaLayout so it only
       * adjusts the content area — not the safe area insets themselves.
       *
       * On Android: behavior="padding" adds bottom padding equal to the
       * keyboard height, keeping the header/nav dots anchored at the top.
       * behavior="height" shrinks the whole container including insets,
       * which pushes the header under the status bar (the bug in Image 3/4).
       *
       * keyboardVerticalOffset is only relevant on iOS.
       * enabled={keyboardAvoid} lets screens without text input skip this entirely.
       */}
      <KeyboardAvoidingView
        style={styles.flex}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        enabled={keyboardAvoid}
        // keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <LessonNavDots data={preFetchedData.map((_, idx) => idx)} currentIndex={currentIndex} />
        
        <View ref={containerRef} style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={preFetchedData}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled

            // scrollEnabled={ horizontalEnabled }
            scrollEnabled={false } // swipe disabled — use goToNext/goToPrevious
            
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}

            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}

            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={3}

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
      </KeyboardAvoidingView>
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
  flex: {flex: 1},
  content: {
    flex: 1,
    width: SIZES.screenWidth - SIZES.bodyPaddingHorizontal * 2,
    marginTop: 25
  }
});