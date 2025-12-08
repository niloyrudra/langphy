import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import { getCardContainerWidth } from '@/utils';
import SIZES from '@/constants/size';
import { ReadingSessionItem } from '@/types';
// Components
import HorizontalLine from '@/components/HorizontalLine';
import QuizOptions from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
                
const ReadingLessons = () => {
  const { colors } = useTheme();
  const cardWidth = getCardContainerWidth();
  
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isSelectionHappened, setIsSelectionHappened] = React.useState<boolean>(false)
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false)
  
  const handleSelect = (option: string) => {
    setSelectedOption( prevValue => prevValue = option);
    setIsSelectionHappened( prevValue => prevValue = true);
    
    // if (option) {
      // Alert.alert('Correct!', `You selected the correct answer: ${title}`);
      // Proceed to next question or show modal
      // console.log(selectedOption)
    // } else {
      // Alert.alert('Incorrect', `The answer ${title} is incorrect. Try again.`);
      // Provide feedback or allow retry
      // console.log(selectedOption)
    // }
  };

  return (
    <SessionLayout<ReadingSessionItem> sessionType="reading">
      {({ item, wordRefs, containerRef, setTooltip, goToNext }) => {
        const handleTooltip = (value: any) => {
          setTooltip(value);
        };
        const onCheckHandler = () => {
          if(  selectedOption === item?.answer ) {
            setIsCorrect( prevVal => prevVal = true )
            Alert.alert(
              "Congratulations!",
              "Correct Answer",
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    setSelectedOption(null);
                    setIsSelectionHappened(false);
                  },
                  style: 'cancel',
                },
                {
                  text: 'Next',
                  onPress: () => goToNext?.()
                },
              ]
            )
          } else {
            setIsCorrect( prevVal => prevVal = false )
            Alert.alert(
              "Unfortunately!",
              "Wrong Answer",
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    setSelectedOption(null);
                    setIsSelectionHappened(false);
                  },
                  style: 'cancel',
                },
                {
                  text: 'Try Again!',
                  onPress: () => {
                    setSelectedOption(null);
                    setIsSelectionHappened(false);
                  }
                },
              ]
            )
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
                  <ToolTipPerWordComponent
                    onHandler={handleTooltip}
                    item={{...item}}
                    containerRef={containerRef}
                    wordRefs={wordRefs}
                    textContainerStyle={{
                      width: SIZES.screenWidth - 90
                    }}
                    textStyle={{
                      fontSize: 14,
                      flexWrap: 'wrap'
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
        )
      }}
    </SessionLayout>              
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
})