import { StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '../text-components/LangphyText';

const ChallengeScreenTitle = ({title}: {title: string}) => {
  const {colors} = useTheme();
  return (
    <LangphyText weight="bold" style={[styles.text, {color: colors.text}]}>
      {title}
    </LangphyText>
  );
}

export default ChallengeScreenTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700"
  }
});