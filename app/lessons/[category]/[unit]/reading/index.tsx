import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import { getCardContainerWidth } from '@/utils';
// import SIZES from '@/constants/size';
import { SelectiveResultType, ReadingSessionType } from '@/types';
// Components
import HorizontalLine from '@/components/HorizontalLine';
import QuizOptions from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
// import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import NLPAnalyzedPhase from '@/components/nlp-components/NLPAnalyzedPhase';
import UnitCompletionModal from '@/components/modals/UnitCompletionModal';
import { router, useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '@/components/LoadingScreenComponent';
import SessionResultModal from '@/components/modals/SessionResultModal';

const ReadingLessons = () => {
  const { colors } = useTheme();
  const cardWidth = getCardContainerWidth();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const goToNextRef = React.useRef<(() => void) | null>(null);

  const [showCompletionModal, setShowCompletionModal] = React.useState<boolean>(false);
  const [ data, setData ] = React.useState<ReadingSessionType[]>([]);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isSelectionHappened, setIsSelectionHappened] = React.useState<boolean>(false)
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false)
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [ error, setError ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)
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
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/reading/${categoryId}/${unitId}`);
        if (!res.ok) {
          console.error("Error fetching reading data:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const data: T[] = await res.json();
        const data: (ReadingSessionType)[] = await res.json();
        setData(data)

      } catch (err) {
        console.error("Error fetching reading data:", err);
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
      <SessionLayout<ReadingSessionType>
        preFetchedData={data}
        sessionType="reading"
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
              setResult({
                answered: selectedOption || "",
                feedback: { label: "Correct", color: "green" }
              });
              // Alert.alert(
              //   "Congratulations!",
              //   "Correct Answer",
              //   [
              //     {
              //       text: 'Cancel',
              //       onPress: () => {
              //         setSelectedOption(null);
              //         setIsSelectionHappened(false);
              //       },
              //       style: 'cancel',
              //     },
              //     {
              //       text: 'Next',
              //       onPress: () => goToNext?.()
              //     },
              //   ]
              // )
            } else {
              setIsCorrect( prevVal => prevVal = false );
              setResult({
                answered: selectedOption || "",
                feedback: { label: "Incorrect", color: "red" }
              });
              // Alert.alert(
              //   "Unfortunately!",
              //   "Wrong Answer",
              //   [
              //     {
              //       text: 'Cancel',
              //       onPress: () => {
              //         setSelectedOption(null);
              //         setIsSelectionHappened(false);
              //       },
              //       style: 'cancel',
              //     },
              //     {
              //       text: 'Try Again!',
              //       onPress: () => {
              //         setSelectedOption(null);
              //         setIsSelectionHappened(false);
              //       }
              //     },
              //   ]
              // )
            }
          };
          
          return (
            <View style={{flex: 1}}>

              <View style={{flex: 1}}>
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
                      textStyle={{
                        fontSize: 14,
                        flexWrap: 'wrap'
                      }}
                      textContainerStyle={{
                        width: "80%"
                      }}
                    />
                  </View>

                <HorizontalLine />

                <View style={{ flex: 1 }}>
                  <View style={{marginBottom:10}}>
                    <Text style={{fontSize: 16, color: colors.text, fontWeight:"700"}}>{item?.question_en}</Text>
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
              total: data.length,
              correct: data.length,
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
    container: {
      marginTop: 30,
      marginBottom: 0,
      position: 'relative',
      flexDirection: "row",
      justifyContent: 'flex-start',
      alignItems: "flex-start",
      gap: 20
    }
});