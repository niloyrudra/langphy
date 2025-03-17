import { StyleSheet, View } from 'react-native'
import React from 'react'
import HeaderTopLeftArrowButton from './header/HeaderTopLeftArrowButton'
import HeaderLogo from './header/HeaderLogo'
import SettingsButton from './SettingsButton'
import CategoryArchiveHeaderTitle from './CategoryArchiveHeaderTitle'
import { useTheme } from '@/theme/ThemeContext'
import sizes from '@/constants/size'

const CustomArchiveHeader = ({title}: {title: string}) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <HeaderTopLeftArrowButton/>
      { title ? (<CategoryArchiveHeaderTitle title={title} />) : (<HeaderLogo/>)}
      <SettingsButton/>
    </View>
  )
}

export default CustomArchiveHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: 10,
    height: sizes.headerHeight,
  }
})