import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { QuizProps } from '@/types';
import STYLES from '@/constants/styles';
import TitleHeading from './TitleHeading';

const QuizOptionCard = ( {
    option,
    answer,
    selectedOption,
    isSelectionHappened,
    onSelect,
    isCorrect=false,
    marginRight=0,
    containerWidth,
    customStyle
  }: QuizProps ) => {
  const {colors} = useTheme();

  let backgroundColor = colors.cardBackgroundColor;
  let borderColor = colors.cardBorderColor;

  if ((selectedOption === option) && isSelectionHappened) {
    backgroundColor = '#9EFD8B3D';
    borderColor = '#3CE811';
  }

  const selectionhandler = () => onSelect(option);

  React.useEffect(() => {
    if (isCorrect) {
      backgroundColor = '#9EFD8B3D';
      borderColor = '#3CE811';
    } else {
      backgroundColor = '#FE01013B';
      borderColor = '#E51919';
    }
  }, [isCorrect]);

  return (
    <TouchableOpacity onPress={selectionhandler}>
      <View style={
        [
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor,
            borderColor,
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
    margin:0
  }
});