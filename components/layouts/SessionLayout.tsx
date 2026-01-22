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
  TouchableWithoutFeedback,
} from 'react-native';
import SIZES from '@/constants/size';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
// import { useLocalSearchParams } from 'expo-router';
import { ToolTip } from '@/types';
import ToolTipComponent from '@/components/tooltip-components/ToolTipComponent';
import LoadingScreenComponent from '../LoadingScreenComponent';
import LessonNavDots from '../LessonNavDots';
import SessionFooter from '../SessionFooter';
import { useFloatingTooltip } from '@/hooks/useFloatingTooltip';

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
  categoryId?: string;
  unitId?: string;
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
  // const { categoryId, unitId, slug } = useLocalSearchParams();
  
  const [data, setData] = useState<T[]>(preFetchedData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [ horizontalEnabled, setHorizontalEnabled ] = useState<boolean>(true)

  const { tooltip, showTooltip, hideTooltip } = useFloatingTooltip();

  const flatListRef = useRef<FlatList>(null);
  const wordRefs = useRef<Map<string, any>>(new Map());
  const containerRef = useRef<View | null>(null);
  const screenRef = useRef<View | null>(null);

  // Memoized scroll functions
  const scrollToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= data.length) return;
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
      onPositionChange?.(index);
      hideTooltip();
    },
    [data.length, hideTooltip, onPositionChange]
  );

  const goToNext = useCallback(() => {
    if (currentIndex < data.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      onSessionComplete?.();
    }
  }, [currentIndex, data.length, scrollToIndex, onSessionComplete]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  // FlatList on scroll
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / (SIZES.screenWidth - SIZES.bodyPaddingHorizontal * 2)
      );
      setCurrentIndex(index);
      onPositionChange?.(index);
    },
    [onPositionChange]
  );

  const disableHorizontalScroll = () => setHorizontalEnabled(false);
  const enableHorizontalScroll = () => setHorizontalEnabled(true);

  // Register scroller callback
  useEffect(() => {
    if (onRegisterScroller) onRegisterScroller(scrollToIndex);
  }, [onRegisterScroller, scrollToIndex]);

  // Active item callback
  useEffect(() => {
    if (!data.length) return;
    onActiveItemChange?.({ item: data[currentIndex], index: currentIndex, goToNext });
  }, [currentIndex, data, goToNext, onActiveItemChange]);

  if (loading) return <LoadingScreenComponent />;

  // Memoized renderItem for FlatList
  const renderItem = useCallback(
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
        <LessonNavDots data={data.map((_, idx) => idx)} currentIndex={currentIndex} />
        <View ref={containerRef} style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            scrollEnabled={ horizontalEnabled }
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
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
              dataSize={data.length}
            />
          )}

          {tooltip.visible && (
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