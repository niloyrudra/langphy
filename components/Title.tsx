import { StyleProp, StyleSheet, ViewStyle, Text, View, TextStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from './text-components/LangphyText';

const Title = ({title, containerStyle, contentStyle}: {title: string, containerStyle?: StyleProp<ViewStyle>, contentStyle?: StyleProp<TextStyle>}) => {
    const {colors} = useTheme();
  return (
    <View style={[styles.container, (containerStyle && containerStyle)]}>
      <LangphyText weight="semibold" style={[styles.title, {color: colors.text}, (contentStyle && contentStyle)]}>{title}</LangphyText>
    </View>
  )
}

export default Title;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22
  }
});