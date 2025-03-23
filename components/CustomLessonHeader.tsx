import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

import STYLES from '@/constants/styles';

import HeaderTopLeftArrowButton from './header/HeaderTopLeftArrowButton'
import SettingsButton from './SettingsButton'
import HeaderLessonProgressBar from './header/HeaderLessonProgressBar';

const CustomLessonHeader = ( {completion=0, goal}: {completion: number, goal: number} ) => {
  const { colors } = useTheme();
  return (
    <View style={[
        STYLES.headerContainer,
        {
          backgroundColor: colors.background,
          gap: 16,
          alignItems:"center"
        }
      ]}
    >
      <HeaderTopLeftArrowButton/>

      <HeaderLessonProgressBar completion={completion} goal={goal} />

      <SettingsButton/>
    </View>
  )
}

export default CustomLessonHeader;