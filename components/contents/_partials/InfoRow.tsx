import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText';
import { useTheme } from '@/theme/ThemeContext';

const InfoRow = ({
    label,
    value,
    onPress,
}: {
    label: string;
    value: string;
    onPress?: () => void;
}) => {
    const {colors} = useTheme();
    return (
        <View style={styles.row}>
            <LangphyText weight="medium" style={[styles.label, {color: colors.text}]}>{label}</LangphyText>

            {onPress ? (
                <TouchableOpacity onPress={onPress}>
                    <LangphyText weight="semibold" style={[styles.link, {color: colors.primary}]}>{value}</LangphyText>
                </TouchableOpacity>
            ) : (
                <LangphyText style={[styles.value, {color: colors.primary}]}>{value}</LangphyText>
            )}
        </View>
    );
};

export default InfoRow

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    label: {
        width: 110,
        fontWeight: "500",
        // color: "#333",
    },
    value: {
        // color: "#333",
    },
    link: {
        // color: "#1e3a8a", // dark blue
        fontWeight: "600",
        textDecorationLine: "underline",
    },
});