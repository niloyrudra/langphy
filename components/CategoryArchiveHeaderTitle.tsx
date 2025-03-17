import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

const CategoryArchiveHeaderTitle = ({title}: {title: string}) => {
  const { colors } = useTheme();
  return (
<View style={styles.titleWrapper}><Text style={[styles.title, {color: colors.text}]}>{title}</Text></View>
  )
}

export default CategoryArchiveHeaderTitle;

const styles = StyleSheet.create({
  titleWrapper: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  title: {
    fontWeight: "800",
    fontSize: 24
  }
})