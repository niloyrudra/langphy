import { StyleSheet, View } from 'react-native'
import React from 'react'
import HeaderTopLeftArrowButton from './header/HeaderTopLeftArrowButton'
import SettingsButton from './SettingsButton'
import { useTheme } from '@/theme/ThemeContext'
import sizes from '@/constants/size'

const CustomLessonHeader = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: colors.background} ]}
    >
      <HeaderTopLeftArrowButton/>
      <SettingsButton/>
    </View>
  )
}

export default CustomLessonHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: 10,
    height: sizes.headerHeight,
  }
})