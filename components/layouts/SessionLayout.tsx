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
import { db } from '@/utils';
import { ToolTip, UnitIndividualCategory } from '@/types';
import ToolTipComponent from '@/components/ToolTipComponent';
import PaginationButton from '@/components/PaginationButton';


interface SessionLayoutProps {
    children: ReactNode
}

const SessionLayout: React.FC<SessionLayoutProps> = ( { children } ) => {
  const { colors } = useTheme();
  const { rootCategory, unitLessonCategory, slug } = useLocalSearchParams();
  const [data, setData] = useState<UnitIndividualCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // floating tooltip info
  const [tooltip, setTooltip] = useState<ToolTip>({ visible: false, x: 0, y: 0, translation: '', color: colors.textDark });

  const flatListRef = useRef<FlatList>(null);
  const wordRefs = useRef<Map<string, any>>(new Map());
  const containerRef = useRef<View | null>(null);


  useEffect(() => {
    const loadData = async () => {
      const unitData = await db[rootCategory as keyof typeof db];
      if (Array.isArray(unitData)) {
        const unitSpecificData = unitData.filter(item => item.category === unitLessonCategory);
        setData((unitSpecificData[0] as any)?.items || []);
      } else {
        console.warn(`No data found for slug: ${rootCategory}`);
        setData([]);
      }
    };
    if (rootCategory && unitLessonCategory && slug) loadData();
  }, [rootCategory, unitLessonCategory, slug]);

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
            renderItem={({ item }) => (
              <View style={{ width: sizes.screenWidth - (sizes.bodyPaddingHorizontal * 2), marginTop: 25 }}>
                {children && children}
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