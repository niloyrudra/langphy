import React, { ReactNode, useCallback, useEffect, useRef, useState, memo } from 'react';
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
  keyboardVerticalOffset?: number;
  children: (props: {
    item: T;
    index: number;
    data?: T[];
    currentIndex: number;
    setCurrentIndex?: (e: number) => void;
    disableHorizontalScroll: () => void;
    enableHorizontalScroll: () => void;
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
  keyboardAvoid = false,
  keyboardVerticalOffset = 90,
}: SessionLayoutProps<T>) {
  const timer = useLessonTimer();
  const [ horizontalEnabled, setHorizontalEnabled ] = useState<boolean>(true)
  const { tooltip, showTooltip, hideTooltip } = useFloatingTooltip();
  const wordRefs = useRef<Map<string, any>>(new Map());
  const containerRef = useRef<View | null>(null);
  const screenRef = useRef<View | null>(null);
  const activeLessonIdRef = useRef<string | null>(null)

  const { flatListRef, currentIndex, setCurrentIndex, scrollToIndex, goToNext, goToPrevious } = useSessionPager<T>( preFetchedData.length, onPositionChange, onSessionComplete );

  // On Viewable Item Changed
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 90,
  };

  const onVirewableItemsChanged = useRef(
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

  const disableHorizontalScroll = useCallback(() => setHorizontalEnabled(false), []);
  const enableHorizontalScroll = useCallback(() => setHorizontalEnabled(true), []);

  // Register scroller callback
  useEffect(() => {
    if (onRegisterScroller) onRegisterScroller(scrollToIndex);
  }, [onRegisterScroller, scrollToIndex]);

  // Active item callback
  useEffect(() => {
    if (!preFetchedData.length) return;
    onActiveItemChange?.({ item: preFetchedData[currentIndex], index: currentIndex, goToNext });
  }, [currentIndex, preFetchedData, goToNext, onActiveItemChange]);

  // Memoized renderItem for FlatList
  const renderItem: ListRenderItem<T> = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <View style={styles.content}>
        {children({
          item,
          index,
          currentIndex,
          setCurrentIndex,
          disableHorizontalScroll,
          enableHorizontalScroll,
          goToNext,
          goToPrevious,
          wordRefs,
          containerRef,
          screenRef,
          setTooltip: showTooltip,
        })}
      </View>
    ),
    [children, currentIndex, goToNext, goToPrevious, showTooltip]
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={keyboardAvoid}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <LessonNavDots data={preFetchedData.map((_, idx) => idx)} currentIndex={currentIndex} />
        <View ref={containerRef} style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={preFetchedData}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            scrollEnabled={ horizontalEnabled }
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}

            onViewableItemsChanged={onVirewableItemsChanged}
            viewabilityConfig={viewabilityConfig}

            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={5}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
          />

          {showFooter && (
            <SessionFooter
              goToNext={goToNext}
              goToPrevious={goToPrevious}
              currentIndex={currentIndex}
              contentId={(preFetchedData[currentIndex] as any)?._id ?? ''}
              dataSize={preFetchedData.length}
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
    position: 'relative'
  },
  content: {
    flex: 1,
    width: SIZES.screenWidth - SIZES.bodyPaddingHorizontal * 2,
    marginTop: 25
  }
});