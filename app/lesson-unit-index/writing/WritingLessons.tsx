import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import TextInputComponent from '@/components/form-components/TextInputComponent';

const WritingLessons = () => {
  const { colors, theme } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}
      >
        {/* Content */}
        <View style={{flex: 1}}>

          <View style={{flex: 1}}>
            {/* Title Section */}
            <ChallengeScreenTitle title="Write in German" />

            {/* Writing Section Starts */}
            <View
              style={{
                flex:1,
                marginBottom: 80
              }}
            >

              <ChallengeScreenQuerySection query="Hello! My name is Anna." onTap={() => console.log("Tapping Query Button")} />

              <View style={{flex:1}}/>

              {/* Writing Text Field/Input/Area Section */}
              <TextInputComponent
                multiline={true}
                numberOfLines={4}
                maxLength={600}
                placeholder='Write here...'
                value=''
                onChange={(text) => console.log(text)}
                placeholderTextColor={colors.placeholderColor}
              />

            </View>
            {/* Writing Section Ens */}
          
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

export default WritingLessons;

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