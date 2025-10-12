import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import HorizontalLine from '@/components/HorizontalLine';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import LessonComponent from '@/components/lesson-components/LessonComponent';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';
import { 
  SpeakerIcon, SpeakerAltIcon, SpeakerAltDarkIcon, SpeakerDarkIcon,
  PreviousBtnLight, PreviousBtnDark, NextBtnLight, NextBtnDark
} from '@/utils/SVGImages';
import { useLocalSearchParams } from 'expo-router';
import { db } from '@/utils';
import { UnitIndividualCategory } from '@/types';

const PracticeLessons = () => {
  const { colors, theme } = useTheme();
  const { rootCategory, unitLessonCategory, slug } = useLocalSearchParams();
  const [data, setData] = useState<UnitIndividualCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadData = async () => {
      const unitData = await db[rootCategory as keyof typeof db];
      if (Array.isArray(unitData)) {
        const unitSpecificData = unitData.filter(item => item.category === unitLessonCategory);
        setData(unitSpecificData[0]?.items || []);
      } else {
        console.warn(`No data found for slug: ${rootCategory}`);
        setData([]);
      }
    };
    if (rootCategory && unitLessonCategory && slug) loadData();
  }, [rootCategory, unitLessonCategory, slug]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (sizes.screenWidth - sizes.bodyPaddingHorizontal * 2));
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <SafeAreaLayout>
      <View style={{ flex: 1 }}>
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
                  iconComponent={theme === 'dark' ? <SpeakerDarkIcon /> : <SpeakerIcon />}
                  style={{ borderColor: "#08C1D2" }}
                  buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
                >
                  <Text style={[styles.text, { color: colors.textDark }]}>{item?.meaning}</Text>
                </LessonComponent>

                <HorizontalLine style={{ marginTop: 30, marginBottom: 50 }} />

                {/* German Section */}
                <LessonComponent
                  language="German"
                  iconComponent={theme === 'dark' ? <SpeakerAltDarkIcon /> : <SpeakerAltIcon />}
                  style={{ borderColor: "#1B7CF5" }}
                  buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
                >
                  <Text style={[styles.mainText, { color: colors.textDark }]}>{item?.phrase}</Text>
                  <Text style={[styles.subText, { color: colors.textSubColor }]}>
                    ({item?.usage_context})
                  </Text>
                </LessonComponent>
              </View>
            </View>
          )}
        />

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={goToPrevious} disabled={currentIndex === 0}>
            {theme === 'light'
              ? <PreviousBtnLight width={167} height={sizes.buttonHeight} opacity={currentIndex === 0 ? 0.5 : 1} />
              : <PreviousBtnDark width={167} height={sizes.buttonHeight} opacity={currentIndex === 0 ? 0.5 : 1} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={goToNext} disabled={currentIndex === data.length - 1}>
            {theme === 'light'
              ? <NextBtnLight width={167} height={sizes.buttonHeight} opacity={currentIndex === data.length - 1 ? 0.5 : 1} />
              : <NextBtnDark width={167} height={sizes.buttonHeight} opacity={currentIndex === data.length - 1 ? 0.5 : 1} />}
          </TouchableOpacity>
        </View>

        <FloatingDictionaryIcon />
      </View>
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
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    marginTop: 10,
  },
});