import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { Lesson, PracticeSessionType } from '@/types';
import ListeningComponent from '@/components/listening-components/ListeningComponent';
import { useSession } from '@/context/SessionContext';
import STYLES from '@/constants/styles';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';

type BackendLesson = {
  _id: string;
  meaning: string;
};

const PracticeLessons = () => {
  const { colors, theme } = useTheme();

  const { lessons, setLessons, currentPosition, showLessonList, setCurrentPosition } = useSession();

  const {categoryId, slug, unitId} = useLocalSearchParams();

  const [data, setData] = React.useState<PracticeSessionType[]>([]);
  const [ loading, setLoading ] = React.useState<boolean>(false);

  React.useEffect(() => {
    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/${slug}/${categoryId}/${unitId}`);
        if (!res.ok) {
          console.error("Error fetching practice data:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const data: T[] = await res.json();
        const data: (PracticeSessionType & BackendLesson)[] = await res.json();
        setData(data)

        setLessons(
          data.map((l: BackendLesson): Lesson => ({
            id: l._id,
            title: l.meaning,
            completed: false,
          }))
        );

      } catch (err) {
        console.error("Error fetching practice data:", err);
        setData([])
        // throw err;
      }
      setLoading(false)
    }

    if (categoryId && unitId && slug) dataLoad();
  }, [categoryId, unitId, slug]);

  if( loading ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<PracticeSessionType>
        preFetchedData={data}
        showFooter={true}
        sessionType={typeof slug == 'string' ? slug : ""}
        categoryId={ typeof categoryId == 'string' ? categoryId : "" }
        unitId={ typeof unitId == 'string' ? unitId : "" }
        onPositionChange={(index: number) => setCurrentPosition(index)}
      >
        {({ item, wordRefs, containerRef, setTooltip }) => {
          const handleTooltip = (value: any) => {
            setTooltip(value);
          };

          return (
            <ScrollView
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ flex: 1, paddingTop: 50 }}>
                {/* English Section */}
                <ListeningComponent
                  language="English"
                  color="#0A9AB0"
                  style={{backgroundColor: colors.listeningCardBackgroundColor}} // {{ borderColor: "#08C1D2" }}
                  buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
                  speechContent={item.meaning}
                  speechLang="en-US"
                >
                  {/* <Text style={[styles.text, { color: colors.textDark }]}>{item?.name || item?.meaning}</Text> */}
                  <Text style={[styles.text, { color: colors.text }]}>{item.meaning}</Text>
                </ListeningComponent>

                {/* <HorizontalLine style={{ marginTop: 30, marginBottom: 50 }} /> */}
                <View style={{height: 80}} />

                {/* German Section */}
                <ListeningComponent
                  language="German"
                  color="#1B7CF5"
                  style={{backgroundColor: colors.listeningCardBackgroundColor}} // {{ borderColor: "#1B7CF5" }}
                  buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
                  speechContent={item.phrase}
                  speechLang="de-DE"
                >
                  {/* Tappable Words with ToolTip */}
                  <ToolTipPerWordComponent
                    onHandler={handleTooltip}
                    item={item}
                    containerRef={containerRef}
                    wordRefs={wordRefs}
                    textContainerStyle={{marginBottom: 10}}
                  />

                  {/* Sentence Footer */}
                  {
                    item?.usage_context && (
                      <View
                        style={{
                          width: "100%",
                          backgroundColor: "#142957",
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          borderRadius: 16,
                          marginTop: 'auto'
                        }}
                      >

                        <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                          <Text style={[styles.subText, { color: "#24DEEC" }]}>Context:</Text>
                          <Text style={[styles.subText, { color: colors.textSubColor }]}>
                            {item?.usage_context}
                          </Text>
                        </View>

                        <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                          <Text style={[styles.subText, { color: "#24DEEC" }]}>Additional Info:</Text>
                          <Text style={[styles.subText, { color: colors.textSubColor }]}>
                            {item?.discussion ?? "..."}
                          </Text>
                        </View>

                        <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                          <Text style={[styles.subText, { color: "#24DEEC" }]}>Grammer Notes:</Text>
                          <Text style={[styles.subText, { color: colors.textSubColor }]}>
                            {item?.grammar_note}
                          </Text>
                        </View>

                        {
                          item?.formality && (
                            <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                              <Text style={[styles.subText, { color: "#24DEEC" }]}>Formality:</Text>
                              <Text style={[styles.subText, { color: colors.textSubColor }]}>
                                {item?.formality}
                              </Text>
                            </View>
                          )
                        }

                        <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
                          <Text style={[styles.subText, { color: "#24DEEC" }]}>Regions:</Text>
                          <Text style={[styles.subText, { color: colors.textSubColor }]}>
                            {item?.region}
                          </Text>
                        </View>

                        <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5, alignItems: "flex-end"}}>
                          <Text style={[styles.subText, { color: "#24DEEC" }]}>Level:</Text>
                          <Text style={[styles.subText, { fontSize: 16, fontWeight: "900", color: colors.textSubColor }]}>
                            {item?.german_level || "A1"}
                          </Text>
                        </View>

                        {
                          item?.examples.length && item.examples.every(item => item?.example !== "") && (
                            <View style={{flexDirection:"column", alignItems: "flex-start", marginTop: 10}}>
                              <Text style={[styles.subText, { color: "#24DEEC" }]}>Examples:</Text>
                              {
                                item.examples.map( (item, idx) => (
                                  <View
                                    key={idx.toString()}
                                    style={{
                                      flex: 1,
                                      width: "100%",
                                      padding: 10,
                                      borderStartStartRadius: 0,
                                      borderStartEndRadius: 15,
                                      borderEndEndRadius: 15,
                                      borderEndStartRadius: 15,
                                      backgroundColor: colors.LessonSourceCardBackgroundColor,
                                      marginTop: 10,
                                      gap: 6
                                    }}
                                  >
                                    <Text style={[styles.subText, { fontSize: 14, fontWeight: "900", color: colors.textSubColor }]}>
                                      {item?.example}
                                    </Text>
                                    <Text style={[styles.subText, { fontSize: 13, fontWeight: "900", color: colors.textSubColor }]}>
                                      [ {item?.translation} ]
                                    </Text>
                                  </View>
                                ))
                              }
                            </View>
                          )
                        }

                      </View>
                    )
                  }

                </ListeningComponent>

                <View style={{height: 30}} />
              </View>

            </ScrollView>
          )
        }}
      </SessionLayout>
    
      {/* Overlay lesson inspector */}
      {
        showLessonList && (
          <View
            style={[
              {
                position: "absolute",
                top: 0,
                right: 0,
                width: "70%",
                height: "auto", // "100%",
                backgroundColor: colors.primary_950_50, // "rgba(0,0,0,0.6)",
                padding: 16,
                borderRadius: 16,
                zIndex: 100,
              },
              STYLES.boxShadow
            ]}
          >
            {lessons.map((lesson, idx) => (
              <Text
                key={lesson.id}
                style={{
                  color: idx === currentPosition ? (theme === 'light' ? 'blue' : "green") : colors.text,
                  paddingVertical: 8,
                  fontWeight: idx === currentPosition ? "bold" : "normal",
                  opacity: lesson.completed ? 0.35 : 1,
                }}
              >
                {idx + 1}. {lesson.title}
              </Text>
            ))}
          </View>
        )
      }
    </>
  );
};

export default PracticeLessons;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    alignItems: "center"
  },
  mainText: {
    fontSize: 20,
    fontWeight: "700",
  },
  subText: {
    fontSize: 13,
    fontWeight: "400",
    // flexWrap: "wrap"
  },
  levelText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10
  }
});