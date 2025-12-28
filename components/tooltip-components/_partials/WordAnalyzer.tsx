import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import TooltipContentLabel from './TooltipContentLabel';

const WordAnalyzer = ({topic, label}: {topic: string, label: string}) => {
    const {colors} = useTheme();
    return (
        <View style={styles.details}>
            <TooltipContentLabel label={label} />
            <Text style={[styles.text, {color: colors.primary}]}>{topic}</Text>
        </View>
    )
}

export default WordAnalyzer

const styles = StyleSheet.create({
    details: {
        flexDirection: "row",
        gap: 4
    },
    text: {
        fontSize: 12,
        fontWeight: "500",
    }
})