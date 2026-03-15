import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';
import LangphyText from './text-components/LangphyText';

const OnBoardingStudyDurationCard = ({label, duration}: {label: string, duration: string}) => {
    const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: colors.textFieldBackgroundColor, borderColor: colors.textFieldBorderColor}]}
      onPress={() => console.log("....")}
    >
      <LangphyText style={{fontSize: 14, color: colors.text}}>{label}</LangphyText>
    </TouchableOpacity>
  )
}

export default OnBoardingStudyDurationCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 16,
    padding: 16,
    height: sizes.buttonHeight,
    borderWidth: 1,
    position: "relative"
  }
})