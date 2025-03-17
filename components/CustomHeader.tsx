import { StyleSheet, View } from 'react-native'
import React from 'react'

import HeaderLogo from './header/HeaderLogo'
import HeaderRightComponent from './header/headerRightComponent'
import { useTheme } from '@/theme/ThemeContext'
import sizes from '@/constants/size'

const CustomArchiveHeader = () => {
  const {colors} = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <HeaderLogo />
      <HeaderRightComponent/>
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