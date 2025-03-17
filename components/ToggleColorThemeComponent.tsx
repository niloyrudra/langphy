import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useTheme } from '@/theme/ThemeContext'

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ToggleColorThemeComponent = () => {
    const {colors, theme, toggleTheme} = useTheme()
  return (
    <TouchableOpacity
        onPress={() => {
            toggleTheme()
        }}
    >
        {
            theme === 'light' ?
            (<MaterialIcons name="dark-mode" size={32} color={colors.themeIconColor} />) // (<Entypo name="moon" size={32} color={colors.themeIconColor} />)
            :
            (<MaterialIcons name="light-mode" size={32} color={colors.themeIconColor} />)
        }
        
    </TouchableOpacity>
  )
}

export default ToggleColorThemeComponent;

const styles = StyleSheet.create({})