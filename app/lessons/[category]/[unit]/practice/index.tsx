import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { Lesson, PracticeSessionType } from '@/types';
import ListeningComponent from '@/components/listening-components/ListeningComponent';
import { useSession } from '@/context/SessionContext';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import PracticeLessonDetails from '@/components/practice-components/LessonDetails';
import LessonList from '@/components/practice-components/LessonList';

type BackendLesson = {
  _id: string;
  meaning: string;
};

const PracticeLessons = () => {
  const { colors } = useTheme();
  const scrollToLessonRef = React.useRef<((index: number) => void) | null>(null);
  const scrollToRef = React.useRef<ScrollView>(null);
  const { lessons, setLessons, currentPosition, showLessonList, setCurrentPosition } = useSession();

  const {categoryId, slug, unitId} = useLocalSearchParams();

  const [data, setData] = React.useState<PracticeSessionType[]>([]);
  const [ loading, setLoading ] = React.useState<boolean>(false);

  React.useEffect(() => {
    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/practices/${categoryId}/${unitId}`);
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

  // console.log("ScrollViewRef ==>", scrollToRef?.current?.getScrollableNode());
  // console.log("ScrollViewRef ==>", scrollToRef?.current?.scrollTo());
  // console.log("ScrollViewRef ==>", scrollToRef?.current?.getNativeScrollRef());
  // console.log("ScrollViewRef ==>", scrollToRef?.current?.getInnerViewNode());

  return (
    <>
      <SessionLayout<PracticeSessionType>
        preFetchedData={data}
        showFooter={true}
        sessionType={typeof slug == 'string' ? slug : ""}
        categoryId={ typeof categoryId == 'string' ? categoryId : "" }
        unitId={ typeof unitId == 'string' ? unitId : "" }
        onPositionChange={(index: number) => setCurrentPosition(index)}
        onRegisterScroller={(scrollFn) => {scrollToLessonRef.current = scrollFn}}
      >
        {({ item, wordRefs, containerRef, setCurrentIndex, screenRef, setTooltip }) => {
          const handleTooltip = (value: any) => setTooltip(value);
          return (
            <ScrollView
              ref={scrollToRef}
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
            >
              <View
                ref={screenRef}
                style={{ flex: 1, paddingTop: 50 }}
              >
                {/* English Section */}
                <ListeningComponent
                  language="English"
                  color="#0A9AB0"
                  style={{backgroundColor: colors.listeningCardBackgroundColor}} // {{ borderColor: "#08C1D2" }}
                  buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
                  speechContent={item.meaning}
                  speechLang="en-US"
                >
                  <Text style={[styles.text, { color: colors.text }]}>{item.meaning}</Text>
                </ListeningComponent>

                <View style={{height: 80}} />

                {/* German Section */}
                <ListeningComponent
                  language="German"
                  color="#1B7CF5"
                  style={{backgroundColor: colors.listeningCardBackgroundColor}}
                  buttonStyle={{ backgroundColor: colors.lessonActionCardSpeakerBackgroundColor }}
                  speechContent={item.phrase}
                  speechLang="de-DE"
                >

                  {/* Tappable Words with ToolTip */}
                  <NLPAnalyzedPhase
                    phrase={item.phrase}
                    onHandler={handleTooltip}
                    containerRef={containerRef}
                    screenRef={screenRef}
                    wordRefs={wordRefs}
                    textContainerStyle={{marginBottom: 15}}
                  />

                  {/* Sentence Footer */}
                  {
                    item?.usage_context && (
                      <PracticeLessonDetails
                        usage_context={item?.usage_context || ""}
                        german_level={item?.german_level || ""}
                        formality={item?.formality || ""}
                        discussion={item?.discussion || ""}
                        region={item?.region || ""}
                        grammar_note={item?.grammar_note || ""}
                        examples={item?.examples || []}
                      />
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
          <LessonList
            lessons={lessons}
            scrollToLessonRef={scrollToLessonRef}
            currentPosition={currentPosition}
          />
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