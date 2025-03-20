import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';

const CategoryArchiveHeaderTitle = ({title}: {title: string}) => {
  const { colors } = useTheme();
  return (
    <View style={STYLES.contentCentered}>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
    </View>
  )
}

export default CategoryArchiveHeaderTitle;

const styles = StyleSheet.create({
  title: {
    fontWeight: "800",
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-Bold'
  }
})