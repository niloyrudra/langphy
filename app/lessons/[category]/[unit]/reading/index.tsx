import React from 'react';
import { useWindowDimensions, View, Text } from 'react-native'
import SIZES from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import { getCardContainerWidth } from '@/utils';
import HorizontalLine from '@/components/HorizontalLine';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import QuizOptionCardList from '@/components/list-loops/QuizOptionCardList';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';


const ReadingLessons = () => {
  const { colors } = useTheme();
  const cardWidth = getCardContainerWidth();
  
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isSelectedOption, setIsSelectedOption] = React.useState<boolean>(false);
  
  const handleSelect = (title: string, isCorrect: boolean) => {
    setSelectedOption( prevValue => prevValue = title);
    setIsSelectedOption( prevValue => prevValue = true);
    
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
    <SafeAreaLayout>

        {/* Content */}
        <View style={{flex: 1}}>

          <View style={{flex: 1}}>
            {/* Title Section */}
            <ChallengeScreenTitle title="Read The Comprehension." />

            {/* Writing Section Starts */}
            <ChallengeScreenQuerySection
              style={{
                marginBottom: 0
              }}
              buttonStyle={{
                width: SIZES.screenWidth - (SIZES.bodyPaddingHorizontal*2),
                justifyContent:"flex-start",
                alignItems:"flex-start",
              }}
              textStyle={{
                fontSize: 12
              }}
              query="Zu meiner Familie gehören vier Personen. Die Mutter bin ich und dann gehört natürlich mein Mann dazu. Wir haben zwei Kinder, einen Sohn, der sechs Jahre alt ist und eine dreijährige Tochter.
              
              Wir wohnen in einem kleinen Haus mit einem Garten. Dort können die Kinder ein bisschen spielen. Unser Sohn kommt bald in die Schule, unsere Tochter geht noch eine Zeit lang in den Kindergarten. Meine Kinder sind am Nachmittag zu Hause. So arbeite ich nur halbtags.
              "
              
              onTap={() => console.log("Tapping Query Button")}
            />

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
              <QuizOptionCardList height={cardWidth / 2} onSelect={handleSelect} isSelectedOption={isSelectedOption} />
              {/* <QuizAnswerOptionGrid /> */}

            </View>

          </View>

          {/* Action Buttons */}
          <ActionPrimaryButton
            buttonTitle='Check'
            onSubmit={() => console.log("Submitted")}
            disabled={!selectedOption ? true : false }
          />

        </View>

    </SafeAreaLayout>
  );
}

export default ReadingLessons;