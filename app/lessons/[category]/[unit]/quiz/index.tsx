import React from 'react';
import { Alert, View } from 'react-native'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import QuizOptionCardList from '@/components/list-loops/QuizOptions';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { useLocalSearchParams } from 'expo-router';
import { getCardContainerWidth } from '@/utils';
import { QuizSessionItem } from '@/types';

const QuizSession = () => {
  const cardWidth = getCardContainerWidth();
  const {categoryId, slug, unitId} = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isSelectionHappened, setIsSelectionHappened] = React.useState<boolean>(false)
    
  const handleSelect = (option: string) => {
    setSelectedOption( prevValue => prevValue = option);
    setIsSelectionHappened( prevValue => prevValue = true);

    if (option) {
      // Alert.alert('Correct!', `You selected the correct answer: ${title}`);
      // Proceed to next question or show modal
      // console.log(selectedOption)
    } else {
      // Alert.alert('Incorrect', `The answer ${title} is incorrect. Try again.`);
      // Provide feedback or allow retry
      // console.log(selectedOption)
    }
  };

  return (
    <SessionLayout<QuizSessionItem> sessionType={typeof slug == 'string' ? slug : ""} categoryId={ typeof categoryId == 'string' ? categoryId : "" } unitId={ typeof unitId == 'string' ? unitId : "" }>
      {({ item, goToNext }) => {
        const onCheckHandler = () => {
          if(  selectedOption === item?.answer ) {
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
                  text: 'OK',
                  onPress: () => goToNext?.()
                },
              ]
            )
          } else {
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
              <ChallengeScreenTitle title="Choose The Correct Answer." />

              {/* QUIZ Section Starts */}
              <View>
                <ChallengeScreenQuerySection query={item?.question} lang="en-US" />

                {/* QUIZ Answer Options */}
                <QuizOptionCardList
                  height={cardWidth / 2} 
                  options={Array.isArray(item?.options) && item.options.length > 0 ? item.options : ["", "", "", ""]}
                  answer={item?.answer || ""}
                  selectedOption={selectedOption || ""}
                  onSelect={handleSelect}
                  isSelectionHappened={isSelectionHappened} />
                {/* <QuizAnswerOptionGrid /> */}
              </View>
              {/* QUIZ Section Ens */}
            </View>

            {/* Action Buttons */}
            <ActionPrimaryButton
              buttonTitle='Check'
              onSubmit={onCheckHandler}
              disabled={ !selectedOption ? true : false}
            />
          </View>
        );
      }}
    </SessionLayout>
  );
}

export default QuizSession;