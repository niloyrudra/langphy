import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  findNodeHandle,
  UIManager
} from 'react-native';
import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import HorizontalLine from '@/components/HorizontalLine';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import LessonComponent from '@/components/lesson-components/LessonComponent';
// import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';

import { useLocalSearchParams } from 'expo-router';
import { color_legend, db, speechHandler, stripPunctuationHandler } from '@/utils';
import { ToolTip, UnitIndividualCategory, WordRole } from '@/types';
import ToolTipComponent from '@/components/ToolTipComponent';
import PaginationButton from '@/components/PaginationButton';
import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';

const PracticeLessons = () => {
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
                <View style={{ flex: 1 }}>
                  {/* English Section */}
                  <LessonComponent
                    language="English"
                    style={{ borderColor: "#08C1D2" }}
                    buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
                    speechContent={item?.name || item?.meaning}
                    speechLang="en-US"
                  >
                    <Text style={[styles.text, { color: colors.textDark }]}>{item?.name || item?.meaning}</Text>
                  </LessonComponent>

                  <HorizontalLine style={{ marginTop: 30, marginBottom: 50 }} />

                  {/* German Section */}
                  <LessonComponent
                    language="German"
                    style={{ borderColor: "#1B7CF5" }}
                    buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
                    speechContent={item?.phrase}
                    speechLang="de-DE"
                  >
                    {/* Tappable Words with ToolTip */}
                    <ToolTipPerWordComponent
                      onHandler={setTooltip}
                      item={item}
                      containerRef={containerRef}
                      wordRefs={wordRefs}
                    />

                    {/* Sentence Footer */}
                    <View>
                      <Text style={[styles.subText, { color: colors.textSubColor }]}>
                        ({item?.usage_context})
                      </Text>

                      {item?.german_level && (
                        <Text style={[styles.levelText, { color: colors.textSubColor }]}>
                          German Level: ({item?.german_level})
                        </Text>
                      )}
                      {item?.grammar_note && (
                        <Text style={[styles.subText, { color: colors.textSubColor }]}>
                          Grammar Notes: ({item?.grammar_note})
                        </Text>
                      )}
                    </View>
                  </LessonComponent>
                </View>
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

export default PracticeLessons;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "700",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
  },
  levelText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    marginTop: 10,
  }
});