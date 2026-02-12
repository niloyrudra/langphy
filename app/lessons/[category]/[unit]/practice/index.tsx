import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import SessionLayout from '@/components/layouts/SessionLayout';
import { router, useLocalSearchParams } from 'expo-router';
import { SessionType, PracticeSessionType } from '@/types';
import ListeningComponent from '@/components/listening-components/ListeningComponent';
import { useSession } from '@/context/SessionContext';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import PracticeLessonDetails from '@/components/practice-components/LessonDetails';
import LessonList from '@/components/practice-components/LessonList';
import { useLessons } from '@/hooks/useLessons';
import { useProgress } from '@/hooks/useProgress';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { randomUUID } from 'expo-crypto';

const attemptId = randomUUID();

const PracticeLessons = () => {
  const { colors } = useTheme();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const {start, stop, isRunning} = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;

  const scrollToLessonRef = React.useRef<((index: number) => void) | null>(null);
  const scrollToRef = React.useRef<ScrollView>(null);
  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);

  const sessionKey = `${unitId}:${slug}`; // unitId:sessionType:attemptId

  // Essential Custom hooks
  const { currentPosition, showLessonList, setCurrentPosition } = useSession();
  const { data: practiceLessons, isLoading: lessonsLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const { data: progress } = useProgress( sessionKey );

  // Fetch Primary Lesson data
  const practiceData = useMemo<PracticeSessionType[]>(() => {
    if (!practiceLessons) return [];

    return practiceLessons.map(l => JSON.parse(l.payload));
  }, [practiceLessons]);

  // Update LessonList data
  const lessonListData = useMemo(() => {
    if (!practiceLessons || !progress) return [];

    return practiceLessons.map(l => {
      const payload = JSON.parse(l.payload);
      const p = progress.find(pr => pr.content_id === l.id);

      return {
        id: l.id,
        title: payload.meaning,
        completed: p?.completed === 1,
      };
    });
  }, [practiceLessons, progress]);

  const onContinueHandler = React.useCallback(() => {
    setShowCompletionModal(false);
    // navigation back to units page
    router.back();
  }, [router, setShowCompletionModal]);

  const onModalOpenHandler = React.useCallback(() => setShowCompletionModal(true), [setShowCompletionModal]);
  const onModalCloseHandler = React.useCallback(() => setShowCompletionModal(false), [setShowCompletionModal]);
  const onPositionChangeHandler = React.useCallback((index: number) => setCurrentPosition(index), [setCurrentPosition]);
  const onScrollerHandler = React.useCallback((scrollFn: ((index: number) => void)) => {scrollToLessonRef.current = scrollFn}, []);

  React.useEffect(() => {
    if(!isRunning) start();
  }, [ isRunning ])

  if( lessonsLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<PracticeSessionType>
        preFetchedData={practiceData}
        showFooter={true}
        onSessionComplete={onModalOpenHandler}
        onPositionChange={onPositionChangeHandler}
        onRegisterScroller={onScrollerHandler} // {(scrollFn) => {scrollToLessonRef.current = scrollFn}}
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
                style={styles.container}
              >
                {/* English Section */}
                <ListeningComponent
                  language="English"
                  color="#0A9AB0"
                  style={{backgroundColor: colors.listeningCardBackgroundColor}}
                  buttonStyle={{ backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor }}
                  speechContent={item.meaning}
                  speechLang="en-US"
                >
                  <Text style={[styles.text, { color: colors.text }]}>{item.meaning}</Text>
                </ListeningComponent>

                <View style={styles.space} />

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
                    textContainerStyle={styles.nlp}
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

              </View>
            </ScrollView>
          )
        }}
      </SessionLayout>
    
      {/* Overlay lesson inspector */}
      {
        showLessonList && (
          <LessonList
            lessons={lessonListData}
            scrollToLessonRef={scrollToLessonRef}
            currentPosition={currentPosition}
          />
        )
      }

      {
        showCompletionModal && (
          <UnitCompletionModal
            isVisible={showCompletionModal}
            sessionKey={sessionKey}
            onContinue={onContinueHandler}
            onModalVisible={onModalCloseHandler}
          />
        )
      }
    </>
  );
};

export default PracticeLessons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginBottom: 30
  },
  space: {
    height: 80
  },
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
  },
  nlp: {
    marginBottom: 15
  }
});