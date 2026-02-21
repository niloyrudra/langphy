import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@/theme/ThemeContext';
import LangphyText from '../text-components/LangphyText';

const SettingsElement = ({title, Icon}: {title: string, Icon: ReactNode}) => {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <View style={[styles.icon,{backgroundColor: colors.profileCardImgBgClr}]}>
                {Icon}
            </View>

            <LangphyText weight="semibold" style={[styles.title, { color: colors.text }]}>
                {title}
            </LangphyText>
        </View>
    );
}

export default SettingsElement

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600"
    }
});