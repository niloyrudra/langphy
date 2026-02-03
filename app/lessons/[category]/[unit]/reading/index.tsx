import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import { getCardContainerWidth } from '@/utils';
import { SelectiveResultType, ReadingSessionType, ContentType, ProgressPayload } from '@/types';
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
import { useUpdateProgress } from '@/hooks/useUpdateProgess';

const ReadingLessons = () => {
  const { colors } = useTheme();
  const cardWidth = getCardContainerWidth();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const goToNextRef = React.useRef<(() => void) | null>(null);

  const { data: readingLessons, isLoading, isFetching } = useLessons( categoryId as string, unitId as string, slug as ContentType );
  const { mutate: updateProgress, isPending } = useUpdateProgress();

  const lessonData = React.useMemo<ReadingSessionType[]>(() => {
    if( !readingLessons ) return [];
    return readingLessons.map( lesson => JSON.parse( lesson.payload ) );
  }, [readingLessons]);

  const [ showCompletionModal, setShowCompletionModal ] = React.useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = React.useState<string | null>(null);
  const [ isSelectionHappened, setIsSelectionHappened ] = React.useState<boolean>(false)
  const [ isCorrect, setIsCorrect ] = React.useState<boolean>(false)
  const [ activeIndex, setActiveIndex ] = React.useState<number>(0);
  const [ error, setError ] = React.useState<string>('')
  const [ result, setResult ] = React.useState<SelectiveResultType | null>(null)
  
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

  if( isLoading || isFetching ) return (<LoadingScreenComponent />)

  return (
    <>
      <SessionLayout<ReadingSessionType>
        preFetchedData={lessonData}
        onPositionChange={setActiveIndex}
        onSessionComplete={() => setShowCompletionModal(true)}
        onActiveItemChange={({item, goToNext}) => {
          reset();
          // You can use goToNextRef.current() to navigate to the next item from outside
          goToNextRef.current = goToNext;
        }}
      >
        {({ item, wordRefs, containerRef, screenRef, setTooltip }) => {
          const handleTooltip = (value: any) => {
            setTooltip(value);
          };
          const onCheckHandler = () => {
            if(  selectedOption === item?.answer ) {
              setIsCorrect( prevVal => prevVal = true )

              const payload: ProgressPayload = {
                content_type: slug as ContentType,
                content_id: item.id,
                completed: true,
                score: 100,
                progress_percent: 100
              };

              updateProgress( payload );

              setResult({
                answered: selectedOption || "",
                feedback: { label: "Correct", color: "green" }
              });
            } else {
              setIsCorrect( prevVal => prevVal = false );
              setResult({
                answered: selectedOption || "",
                feedback: { label: "Incorrect", color: "red" }
              });
            }
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
          onContinue={() => {
            reset();
            goToNextRef?.current && goToNextRef.current?.();
          }}
          onModalVisible={reset}
          onRetry={reset}
        />)
      }

      {
        showCompletionModal && (
          <UnitCompletionModal
            isVisible={showCompletionModal}
            stats={{
              time:"00:00",
              total: lessonData.length,
              correct: lessonData.length,
              accuracy: 100
            }}
            onContinue={() => {
              reset();
              setShowCompletionModal(false);
              router.back();
              // navigation back to units page
            }}
            onModalVisible={() => setShowCompletionModal(false)}
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