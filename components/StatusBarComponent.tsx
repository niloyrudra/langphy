import { StatusBar } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const StatusBarComponent = () => {
    const {colors, theme} = useTheme();
    
  return (
    <>
        {/* {
          (theme === 'light')
          ? (<StatusBar animated={true} barStyle="light-content" />)
          : (<StatusBar animated={true} barStyle="dark-content" />)
        } */}
        {/* {
          theme === 'light' ?
          (<StatusBar animated={true} barStyle="light-content" backgroundColor={colors.background} />)
          : (<StatusBar animated={true} barStyle="dark-content" backgroundColor={colors.background} />)
        } */}
    </>
  )
}

export default StatusBarComponent;