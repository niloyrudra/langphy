import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { QuizProps } from '@/types';

import STYLES from '@/constants/styles';
import TitleHeading from './TitleHeading';


const QuizOptionCard = ( { title, isCorrect, marginRight=0, containerWidth=172, customStyle }: QuizProps ) => {
  const {colors} = useTheme()
  return (
    <TouchableOpacity
      onPress={() =>  console.log( {"title": title, "Correct": isCorrect } )}
    >
      <View style={
        [
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
        
        <TitleHeading title={title}/>

      </View>
    </TouchableOpacity>
  );
}
export default QuizOptionCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16, // 24
    margin:0,
    minWidth: 172,
    // minHeight: 172,
  }
});