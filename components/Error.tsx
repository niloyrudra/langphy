import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import LangphyText from './text-components/LangphyText';

const Error = ({text}: {text: string}) => {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <LangphyText style={{color: colors.redDanger}}>{text}</LangphyText>
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