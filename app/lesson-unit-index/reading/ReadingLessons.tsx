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
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);
  const [selected, stSelected] = React.useState(false)
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
              <QuizOptionCardList cardWidth={cardWidth} height={cardWidth/2} />
              {/* <QuizAnswerOptionGrid /> */}
            </View>

          </View>

          <HorizontalLine />


          {/* Action Buttons */}
          <ActionPrimaryButton
            buttonTitle='Check'
            onSubmit={() => console.log("Submitted")}
            disabled={!selected}
          />

        </View>

    </SafeAreaLayout>
  );
}

export default ReadingLessons;