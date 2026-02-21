import { ColorValue, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import LangphyText from '@/components/text-components/LangphyText';

const TranslatedWord = ({word, color}: {word: string, color: ColorValue | string}) => {
    const {colors} = useTheme();
  return (
        <View style={[styles.container, {borderBottomColor: colors.hLineColor}]}>
            <LangphyText
                style={[
                    styles.translation,
                    { color: color ?? colors.textDark }
                ]}
                >
                {word.trim()}
            </LangphyText>
        </View>
    );
}

export default TranslatedWord

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1
    },
    translation: {
        fontSize: 12,
        fontWeight: "400",
        textTransform: "capitalize",
    }
})