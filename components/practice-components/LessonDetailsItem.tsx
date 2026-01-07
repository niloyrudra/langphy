import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import STYLES from '@/constants/styles';

const LessonDetailsItem = ( {label, content}: {label: string, content: string} ) => {
    const {colors} = useTheme();
    return (
        <View style={{gap: 6, flexDirection:"row", marginBottom: 5}}>
            <Text style={[styles.subText, STYLES.wordWrapStyle, { color: "#24DEEC" }]}>{label}:</Text>
            <Text style={[styles.subText, STYLES.wordWrapStyle, { color: colors.textSubColor }]}>{content}</Text>
        </View>
    )
}

export default LessonDetailsItem;

const styles = StyleSheet.create({
    subText: {
        fontSize: 13,
        fontWeight: "400"
    }
});