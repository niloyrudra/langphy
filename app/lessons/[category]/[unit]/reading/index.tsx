import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import { getCardContainerWidth } from '@/utils';
// Components
import HorizontalLine from '@/components/HorizontalLine';
import QuizOptionCardList from '@/components/list-loops/QuizOptionCardList';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import SessionLayout from '@/components/layouts/SessionLayout';
import SpeakerComponent from '@/components/SpeakerComponent';
import ToolTipPerWordComponent from '@/components/ToolTipPerWordComponent';

const query=`Zu meiner Familie gehören vier Personen. Die Mutter bin ich und dann gehört natürlich mein Mann dazu. Wir haben zwei Kinder, einen Sohn, der sechs Jahre alt ist und eine dreijährige Tochter.`
                
const query2=`Wir wohnen in einem kleinen Haus mit einem Garten. Dort können die Kinder ein bisschen spielen. Unser Sohn kommt bald in die Schule, unsere Tochter geht noch eine Zeit lang in den Kindergarten. Meine Kinder sind am Nachmittag zu Hause. So arbeite ich nur halbtags.`;

const ReadingLessons = () => {
  const { colors } = useTheme();
  const cardWidth = getCardContainerWidth();
  
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isSelectionHappened, setIsSelectionHappened] = React.useState<boolean>(false)
  
  const handleSelect = (title: string, isCorrect: boolean) => {
    setSelectedOption( prevValue => prevValue = title);
    setIsSelectionHappened( prevValue => prevValue = true);
    
    if (isCorrect) {
      // Alert.alert('Correct!', `You selected the correct answer: ${title}`);
      // Proceed to next question or show modal
      console.log(selectedOption)
    } else {
      // Alert.alert('Incorrect', `The answer ${title} is incorrect. Try again.`);
      // Provide feedback or allow retry
      console.log(selectedOption)
    }
  };

  return (
    <SessionLayout>

      {({ item, wordRefs, containerRef, setTooltip }) => {

        const handleTooltip = (value: any) => {
          setTooltip(value);
        };

        // item.phrase = query + ' ' + query2;

        return (
          <View style={{flex: 1}}>

            <View style={{flex: 1}}>
              {/* Title Section */}
              <ChallengeScreenTitle title="Read The Comprehension." />

                <View
                  style={[
                    styles.container
                  ]}
                >
                  {/* Query Listen with Query Text Section */}
                  <SpeakerComponent
                      speechContent={item?.phrase}
                      speechLang='de-DE'
                  />
                          
                  {/* Tappable Words with ToolTip */}
                  <ToolTipPerWordComponent
                    onHandler={handleTooltip}
                    item={item}
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

              <View
                style={{
                  flex: 1
                }}
              >
                <View style={{marginBottom:10}}>
                  <Text style={{fontSize: 16, color: colors.text, fontWeight:"700"}}>How would you reckon someone?</Text>
                </View>

                {/* QUIZ Answer Options */}
                <QuizOptionCardList height={cardWidth / 2} onSelect={handleSelect} isSelectionHappened={isSelectionHappened} />
                {/* <QuizAnswerOptionGrid /> */}

              </View>

            </View>

            {/* Action Buttons */}
            {/* <ActionPrimaryButton
              buttonTitle='Check'
              onSubmit={() => console.log("Submitted")}
              disabled={!selectedOption ? true : false }
            /> */}

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