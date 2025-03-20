import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

import STYLES from '@/constants/styles';

import HeaderTopLeftArrowButton from './header/HeaderTopLeftArrowButton'
import SettingsButton from './SettingsButton'

const CustomLessonHeader = () => {
  const { colors } = useTheme();
  return (
    <View style={[STYLES.headerContainer, {backgroundColor: colors.background} ]}>
      <HeaderTopLeftArrowButton/>
      <SettingsButton/>
    </View>
  )
}

export default CustomLessonHeader;