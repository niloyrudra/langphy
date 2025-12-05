import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import TextInputComponent from '@/components/form-components/TextInputComponent';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import KeyboardAvoidingViewLayout from '@/components/layouts/KeyboardAvoidingViewLayout';
import ChallengeScreenSpeakerActionSection from '@/components/challenges/ChallengeScreenSpeakerActionSection';
import SessionLayout from '@/components/layouts/SessionLayout';
import { speechHandler } from '@/utils';

type ListeningLessonItem = {
  _id: string,
  categoryId: string,
  unitId: string,
  phrase: string,
  meaning: string,
  german_level?: string,
};

const ListeningLessons = () => {
  const { colors } = useTheme();
  const [ textContent, setTextContent ] = React.useState<string>('')
  return (
    <SessionLayout<ListeningLessonItem> sessionType="writing">
      {({ item, wordRefs, containerRef, setTooltip }) => {
        const handleTooltip = (value: any) => {
          setTooltip(value);
        };
        return (
          <View style={{flex: 1}}>
          {/* Content */}

            <View style={{flex: 1}}>
              {/* Title Section */}
              <ChallengeScreenTitle title="Listen And Write." />

              {/* Writing Section Starts */}
              <ChallengeScreenSpeakerActionSection onTap={() => speechHandler( item.phrase, "de-DE", () => true ) } />

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
        );
      }}
    </SessionLayout>
  );
}

export default ListeningLessons;