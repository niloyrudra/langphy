import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import sizes from '@/constants/size';
import { getCardContainerWidth } from '@/utils';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import QuizOptionCardList from '@/components/list-loops/QuizOptionCardList';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';

const Quiz = ({}) => {
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);
  return (
    <SafeAreaLayout>
      
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
          
    </SafeAreaLayout>
  );
}

export default Quiz;