import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LottieView from 'lottie-react-native';

const LoadingScreenComponent = () => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <LottieView
                source={require('../assets/lotties/loading-langphy.json')}
                autoPlay
                loop={false}
                speed={1}
                resizeMode='contain'
                style={styles.lottie}
            />
        </View>
    )
}

export default LoadingScreenComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
    lottie: {
        width: 200,
        height: 119
    }
})