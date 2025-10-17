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
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';
import {
  SpeakerIcon, SpeakerAltIcon, SpeakerAltDarkIcon, SpeakerDarkIcon,
  PreviousBtnLight, PreviousBtnDark, NextBtnLight, NextBtnDark
} from '@/utils/SVGImages';
import { useLocalSearchParams } from 'expo-router';
import { color_legend, db, speechHandler } from '@/utils';
import { UnitIndividualCategory, WordRole } from '@/types';
import SIZES from '@/constants/size';

const PracticeLessons = () => {
  const { colors, theme } = useTheme();
  const { rootCategory, unitLessonCategory, slug } = useLocalSearchParams();
  const [data, setData] = useState<UnitIndividualCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // floating tooltip info
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    translation: string;
    color: string;
  }>({ visible: false, x: 0, y: 0, translation: '', color: colors.textDark });

  const flatListRef = useRef<FlatList>(null);
  const wordRefs = useRef<Map<string, any>>(new Map());
  const containerRef = useRef<View | null>(null);


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
        {/* <View ref={containerRef} style={{ flex: 1 }}> */}

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
                      {item?.phrase.split('/').map((content: string, idx: number) => (
                        <View key={idx} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
                          {content?.trim()?.split(" ").map((word: string, wIdx: number) => {
                            const key = word.trim();
                            const roles = item?.analysis?.roles?.find((keyItem: WordRole) => keyItem?.word === key);
                            const role = roles?.role;
                            const translation = roles?.translation;

                            const colorForWord = color_legend[role as keyof typeof color_legend] ?? colors.textDark;

                            return (
                              <TouchableOpacity
                                key={wIdx}
                                // ref={ref => {
                                //   if (ref) wordRefs.current.set(`${idx}-${wIdx}`, ref);
                                // }}
                                ref={(r) => {
                                  const mapKey = `${idx}-${wIdx}`;
                                  if (r) {
                                    wordRefs.current.set(mapKey, r);
                                  } else {
                                    wordRefs.current.delete(mapKey);
                                  }
                                }}
                                style={{
                                  marginRight: 6,
                                  borderBottomWidth: 1,
                                  borderStyle: "dashed",
                                  borderBottomColor: '#1B7CF5',
                                  marginBottom: 10,
                                }}

                                onPress={() => {
                                  speechHandler(key, "de-DE");

                                  const mapKey = `${idx}-${wIdx}`;
                                  const node = wordRefs.current.get(mapKey);
                                  if (!node) return;

                                  // helper to call measureInWindow on a node ref (prefers instance method)
                                  const measureInWindowSafe = (refNode: any, cb: (x:number,y:number,w:number,h:number)=>void) => {
                                    if (!refNode) return;
                                    if (typeof refNode.measureInWindow === 'function') {
                                      // instance method (preferred, not deprecated in usage)
                                      (refNode as any).measureInWindow(cb);
                                      return;
                                    }
                                    // fallback for older RN versions: use findNodeHandle + UIManager.measureInWindow (may be deprecated in types)
                                    const handle = findNodeHandle(refNode);
                                    if (!handle) return;
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore - using UIManager.measureInWindow fallback
                                    UIManager.measureInWindow(handle, cb);
                                  };

                                  // Measure the pressed word
                                  measureInWindowSafe(node, (wordX, wordY, wordW, wordH) => {
                                    // Measure the container to convert window coords -> container local coords
                                    const containerNode = containerRef.current;
                                    if (!containerNode) {
                                      // If container not available, fallback to using window coords directly
                                      setTooltip({
                                        visible: true,
                                        x: wordX,
                                        y: wordY + wordH + 4,
                                        translation: translation || "",
                                        color: colorForWord,
                                      });
                                      return;
                                    }

                                    measureInWindowSafe(containerNode, (contX, contY, contW, contH) => {
                                      const gap = 6;
                                      const relativeTop = wordY - contY + wordH + gap;
                                      // Optionally shift left if tooltip would overflow later (not shown here)
                                      setTooltip({
                                        visible: true,
                                        x: Math.max(6, wordX - contX), // keep at least 6px left padding in container
                                        y: relativeTop,
                                        translation: translation || "",
                                        color: colorForWord,
                                      });
                                    });
                                  });
                                }}

                              >
                                <Text style={[styles.mainText, { color: colorForWord }]}>{key}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      ))}

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
              <View
                style={{
                  position: "absolute",
                  top: tooltip.y,
                  left: tooltip.x,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  backgroundColor: "#1B7CF5", // colors.cardBackground,
                  maxWidth: 250,
                  zIndex: 9999,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text style={[styles.mainText, { textTransform: "capitalize", color: colors.textDark /*tooltip.color*/ }]}>
                  {tooltip.translation}
                </Text>
              </View>
            )}

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
        
        {/* </View> */}

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
  },
});