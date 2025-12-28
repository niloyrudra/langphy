import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

const TranslatedWord = ({word, color}: {word: string, color: ColorValue | string}) => {
    const {colors} = useTheme();
  return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.hLineColor
            }}
        >
            <Text
                style={[
                    styles.translation,
                    {
                        textTransform: "capitalize",
                        color: color ?? colors.textDark
                    }
                ]}
            >
                {word.trim()}
            </Text>
        </View>
    );
}

export default TranslatedWord

const styles = StyleSheet.create({
    translation: {
        fontSize: 12,
        fontWeight: "400"
    }
})