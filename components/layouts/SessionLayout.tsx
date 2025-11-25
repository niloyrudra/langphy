import React, { useRef, useState, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable
} from 'react-native';
import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';

import { useLocalSearchParams } from 'expo-router';
// import { db } from '@/utils';
import { ToolTip, UnitIndividualCategory, UnitIndividualCategoryItem } from '@/types';
import ToolTipComponent from '@/components/ToolTipComponent';
import PaginationButton from '@/components/PaginationButton';

const PRACTICE_API_BASE = "http://192.168.1.6:3000";


interface SessionLayoutProps {
  sessionType?: string,
  categoryId?: string,
  unitId?: string,
  children: (props: {
    item: UnitIndividualCategoryItem;
    index: number;
    data?: UnitIndividualCategory[];
    currentIndex: number;
    goToNext?: () => void;
    goToPrevious?: () => void;
    wordRefs: React.MutableRefObject<Map<string, any>>;
    containerRef: React.RefObject<View | null>;
    setTooltip: (obj: ToolTip) => void
  }) => ReactNode
}

const SessionLayout: React.FC<SessionLayoutProps> = ( { children } ) => {
  const { colors } = useTheme();
  const { categoryId, unitId, slug } = useLocalSearchParams();
  const [data, setData] = useState<UnitIndividualCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [ loading, setLoading ] = React.useState<boolean>(false);

  console.log(slug, categoryId, unitId)

  // floating tooltip info
  const [tooltip, setTooltip] = useState<ToolTip>({ visible: false, x: 0, y: 0, translation: '', color: colors.textDark });

  const flatListRef = useRef<FlatList>(null);
  const wordRefs = useRef<Map<string, any>>(new Map());
  const containerRef = useRef<View | null>(null);

  useEffect(() => {
    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${PRACTICE_API_BASE}/api/${slug}/${categoryId}/${unitId}`);
        if (!res.ok) {
          console.error("Error fetching practice data:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
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
  };

  const goToNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
      setTooltip(prev => ({ ...prev, visible: false }));
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
      setTooltip(prev => ({ ...prev, visible: false }));
    }
  };

  return (
    <SafeAreaLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => setTooltip(prev => ({ ...prev, visible: false }))}
      >
        <View ref={containerRef} style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            renderItem={({ item, index }) => (
              <View style={{ width: sizes.screenWidth - (sizes.bodyPaddingHorizontal * 2), marginTop: 25 }}>
                  {children && children({
                      item,
                      index,
                      // data,
                      currentIndex,
                      // goToNext,
                      // goToPrevious,
                      wordRefs,
                      containerRef,
                      setTooltip
                  })}
              </View>
            )}
          />

          {/* Floating Tooltip */}
          {tooltip.visible && (
            <ToolTipComponent
              top={tooltip.y}
              left={tooltip.x}
              translation={tooltip.translation}
            />
          )}

          {/* Navigation Buttons */}
          <View style={styles.navButtons}>
            <PaginationButton
              actionHandler={goToPrevious}
              isDisabled={currentIndex === 0}
              modeLeft={true}
            />
            <PaginationButton
              actionHandler={goToNext}
              isDisabled={currentIndex === data.length - 1}
            />
          </View>

          {/* <FloatingDictionaryIcon /> */}

        </View>
        
      </Pressable>
    </SafeAreaLayout>
  );
};

export default SessionLayout;

const styles = StyleSheet.create({
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    marginTop: 10,
  }
});