import React from 'react';
import { Alert, View } from 'react-native'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import QuizOptionCardList from '@/components/list-loops/QuizOptionCardList';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';

const Quiz = () => {
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
            <QuizOptionCardList onSelect={handleSelect} isSelectionHappened={isSelectionHappened} />
            {/* <QuizAnswerOptionGrid /> */}

          </View>
          {/* QUIZ Section Ens */}
        
        </View>

        {/* Action Buttons */}

        <ActionPrimaryButton
          buttonTitle='Check'
          onSubmit={() => console.log("Submitted")}
          disabled={ !selectedOption ? true : false}
        />

      </View>
          
    </SafeAreaLayout>
  );
}

export default Quiz;