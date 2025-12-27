import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const LessonDetailsItem = ( {label, content}: {label: string, content: string} ) => {
    const {colors} = useTheme();
    return (
        <View style={{gap: 6, flexDirection:"row", flexWrap: "wrap", marginBottom: 5}}>
            <Text style={[styles.subText, { color: "#24DEEC" }]}>{label}:</Text>
            <Text style={[styles.subText, { color: colors.textSubColor }]}>
                {content}
            </Text>
        </View>
    )
}

export default LessonDetailsItem;

const styles = StyleSheet.create({
    subText: {
        fontSize: 13,
        fontWeight: "400",
        // flexWrap: "wrap"
    }
});