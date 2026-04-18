import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { QuizProps } from '@/types';
import STYLES from '@/constants/styles';
import TitleHeading from './TitleHeading';
import { useFeedback } from '@/utils/feedback';

const OptionCard = ( {
  option,
  answer,
  selectedOption,
  isSelectionHappened,
  onSelect,
  isCorrect=false,
  containerWidth,
  customStyle
}: QuizProps ) => {
  const {colors} = useTheme();
  const {triggerFeedback} = useFeedback();

  let backgroundColor = colors.cardBackgroundColor;
  let borderColor = colors.cardBorderColor;

  if ((selectedOption === option) && isSelectionHappened) {
    backgroundColor = "#1B7CF53D"; // '#9EFD8B3D';
    borderColor = "#1B7CF5"; // '#3CE811';
  }

  const selectionHandler = useCallback(() => {
    triggerFeedback("tap");
    onSelect(option);
  }, [onSelect, option, triggerFeedback]);

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
    <TouchableOpacity onPress={selectionHandler}>
      <View style={
        [
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor,
            borderColor,
            width: containerWidth,
            height: containerWidth,
          },
          (customStyle && customStyle)
        ]}
      >
        <TitleHeading title={option}/>
      </View>
    </TouchableOpacity>
  );
}
export default OptionCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    margin:0,
    paddingHorizontal: 15
  }
});