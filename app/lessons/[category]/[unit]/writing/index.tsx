import React from 'react';
import { Alert, View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { WritingSessionItem } from '@/types';

const WritingSession = () => {
  const { colors } = useTheme();
  const [ textContent, setTextContent ] = React.useState('')

  return (
    <SessionLayout<WritingSessionItem> sessionType="writing" keyboardAvoid={true}>
      {({ item, goToNext }) => {
        
        const onCheckHandler = () => {
          if(  textContent?.toLocaleLowerCase() === item?.phrase?.toLocaleLowerCase() ) {
            Alert.alert(
              "Congratulations!",
              "Correct Answer",
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    setTextContent("");
                  },
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    setTextContent("");
                    goToNext?.();
                  }
                },
              ]
            )
          } else {
            Alert.alert(
              "Unfortunately!",
              `Wrong Answer! The correct answer is: ${item?.phrase}`,
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    setTextContent("");
                  },
                  style: 'cancel',
                },
                {
                  text: 'Try Again!',
                  onPress: () => {
                    setTextContent("");
                  }
                },
              ]
            )
          }
        };
        
        return (
          <View style={{flex: 1}}>
            {/* Content */}

            <View style={{flex: 1}}>
              {/* Title Section */}
              <ChallengeScreenTitle title="Listen And Write." />

              {/* Writing Section Starts */}
              {/* <ChallengeScreenQuerySection query={item.phrase} /> */}
              <ChallengeScreenQuerySection query={item.meaning} lang="en-US" />

              <View style={{flex:1}}/>

            </View>

            {/* Writing Text Field/Input/Area Section */}
            <TextInputComponent
              multiline={true}
              numberOfLines={3}
              maxLength={500}
              placeholder='Write here...'
              value={textContent}
              onChange={(text) => setTextContent(text)}
              placeholderTextColor={colors.placeholderColor}
              inputMode="text"
              contentContainerStyle={{
                marginBottom: 40
              }}
            />

            {/* Action Buttons */}
            <ActionPrimaryButton
              buttonTitle='Check'
              onSubmit={onCheckHandler}
              disabled={textContent.length === 0}
            />

          </View>
        );
      }}
    </SessionLayout>
  );
}

export default WritingSession;