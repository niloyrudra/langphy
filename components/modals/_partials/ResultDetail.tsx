import { type ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

interface ResultDetailProps {
    // iconSize?: number;
    // iconColor?: ColorValue;
    // iconName: string;
    label?: string;
    detail: string;
    iconComponent?: React.ReactNode;
}

const ResultDetail = ({label, detail, iconComponent}: ResultDetailProps) => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container]}>
            {/* <FontAwesome name={iconName} size={iconSize ?? 20} color={iconColor ?? colors.text} /> */}
            { iconComponent && iconComponent }
            <Text style={{color:colors.text}}>
                {label ? <>{label}{" "}<Text style={[styles.detail, {color:colors.text}]}>{detail}</Text></> : detail}
            </Text>
        </View>
    )
}

export default ResultDetail

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20
    },
    detail: {
        fontWeight: "800",
        fontSize: 16
    }
})