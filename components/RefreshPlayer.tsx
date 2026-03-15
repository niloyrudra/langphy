import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const RefreshPlayer = ({onPress}: {onPress: () => void}) => {
    const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
        <LinearGradient
            colors={[ "#48E4EF", "#1B7CF5" ]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 1]}
        >
            <View style={[styles.buttonBg, {backgroundColor: colors.background}]} />
            <Ionicons name="reload" size={40} color={'#48E4EF'} />
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default RefreshPlayer

const styles = StyleSheet.create({
    button: {
        width: 62,
        height: 62,
        borderRadius: 31,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonBg: {
        width: 58,
        height: 58,
        position:"absolute",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 29,
        zIndex: 0
    },
})