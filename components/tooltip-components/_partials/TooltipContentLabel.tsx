import { StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '@/components/text-components/LangphyText';

const TooltipContentLabel = ({label}: {label: string}) => {
    const {colors} = useTheme();
    return (<LangphyText weight="bold" style={[styles.mainText, {color: colors.textDark}]}>{label}:</LangphyText>)
}

export default TooltipContentLabel

const styles = StyleSheet.create({
    mainText: {
        fontSize: 12, // 20
        fontWeight: "700",
    }
})