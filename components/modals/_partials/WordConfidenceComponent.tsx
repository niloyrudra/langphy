import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Confidence } from '@/types'
import ProgressBar from '@/components/ProgressBar'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '@/components/text-components/LangphyText'

const WordConfidenceComponent = ({text, confidence}: {text: string, confidence: Confidence}) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <LangphyText weight="extrabold" style={[styles.word,{ color: confidence.color }]}>
                {text}
            </LangphyText>
            <LangphyText weight="semibold" style={[styles.feedback,{ color: confidence.color }]}>
                ({confidence.label})
            </LangphyText>
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
    },
    feedback: {
        fontSize: 10,
    }
})