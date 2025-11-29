import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const LoadingScreenComponent = () => {
    const { colors } = useTheme();
    return (
        <View style={{flex:1, height: "100%", justifyContent:"center", alignItems:"center", backgroundColor: colors.background}}>
            <ActivityIndicator size={36} color={colors.primary} />
        </View>
    )
}

export default LoadingScreenComponent

const styles = StyleSheet.create({})