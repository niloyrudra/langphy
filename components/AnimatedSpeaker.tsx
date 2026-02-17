import { StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { useTheme } from '@/theme/ThemeContext';

const AnimatedSpeaker = ({speakerRef, lang, speed}: {speakerRef: React.RefObject<LottieView | null>, lang?: string | "de-DE" | "en-US", speed?: number}) => {
    const {colors} = useTheme();
    return (
        <LottieView
            ref={speakerRef}
            source={require(`../assets/lotties/speaker.json`)}
            speed={speed ?? 0.88}
            autoPlay={false}
            resizeMode='contain'
            loop={false}
            style={styles.speaker}
            colorFilters={[
                {
                    keypath: "volume-high",
                    color: lang && lang === "en-US" ? colors.p_en_speaker : colors.p_de_speaker, // #3FA1FF <-> #19468F
                },
                {
                    keypath: "Vector",
                    color: lang && lang === "en-US" ? colors.p_en_speaker : colors.p_de_speaker, // #1B7CF5 <-> #1B7CF5
                },
                {
                    keypath: "1 Bg",
                    color: colors.primary_950_50 // #FFFFFF <-> #142C57
                },
            ]}
            />
    );
}

export default AnimatedSpeaker

const styles = StyleSheet.create({
    speaker: {
        width: 40,
        height: 40
    }
})