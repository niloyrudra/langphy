import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

import STYLES from '@/constants/styles';

import HeaderTopLeftArrowButton from './header/HeaderTopLeftArrowButton'
import HeaderLogo from './header/HeaderLogo'
import SettingsButton from './SettingsButton'
import CategoryArchiveHeaderTitle from './CategoryArchiveHeaderTitle'

const CustomLessonUnitIndexHeader = ({title}: {title: string}) => {
  const { colors } = useTheme();
  return (
    <View style={[STYLES.headerContainer, {backgroundColor: colors.background} ]}>
      <HeaderTopLeftArrowButton/>
      { title ? (<CategoryArchiveHeaderTitle title={title} />) : (<HeaderLogo/>)}
      <SettingsButton/>
    </View>
  )
}

export default CustomLessonUnitIndexHeader;