import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { QuizProps } from '@/types';

import STYLES from '@/constants/styles';
import TitleHeading from './TitleHeading';


const QuizOptionCard = ( {
    option,
    // ref,
    answer,
    selectedOption,
    isSelectionHappened,
    onSelect,
    marginRight=0,
    containerWidth=172,
    customStyle
  }: QuizProps ) => {
  const {colors} = useTheme();

  // // Action Handlers
  // const handlePress = () => {
  //   if (typeof ref === 'function') {
  //     ref(option);
  //   } else if (ref && typeof ref === 'object' && 'current' in ref) {
  //     ref.current = option;
  //   }
  //   onSelect(option);



  //   if (typeof ref === 'function') {
  //       console.log(ref(option), option);
  //   } else if (ref && typeof ref === 'object' && 'current' in ref) {
  //       console.log(ref.current, option);
  //   }
  // }
  const isSelected = selectedOption === option;
  const isCorrect = option === answer;

  let backgroundColor = colors.cardBackgroundColor;
  let borderColor = colors.cardBorderColor;

  if (isSelectionHappened) {
    if (isSelected && isCorrect) {
      backgroundColor = '#9EFD8B3D';
      borderColor = '#3CE811';
    } else if (isSelected && !isCorrect) {
      backgroundColor = '#FE01013B';
      borderColor = '#E51919';
    }
  }

  return (
    <TouchableOpacity
      onPress={() => onSelect(option)}
    >
      <View style={
        [
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor,
            borderColor,
            // backgroundColor: isSelectionHappened ? ( isCorrect ? '#9EFD8B3D' : '#FE01013B') : colors.cardBackgroundColor,
            // borderColor: isSelectionHappened ? ( isCorrect ? '#3CE811' : '#E51919') : colors.cardBorderColor,
            width: containerWidth,
            height: containerWidth,
            marginRight: marginRight
          },
          (customStyle && customStyle)
        ]}
      >
        <TitleHeading title={option}/>
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