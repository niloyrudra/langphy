import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Confidence } from '@/types'
import ProgressBar from '@/components/ProgressBar'
import { useTheme } from '@/theme/ThemeContext'

const WordConfidenceComponent = ({text, confidence}: {text: string, confidence: Confidence}) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.word,{ color: confidence.color }]}>
                {text}
            </Text>
            <Text style={[styles.feedback,{ color: confidence.color }]}>
                ({confidence.label})
            </Text>
            <ProgressBar completion={parseFloat(confidence.score)} />
        </View>
    )
}

export default WordConfidenceComponent

const styles = StyleSheet.create({
    container: {
        gap: 2,
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 6,
        borderRadius: 8
    },
    word: {
        fontSize: 16,
        fontWeight: "800"
    },
    feedback: {
        fontSize: 10,
        fontWeight: "600"
    }
})