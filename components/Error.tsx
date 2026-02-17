import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

const Error = ({text}: {text: string}) => {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <Text style={{color: colors.redDanger}}>{text}</Text>
        </View>
    );
}

export default Error;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center"
    }
})