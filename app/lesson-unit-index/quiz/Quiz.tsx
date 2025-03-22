import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { ComponentProps } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';

import HorizontalLine from '@/components/HorizontalLine';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { SpeakerIcon, SpeakerDarkIcon, PreviousBtnLight, PreviousBtnDark, NextBtnLight, NextBtnDark } from '@/utils/SVGImages';


// import QuizAnswerOptionGrid from '@/components/quiz-components/QuizAnswerOptionGrid';
import QuizOptionCardList from '@/components/list-loops/QuizOptionCardList';
import { getCardContainerWidth } from '@/utils';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';

const Quiz = ({}) => {
  const { colors, theme } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}
      >
        {/* Content */}
        <View style={{flex: 1}}>

          <View style={{flex: 1}}>
            {/* Title Section */}
            <ChallengeScreenTitle title="Choose The Correct Answer." />

            {/* QUIZ Section Starts */}
            <View>

              <ChallengeScreenQuerySection query="Hello!" onTap={() => console.log("Tapping Query Button")} />

              {/* QUIZ Answer Options */}
              <QuizOptionCardList cardWidth={cardWidth} />
              {/* <QuizAnswerOptionGrid /> */}

            </View>
            {/* QUIZ Section Ens */}
          
          </View>

          {/* Action Buttons */}

          <ActionPrimaryButton
            buttonTitle='Check'
            onSubmit={() => console.log("Submitted")}
            disabled={true}
          />

        </View>
          
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: sizes.bodyPaddingVertical + 10
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
  }
})