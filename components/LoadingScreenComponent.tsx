import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LottieView from 'lottie-react-native';

const LoadingScreenComponent = () => {
    const { colors } = useTheme();
    return (
        <View style={{flex:1, height: "100%", justifyContent:"center", alignItems:"center", backgroundColor: colors.background}}>
            {/* <ActivityIndicator size={36} color={colors.primary} /> */}
            <LottieView
                source={`@/assets/lotties/loading-langphy.json`}
                autoPlay
                loop={false}
                speed={1}
                resizeMode='contain'
            />
        </View>
    )
}

export default LoadingScreenComponent

const styles = StyleSheet.create({})