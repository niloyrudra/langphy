import React, { ReactNode } from 'react';
import {
  View,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import sizes from '@/constants/size';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import { router, useLocalSearchParams } from 'expo-router';
import { ToolTip } from '@/types';
import ToolTipComponent from '@/components/tooltip-components/ToolTipComponent';
import LoadingScreenComponent from '../LoadingScreenComponent';
import LessonNavDots from '../LessonNavDots';
import SessionFooter from '../SessionFooter';
import { useFloatingTooltip } from '@/hooks/useFloatingTooltip';

interface SessionLayoutProps<T> {
  sessionType?: string,
  keyboardAvoid?: boolean,
  preFetchedData?: T[],
  showFooter?: boolean,
  onPositionChange?: (index: number) => void,
  onRegisterScroller?: (scrollTo: (index: number) => void) => void,
  onActiveItemChange?: (args: {
    item: T;
    index: number;
    goToNext: () => void;
  }) => void;
  keyboardVerticalOffset ?: number,
  categoryId?: string,
  unitId?: string,
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
    setTooltip: (obj: ToolTip) => void
  }) => ReactNode
}

function SessionLayout<T>( {
  children,
  preFetchedData,
  showFooter=false,
  onPositionChange,
  onRegisterScroller,
  onActiveItemChange,
  keyboardAvoid = false,
  keyboardVerticalOffset = 90
}: SessionLayoutProps<T>) {
  const { categoryId, unitId, slug } = useLocalSearchParams();
  // States
  const [data, setData] = React.useState<T[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [ loading, setLoading ] = React.useState<boolean>(false);
  // floating tooltip hook
  const { tooltip, showTooltip, hideTooltip } = useFloatingTooltip();
  // Refs
  const flatListRef = React.useRef<FlatList>(null);
  const wordRefs = React.useRef<Map<string, any>>(new Map());
  const containerRef = React.useRef<View | null>(null);
  const screenRef = React.useRef<View | null>(null);

  React.useEffect(() => {
    setLoading(true)
    if( preFetchedData ) {
      setData(preFetchedData)
      setLoading(false)
      return;
    }
    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/${slug}/${categoryId}/${unitId}`);
        if (!res.ok) {
          console.error("Error fetching practice data:", res.status);
        }
        const data: T[] = await res.json();
        setData(data)

      } catch (err) {
        console.error("Error fetching practice data:", err);
        setData([])
        // throw err;
      }
      setLoading(false)
    }

    if (categoryId && unitId && slug) dataLoad();
  }, [categoryId, unitId, slug]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
      (sizes.screenWidth - sizes.bodyPaddingHorizontal * 2)
    );
    setCurrentIndex(index);
    if (onPositionChange) onPositionChange(index);
  };

  const goToNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
      if (onPositionChange) onPositionChange(nextIndex);
      hideTooltip();
    }
    else {
      // Last item reached
      Alert.alert(
        "End of Session",
        "You have completed all lessons in this session.",
        [
          { text: 'OK', onPress: () => router.back()}
        ]
      );
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
      if (onPositionChange) onPositionChange(prevIndex);
      hideTooltip();
    }
  };

  const scrollToIndex = React.useCallback((index: number) => {
    if (index < 0 || index >= data.length) return;

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setCurrentIndex(index);
    if (onPositionChange) onPositionChange?.(index);
    hideTooltip();
  }, [data.length, onPositionChange]);

  React.useEffect(() => {
    if (onRegisterScroller) {
      onRegisterScroller(scrollToIndex);
    }
  }, [onRegisterScroller, scrollToIndex]);

  React.useEffect(() => {
    if (!data.length) return;

    onActiveItemChange?.({
      item: data[currentIndex],
      index: currentIndex,
      goToNext,
    });
  }, [currentIndex, data]);

  if( loading ) return (<LoadingScreenComponent />)

  return (
    <SafeAreaLayout>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={keyboardAvoid}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={hideTooltip}
        >

          <LessonNavDots data={data.map((_, idx) => idx)} currentIndex={currentIndex} />

          <View ref={containerRef} style={{ flex: 1, position: "relative" }}>
            <FlatList
              ref={flatListRef}
              data={data}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              keyboardShouldPersistTaps="handled"
              // IMPORTANT: these fix alignment issues
              removeClippedSubviews={false}
              disableVirtualization={true}

              // contentContainerStyle={{
                // flexGrow: 1,
                // paddingBottom: keyboardAvoid ? keyboardVerticalOffset  : 0
              // }}
              renderItem={({ item, index }) => (
                <View style={{flex:1, width: sizes.screenWidth - (sizes.bodyPaddingHorizontal * 2), marginTop: 25 }}>
                  {children && children({
                    item,
                    index,
                    // data,
                    currentIndex,
                    setCurrentIndex,
                    goToNext,
                    goToPrevious,
                    wordRefs,
                    containerRef,
                    screenRef,
                    setTooltip: showTooltip
                  })}
                </View>
              )}
            />

            {/* Navigation Buttons */}
            {
              showFooter && (
                <SessionFooter
                  goToNext={goToNext}
                  goToPrevious={goToPrevious}
                  currentIndex={currentIndex}
                  dataSize={data.length || 0}
                />
              )
            }

            {/* Floating Tooltip */}
            {tooltip.visible && (
              <ToolTipComponent
                top={tooltip.y}
                left={tooltip.x}
                token={tooltip.token}
              />
            )}

          </View>
        
        </Pressable>


      </KeyboardAvoidingView>
    </SafeAreaLayout>
  );
};

export default SessionLayout;