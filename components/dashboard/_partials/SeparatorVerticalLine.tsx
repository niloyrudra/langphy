import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

export default function SeparatorVerticalLine() {
    const {colors} = useTheme();
    return (<View style={{width: 1, height: 10, backgroundColor: colors.text}} />)
}