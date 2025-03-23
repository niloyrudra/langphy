import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { SpeakerDarkIcon, SpeakerIcon } from '@/utils/SVGImages'
import { useTheme } from '@/theme/ThemeContext'

type ChallengeQueryProps = {
    query: string,
    style?: StyleProp<ViewStyle>,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<ViewProps>,
    onTap: () => void
}

const ChallengeScreenQuerySection = ({query, style, buttonStyle, textStyle, onTap}: ChallengeQueryProps) => {
    const {colors, theme} = useTheme();
  return (
    <View
        style={[
            styles.container,
            (style && style)
        ]}
    >
        {/* Query Listen with Query Text Section */}
        <TouchableOpacity
            style={[styles.queryButton, (buttonStyle && buttonStyle)]}
            onPress={onTap}
        >

            { (theme === 'dark') ? <SpeakerDarkIcon /> : <SpeakerIcon />}

            <View style={{flex:1}}>
                <Text style={[ styles.query, {color: colors.text}, (textStyle && textStyle)]}>
                    {query}
                </Text>
            </View>


        </TouchableOpacity>
    </View>
  )
}

export default ChallengeScreenQuerySection

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 20
    },
    queryButton: {
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems:"center",
        gap: 16,
        marginBottom: 15
    }, 
    query: {
        fontSize: 24,
        lineHeight: 24,
        fontWeight: "700"
    }
})