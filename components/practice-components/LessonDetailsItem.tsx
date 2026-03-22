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
            <LangphyText style={styles.subText}>{label}:</LangphyText>
            {
                (typeof content !== 'string')
                    ? (<LangphyText style={[styles.subText, STYLES.wordWrapStyle, { color: colors.textSubColor }]}>{content}</LangphyText>)
                    : (<LangphyText style={[styles.germanLevel, STYLES.wordWrapStyle, { color: colors.textSubColor }]}>{content}</LangphyText>)
            }
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
    subText: {
        fontSize: 13,
        fontWeight: "400",
        color: "#24DEEC"
    },
    germanLevel: {
        fontSize: 16,
        fontWeight: 700
    }
});