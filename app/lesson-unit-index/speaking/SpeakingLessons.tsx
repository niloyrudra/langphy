import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import ChallengeScreenTitle from '@/components/challenges/ChallengeScreenTitle';
import ChallengeScreenQuerySection from '@/components/challenges/ChallengeScreenQuerySection';
import { RecorderDarkInactiveIcon, RecorderLightActiveIcon } from '@/utils/SVGImages';
import STYLES from '@/constants/styles';

const SpeakingLessons = () => {
  const { colors, theme } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}
      >
        {/* Content */}
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{flex: 1}}>
            {/* Title Section */}
            <ChallengeScreenTitle title="Speak This Sentence" />

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
              <View
                style={STYLES.childContentCentered}
              >

                {
                  theme === 'light'
                  ? (<RecorderLightActiveIcon width={60} height={60} />)
                  : (<RecorderDarkInactiveIcon width={60} height={60} />)
                }

              </View>
              
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

export default SpeakingLessons;

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