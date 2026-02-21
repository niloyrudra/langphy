import { StyleProp, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import sizes from '@/constants/size'
import { SoundWaveLightIcon, SpeakerActionButtonIcon } from '@/utils/SVGImages'

interface ChallengeListeningProps {
    query?: string,
    style?: StyleProp<ViewStyle>,
    waveStyle?: StyleProp<ViewProps>,
    onTap: () => void
};

const ChallengeScreenSpeakerActionSection = ({query, style, waveStyle, onTap}: ChallengeListeningProps) => {
  return (
    <View
        style={[
            styles.container,
            (style && style)
        ]}
    >
        {/* Query Listen with Query Text Section */}
        <TouchableOpacity
            style={styles.queryButton}
            onPress={onTap}
        >
            <SpeakerActionButtonIcon width={sizes.speakerNRecorderDimensions} height={sizes.speakerNRecorderDimensions} />

            <SoundWaveLightIcon width={185} height={40} />

        </TouchableOpacity>
    </View>
  )
}

export default ChallengeScreenSpeakerActionSection;

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