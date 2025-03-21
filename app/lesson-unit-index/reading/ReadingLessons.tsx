import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';
import LessonComponent from '@/components/lesson-components/LessonComponent';
import HorizontalLine from '@/components/HorizontalLine';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { SpeakerIcon, SpeakerAltIcon, SpeakerAltDarkIcon, SpeakerDarkIcon, PreviousBtnLight, PreviousBtnDark, NextBtnLight, NextBtnDark } from '@/utils/SVGImages';

const ReadingLessons = () => {
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
          {/* Source Language Section */}
          <LessonComponent
            language="English"
            iconComponent={theme === 'dark' ? <SpeakerDarkIcon /> : <SpeakerIcon/>}
            style={{borderColor:"#08C1D2"}}
            buttonStyle={{backgroundColor: colors.lessonSourceCardSpeakerBackgroundColor}}
          >
            <Text style={[styles.text, {color: colors.textDark}]}>Hello!</Text>
          </LessonComponent>

          <HorizontalLine style={{marginTop: 30, marginBottom: 50}} />
          
          {/* Acting Language Section */}
          <LessonComponent
            language="German"
            iconComponent={theme === 'dark' ? <SpeakerAltDarkIcon /> : <SpeakerAltIcon />}
            style={{borderColor:"#1B7CF5"}}
            buttonStyle={{backgroundColor: colors.lessonActionCardSpeakerBackgroundColor}}
          >
            <Text style={[styles.mainText, {color: colors.textDark}]}>Moin Moin!</Text>
            <Text style={[styles.subText, {color: colors.textSubColor}]}>(Very friendly way to say hello in North Germany)</Text>
          </LessonComponent>

          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <TouchableOpacity>
              {
                theme === 'light'
                ? (<PreviousBtnLight width={167} height={sizes.buttonHeight} />)
                : (<PreviousBtnDark width={167} height={sizes.buttonHeight} />)
              }
            </TouchableOpacity>

            <TouchableOpacity>
              {
                theme === 'light'
                ? (<NextBtnLight width={167} height={sizes.buttonHeight} />)
                : (<NextBtnDark width={167} height={sizes.buttonHeight} />)
              }
            </TouchableOpacity>

          </View>

        </View>
          
        {/* Dictionary Floating Button */}
        <FloatingDictionaryIcon />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default ReadingLessons;

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