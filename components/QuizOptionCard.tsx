import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { QuizProps } from '@/types';

import STYLES from '@/constants/styles';
import TitleHeading from './TitleHeading';


const QuizOptionCard = ( { title, isCorrect, isSelectionHappened, onSelect, marginRight=0, containerWidth=172, customStyle }: QuizProps ) => {
  const {colors} = useTheme();

  // Action Handlers
  const handlePress = () => {
    onSelect(title, isCorrect);
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
    >
      <View style={
        [
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor: isSelectionHappened ? ( isCorrect ? '#9EFD8B3D' : '#FE01013B') : colors.cardBackgroundColor,
            borderColor: isSelectionHappened ? ( isCorrect ? '#3CE811' : '#E51919') : colors.cardBorderColor,
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