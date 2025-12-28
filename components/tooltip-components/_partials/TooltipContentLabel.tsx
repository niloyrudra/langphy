import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const TooltipContentLabel = ({label}: {label: string}) => {
    const {colors} = useTheme();
    return (<Text style={[styles.mainText, {color: colors.textDark}]}>{label}:</Text>)
}

export default TooltipContentLabel

const styles = StyleSheet.create({
    mainText: {
        fontSize: 12, // 20
        fontWeight: "700",
    }
})