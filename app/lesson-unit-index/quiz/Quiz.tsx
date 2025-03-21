import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { ComponentProps } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FloatingDictionaryIcon from '@/components/action-components/FloatingDictionaryIcon';

import HorizontalLine from '@/components/HorizontalLine';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { SpeakerIcon, SpeakerDarkIcon, PreviousBtnLight, PreviousBtnDark, NextBtnLight, NextBtnDark } from '@/utils/SVGImages';


// import QuizAnswerOptionGrid from '@/components/quiz-components/QuizAnswerOptionGrid';
import QuizOptionCardList from '@/components/list-loops/QuizOptionCardList';
import { getCardContainerWidth } from '@/utils';

const Quiz = ({}) => {
  const { colors, theme } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);
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
            <View
              style={{
                marginBottom: 30
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24,
                  lineHeight: 24,
                  fontWeight: "700"
                }}
              >Choose The Correct Answer.</Text>
            </View>

            {/* QUIZ Section Starts */}
            <View>

              {/* Query Listen with Query Text Section */}
              <TouchableOpacity
                style={{
                  flexDirection:"row",
                  justifyContent: "flex-start",
                  alignItems:"center",
                  gap: 16,
                  marginBottom: 15
                }}
              >
                {theme === 'dark' ? <SpeakerDarkIcon /> : <SpeakerIcon />}
                {/* {theme === 'dark' ? <SpeakerAltDarkIcon /> : <SpeakerAltIcon />} */}
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 24,
                    lineHeight: 24,
                    fontWeight: "700"
                  }}
                >Hello!</Text>
              </TouchableOpacity>

              {/* QUIZ Answer Options */}
              {/* <QuizAnswerOptionGrid /> */}
              <QuizOptionCardList cardWidth={cardWidth} />

            </View>
            {/* QUIZ Section Ens */}
          
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
          

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Quiz;

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