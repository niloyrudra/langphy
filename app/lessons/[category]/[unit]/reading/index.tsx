import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import { getCardContainerWidth } from '@/utils';
import { SelectiveResultType, ReadingSessionType, SessionType } from '@/types';
// Components
import HorizontalLine from '@/components/HorizontalLine';
import QuizOptions from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { router, useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import SessionResultModal from '@/components/modals/SessionResultModal';
import { useLessons } from '@/hooks/useLessons';
import { lessonCompletionChain } from '@/domain/lessonCompletionChain';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useLessonTimer } from '@/hooks/useLessonTimer';
import { randomUUID } from 'expo-crypto';

const attemptId = randomUUID();

const ReadingLessons = () => {
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const userId = authSnapshot.getUserId() ?? "";
  const { colors } = useTheme();
  const {start, stop, isRunning} = useLessonTimer();
  const performanceSessionKey = `${unitId}:${slug as SessionType}:${attemptId}`;
  const cardWidth = getCardContainerWidth();

  const { data: readingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as SessionType );
  const goToNextRef = React.useRef<(() => void) | null>(null);
  const activeLessonOrderRef = React.useRef<number>(0);
  const currentLessonRef = React.useRef<ReadingSessionType | null>(null);

  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ isCorrect, setIsCorrect ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SelectiveResultType | null>(null)


  const lessonData = React.useMemo<ReadingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  // Handlers
  const handleSelect = (option: string) => {
    setSelectedOption( prevValue => prevValue = option);
    setIsSelectionHappened( prevValue => prevValue = true);
  };

  const reset = React.useCallback(() => {
    setSelectedOption("");
    setIsSelectionHappened(false);
    setIsCorrect(false);
    setResult(null);
    setError("");
    // setLoading(false);
  }, []);

  const onLessonComplete = React.useCallback(async (lesson: ReadingSessionType, score: number) => {
    if(!userId) return;
    try {
      const duration_ms = stop();
      const sessionType = slug as SessionType;
      const sessionKey = `${unitId}:${sessionType}`;
      const lessonOrder = activeLessonOrderRef.current;
      const isFinalLesson = lessonOrder === lessonData.length - 1;
  
      await lessonCompletionChain({
        userId,
        sessionKey,
        performanceSessionKey,
        lessonId: lesson.id ?? lesson?._id,
        lessonOrder: lessonOrder,
        sessionType,
        lessonType: sessionType,
        score,
        duration_ms,
        isFinalLesson
      });
    }
    catch(error) {
      console.error("onLessonComplete error:", error)
    }
  }, [userId, slug, lessonData?.length, stop]);

  const onContinue = React.useCallback( async () => {
    try {
      const score = result?.isCorrect ? 100 : 0;
      await onLessonComplete( currentLessonRef.current!, score );
      reset();
      goToNextRef?.current && goToNextRef.current?.();
    }
    catch(error) {
      console.error("Reading Question Completion error:", error);
    }
  }, [reset, result, onLessonComplete]);

  const onContinueHandler = React.useCallback(() => {
    reset();
    setShowCompletionModal(false);
    // navigation back to units page
    router.back();
  }, [reset, setShowCompletionModal, router]);
  
  const modalVisibilityHandler = React.useCallback(() => setShowCompletionModal(true), [setShowCompletionModal]);
  const modalCloseHandler = React.useCallback(() => setShowCompletionModal(false), [setShowCompletionModal]);

  const activeItemChangeHandler = React.useCallback(({item, index, goToNext}: {item: ReadingSessionType, index: number, goToNext: () => void}) => {
    activeLessonOrderRef.current = index;
    currentLessonRef.current = item;
    reset();
    // You can use goToNextRef.current() to navigate to the next item from outside
    goToNextRef.current = goToNext;
  }, [reset])

  // Timer
  React.useEffect(() => {
    if(!isRunning) start();
  }, [isRunning]);

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<ReadingSessionType>
        preFetchedData={lessonData}
        onSessionComplete={modalVisibilityHandler}
        onActiveItemChange={activeItemChangeHandler}
      >
        {({ item, wordRefs, containerRef, screenRef, setTooltip }) => {
          const handleTooltip = (value: any) => {
            setTooltip(value);
          };
          const onCheckHandler = () => {
            const result: boolean = selectedOption === item?.answer;
            setIsCorrect( result )
            setResult({
              isCorrect: result,
              answered: selectedOption || "",
              feedback: {
                label: result ? "Correct" : "Incorrect",
                color: result ? "green" : "red"
              }
            });
          };
          
          return (
            <View style={styles.flex}>

              <View style={styles.flex}>
                {/* Title Section */}
                <ChallengeScreenTitle title="Read The Comprehension." />

                  <View style={[styles.container]}>
                    {/* Query Listen with Query Text Section */}
                    <SpeakerComponent
                      speechContent={item?.phrase}
                      speechLang='de-DE'
                    />
                            
                    {/* Tappable Words with ToolTip */}
                    <NLPAnalyzedPhase
                      phrase={item.phrase}
                      onHandler={handleTooltip}
                      wordRefs={wordRefs}
                      containerRef={containerRef}
                      screenRef={screenRef}
                      textStyle={styles.text}
                      textContainerStyle={styles.textContainer}
                    />
                  </View>

                <HorizontalLine />

                <View style={styles.questionSection}>
                  <View style={styles.questionWrapper}>
                    <Text style={[styles.question, {color: colors.text}]}>{item?.question_en}</Text>
                  </View>

                  {/* QUIZ Answer Options */}
                  <QuizOptions 
                    height={cardWidth / 2} 
                    options={Array.isArray(item?.options) && item.options.length > 0 ? item.options : ["", "", "", ""]}
                    answer={item?.answer || ""}
                    isCorrect={ isCorrect }
                    selectedOption={selectedOption || ""}
                    onSelect={handleSelect}
                    isSelectionHappened={isSelectionHappened}
                  />

                </View>
              </View>

              {/* Action Buttons */}
              <ActionPrimaryButton
                buttonTitle='Check'
                onSubmit={onCheckHandler}
                disabled={!selectedOption ? true : false }
              />

            </View>
          );
        }}
      </SessionLayout>              
    
      {
        result && (<SessionResultModal
          isVisible={result ? true : false}
          result={result!}
          onContinue={onContinue}
          onModalVisible={reset}
          onRetry={reset}
        />)
      }

      {
        showCompletionModal && (
          <UnitCompletionModal
            isVisible={showCompletionModal}
            sessionKey={performanceSessionKey}
            onContinue={onContinueHandler}
            onModalVisible={modalCloseHandler}
          />
        )
      }
    </>
  );
}

export default ReadingLessons;

const styles = StyleSheet.create({
  flex: {flex:1},
  container: {
    marginTop: 30,
    marginBottom: 0,
    position: 'relative',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    gap: 20
  },
  questionSection: {flex:1},
  questionWrapper: {marginBottom:10},
  question: {fontSize: 16, fontWeight:"700"},
  text: {
    fontSize: 14,
    flexWrap: 'wrap'
  },
  textContainer: {
    width: "80%"
  }
});