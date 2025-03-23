import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import KeyboardAvoidingViewLayout from '@/components/layouts/KeyboardAvoidingViewLayout';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';

const WritingLessons = () => {
  const { colors } = useTheme();
  const [ textContent, setTextContent ] = React.useState('')
  return (
    <SafeAreaLayout>
      <KeyboardAvoidingViewLayout>

        {/* Content */}
        <View style={{flex: 1}}>

          <View style={{flex: 1}}>
            {/* Title Section */}
            <ChallengeScreenTitle title="Listen And Write." />

            {/* Writing Section Starts */}
            <ChallengeScreenQuerySection query="Hello! My name is Anna." onTap={() => console.log("Tapping Query Button")} />

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
            onSubmit={() => console.log("Submitted")}
            disabled={textContent.length === 0}
          />

        </View>

      </KeyboardAvoidingViewLayout>
    </SafeAreaLayout>
  );
}

export default WritingLessons;