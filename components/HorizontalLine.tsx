import { useTheme } from '@/theme/ThemeContext';
import React from 'react';
import { View } from 'react-native';

export default function HorizontalLine() {
  const { colors } = useTheme();
  return (<View style={{ marginTop:30,marginBottom:50,borderBottomWidth:1,borderBottomColor: colors.hLineColor }} />);
}
