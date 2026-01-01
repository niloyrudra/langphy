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
            { iconComponent && iconComponent }
            {/* <Text style={{color:colors.text}}>
                {label ? <>{label}{" "}<Text style={[styles.detail, {color:colors.text}]}>{detail}</Text></> : detail}
            </Text> */}
            <View
                style={{flexDirection: "row", alignItems: "center", gap: 5}}
            >
                {
                    label && (
                        <Text style={[ {color:colors.text}]}>{label}</Text>
                    )
                }
                <Text style={[styles.detail, {color:colors.text}]}>{detail}</Text>
            </View>
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
        fontSize: 16,
        wordWrap: 'break-word',
        flexShrink: 1,
    }
})