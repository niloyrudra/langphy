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
import api from '@/lib/api';

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
        const res = await api.get(`/practices/${categoryId}/${unitId}`);
        if(res.status !== 200) return setData([])
        
        const data: (PracticeSessionType & BackendLesson)[] = res.data;  
        if( data ) {
          setData(data);
          setLessons(
            data.map((lesson: BackendLesson): Lesson => ({
              id: lesson._id,
              title: lesson.meaning,
              completed: false
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching practice data:", err);
        setData([])
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
        onPositionChange={(index: number) => setCurrentPosition(index)}
        onRegisterScroller={(scrollFn) => {scrollToLessonRef.current = scrollFn}}
      >
        {({ item, wordRefs, containerRef, disableHorizontalScroll, enableHorizontalScroll, screenRef, setTooltip }) => {
          const handleTooltip = (value: any) => setTooltip(value);
          return (
            <ScrollView
              ref={scrollToRef}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              onScrollBeginDrag={disableHorizontalScroll}
              onScrollEndDrag={enableHorizontalScroll}
              scrollEventThrottle={16}
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