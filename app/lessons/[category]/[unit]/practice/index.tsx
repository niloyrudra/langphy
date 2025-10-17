import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable } from 'react-native';
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
import { color_legend, db, speechHandler } from '@/utils';
import { UnitIndividualCategory, WordRole } from '@/types';
// import SIZES from '@/constants/size';

const PracticeLessons = () => {
  const { colors, theme } = useTheme();
  const { rootCategory, unitLessonCategory, slug } = useLocalSearchParams();
  const [data, setData] = useState<UnitIndividualCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [isPressed, setIsPressed] = useState<boolean>(false);
  const [pressedWord, setPressedWord] = useState<{ sentenceIdx: number; wordIdx: number, word: string } | null>(null);

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
          renderItem={({ item }) => {
            // console.log(item?.phrase.split('/'))
            // console.log(item?.german_level)
            // console.log(item?.analysis)
            return (
            <View style={{ width: sizes.screenWidth - (sizes.bodyPaddingHorizontal * 2), marginTop: 25 }}>
              <View style={{ flex: 1 }}>
                {/* English Section */}
                <LessonComponent
                  language="English"
                  iconComponent={theme === 'dark' ? <SpeakerDarkIcon /> : <SpeakerIcon />}
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
                  iconComponent={theme === 'dark' ? <SpeakerAltDarkIcon /> : <SpeakerAltIcon />}
                  style={{ borderColor: "#1B7CF5" }}
                  buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
                  speechContent={item?.phrase}
                  speechLang="de-DE"
                >
                  {                    
                    item?.phrase.split('/').map((content: string, idx: number) => (
                      <View key={idx} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: (pressedWord?.sentenceIdx === idx && pressedWord?.word) ? 40 : 0 }}>
                        
                        {content?.trim()?.split(" ").map((word: string, wIdx: number) => {
                          const key = word.trim();
                          const roles = item?.analysis?.roles?.filter( (keyItem: WordRole) => keyItem?.word === key )[0];
                          const role = roles?.role;
                          const translation = roles?.translation;

                          const colorForWord = color_legend[role as keyof typeof color_legend ] ?? colors.textDark;

                          // let isPressed = false;
                          // console.log(role, translation, colorForWord)

                          const isPressed = pressedWord?.sentenceIdx === idx && pressedWord?.wordIdx === wIdx;

                          return (
                            <TouchableOpacity
                              key={wIdx}
                              style={{
                                marginRight: 6,
                                borderBottomWidth: 1,
                                borderStyle: "dashed",
                                borderBottomColor: '#1B7CF5',
                                marginBottom: 10,

                                position: "relative"
                              }}
                              onPress={() => {
                                speechHandler( key, "de-DE" )
                                // isPressed = !isPressed
                                // setIsPressed( prevVal => !prevVal )
                                // toggle press
                                if (isPressed) {
                                  setPressedWord(null);
                                } else {
                                  setPressedWord({ sentenceIdx: idx, wordIdx: wIdx, word: translation });
                                }
                              }}
                            >
                              <Text style={[styles.mainText, { color: colorForWord }]}>{key}</Text>

                              {translation && isPressed && (
                                <View
                                  style={{
                                    position: "absolute",
                                    top: 30,
                                    left: -20, // 0,
                                    right: -20, // 0,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 6,
                                    
                                    minWidth: "auto",
                                    // width: "100%",
                                    maxWidth: 150,

                                    backgroundColor: "#1B7CF5", // or "white"
                                    zIndex: 9999,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                  }}
                                >
                                  <View>

                                    <Text style={[styles.mainText, { flexWrap: "nowrap", color: colors.textDark, textTransform: "capitalize" }]}>{translation}</Text>
                                  </View>
                                </View>
                              )}

                            </TouchableOpacity>
                          );
                        })}
                        
                      </View>
                    ))
                  }
                  
                  <View>

                    <Text style={[styles.subText, { color: colors.textSubColor }]}>
                      ({item?.usage_context})
                    </Text>

                    {
                      item?.german_level && (
                        <Text style={[styles.levelText, { color: colors.textSubColor }]}>
                          German Level: ({item?.german_level})
                        </Text>
                      )
                    }
                    {
                      item?.grammar_note && (
                        <Text style={[styles.subText, { color: colors.textSubColor }]}>
                          Grammar Notes: ({item?.grammar_note})
                        </Text>
                      )
                    }

                  </View>

                </LessonComponent>
              </View>
            </View>
          )}}
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
    fontSize: 20, // 16,
    fontWeight: "700",

    // marginBottom: 10,
    // display: "flex"
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
  },
  levelText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10
    // marginVertical: 10
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    marginTop: 10,
  },
});