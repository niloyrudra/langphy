import { StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import SpeakerComponent from '../SpeakerComponent'

type ChallengeQueryProps = {
    query: string,
    lang?: string,
    style?: StyleProp<ViewStyle>,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<ViewProps>,
}

const ChallengeScreenQuerySection: React.FC<ChallengeQueryProps> = ({query, lang="de-DE", style, buttonStyle, textStyle} ) => {
    const {colors} = useTheme();
    return (
        <View
            style={[
                styles.container,
                (style && style)
            ]}
        >
            {/* Query Listen with Query Text Section */}
            <SpeakerComponent
                speechContent={query}
                speechLang={lang}
            />
            
            <Text style={[styles.query, {color: colors.text}]}>{query}</Text>
            
        </View>
    )
}

export default ChallengeScreenQuerySection

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 20,
        position: 'relative',
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
        gap: 20
    },
    query: {
        fontSize: 24,
        fontWeight: "700"
    }
})