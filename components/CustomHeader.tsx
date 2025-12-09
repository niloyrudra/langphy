import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import STYLES from '@/constants/styles';

import HeaderLogo from './header/HeaderLogo'
import HeaderRightComponent from './header/HeaderRightComponent'

const CustomArchiveHeader = () => {
  const {colors} = useTheme()
  return (
    <View style={[STYLES.headerContainer, {backgroundColor: colors.background} ]}>
      <HeaderLogo />
      <HeaderRightComponent/>
    </View>
  )
}

export default CustomArchiveHeader;