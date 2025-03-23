import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { QuizProps } from '@/types';

import STYLES from '@/constants/styles';


const QuizOptionCard = ( { title, isCorrect, marginRight=0, containerWidth=172, customStyle}: QuizProps ) => {
  const {colors} = useTheme()
  return (
    <TouchableOpacity
      onPress={() =>  console.log( {"title": title, "Correct": isCorrect } )}
    >
      <View style={[
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor: colors.cardBackgroundColor,
            borderColor: colors.cardBorderColor,
            width: containerWidth,
            height: containerWidth,
            marginRight: marginRight
          },
          (customStyle && customStyle)
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default QuizOptionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16, // 24
    margin:0,
    minWidth: 172,
    // minHeight: 172,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  }
});