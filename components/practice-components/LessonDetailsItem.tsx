import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import STYLES from '@/constants/styles';
import LangphyText from '../text-components/LangphyText';
import { GermanLevel } from '@/types';

const LessonDetailsItem = ( {label, content}: {label: string, content: string | GermanLevel} ) => {
    if( !content ) return null;

    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <LangphyText>
                <LangphyText style={styles.label}>{label}:{" "}</LangphyText>
                {
                    (typeof content !== 'string')
                        ? (<LangphyText style={[styles.germanLevel, STYLES.wordWrapStyle, { color: colors.text }]}>{content}</LangphyText>)
                        : (<LangphyText style={[styles.content, STYLES.wordWrapStyle, { color: colors.text }]}>{content}</LangphyText>)
                }
            </LangphyText>
        </View>
    )
}

export default LessonDetailsItem;

const styles = StyleSheet.create({
    container: {
        gap: 6,
        flexDirection:"row",
        marginBottom: 5
    },
    label: {
        fontSize: 12,
        fontWeight: "400",
        color: "#24DEEC"
    },
    content: {
        fontSize: 12,
        fontWeight: "400",
        color: "#24DEEC"
    },
    germanLevel: {
        fontSize: 16,
        fontWeight: 700
    }
});