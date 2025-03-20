import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

export default function HorizontalLine({style}: {style?: StyleProp<ViewStyle>}) {
  const { colors } = useTheme();
  return (<View style={[ styles.line, { borderBottomColor: colors.hLineColor }, (style && style)]} />);
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    marginVertical: 30,
  }
});