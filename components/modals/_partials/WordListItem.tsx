import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from '@/components/text-components/LangphyText'

const WordListItem = ({word, pos}: {word: string, pos: string}) => {
    if(pos === "PUNCT") return null;
    const {colors} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <LangphyText weight="extrabold" style={[styles.word,{ color: colors.primary }]}>
                {word}
            </LangphyText>
            <LangphyText weight="bold" style={[styles.feedback,{ color: colors.primary_900 }]}>
                {pos}
            </LangphyText>
        </View>
    )
}

export default WordListItem;

const styles = StyleSheet.create({
    container: {
        gap: 1,
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 6,
        borderRadius: 8
    },
    word: {
        fontSize: 16,
    },
    feedback: {
        fontSize: 12,
    }
})