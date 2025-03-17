import { StyleSheet, View, StatusBar, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';
import SpeakerComponent from '@/components/action-components/SpeakerComponent';
import LessonComponent from '@/components/lesson-components/LessonComponent';
import SpeakerAltComponent from '@/components/action-components/SpeakerAltComponent';
import HorizontalLine from '@/components/HorizontalLine';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

const Lessons = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}
      >
        <View>
          {/* Source Language Section */}
          <LessonComponent
            language="English"
            iconComponent={<SpeakerComponent/>}
          >
            <Text style={[styles.text, {color: colors.textDark}]}>Hello!</Text>
          </LessonComponent>

          <HorizontalLine />
          
          {/* Acting Language Section */}
          <LessonComponent
            language="German"
            iconComponent={<SpeakerAltComponent />}
            style={{borderColor:"#1B7CF5"}}
            buttonStyle={{backgroundColor:"#D9EFFF"}}
          >
            <Text style={[styles.mainText, {color: colors.textDark}]}>Moin Moin!</Text>
            <Text style={[styles.subText, {color: colors.textSubColor}]}>(Very friendly way to say hello in North Germany)</Text>
          </LessonComponent>
        </View>

        {/* Dictionary Floating Button */}
        <FloatingDictionaryIcon />

      </SafeAreaView>

    </SafeAreaProvider>
  );
}

export default Lessons

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: sizes.bodyPaddingVertical + 10
  },
  text: {
    fontSize: 16,
    // color: "#000000",
    fontWeight: "500",
  },
  mainText: {
    fontSize: 16,
    // color: "#000000",
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
    // color: "#999999"
  }
})