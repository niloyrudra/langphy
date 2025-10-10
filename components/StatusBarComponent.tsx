import { StatusBar } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const StatusBarComponent = () => {
  const {colors, theme} = useTheme();
  
  if( theme === 'light' ) return (<StatusBar animated={true} barStyle="dark-content" backgroundColor={colors.background} />)

  return (<StatusBar animated={true} barStyle="light-content" backgroundColor={colors.background} />)

}

export default StatusBarComponent;