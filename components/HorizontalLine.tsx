import { useTheme } from '@/theme/ThemeContext';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export default function HorizontalLine({style}: {style?: StyleProp<ViewStyle>}) {
  const { colors } = useTheme();
  return (<View style={[ styles.line, { borderBottomColor: colors.hLineColor }, (style && style)]} />);
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 30
  }
});