import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LangphyText from '@/components/text-components/LangphyText';
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';

const InfoRow = ({
    label,
    value,
    onPress,
    centered,
}: {
    label: string;
    value: string;
    onPress?: () => void;
    centered?: boolean;
}) => {
    const {colors} = useTheme();
    return (
        <View style={styles.row}>
            <LangphyText
                weight="medium"
                style={[styles.label, {color: colors.text}, (centered && styles.centered)]}
            >
                {label}
            </LangphyText>

            {onPress ? (
                <TouchableOpacity onPress={onPress}>
                    <LangphyText weight="semibold" style={[styles.link, {color: colors.primary}]}>{value}</LangphyText>
                </TouchableOpacity>
            ) : (
                <LangphyText style={[{color: colors.primary}]}>{value}</LangphyText>
            )}
        </View>
    );
};

export default InfoRow

const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        marginBottom: 10,
    },
    label: {
        width: 110,
        fontWeight: "500",
    },
    link: {
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    centered : {textAlign: "right", marginRight: 10, width: (SIZES.screenWidth/2)-SIZES.bodyPaddingHorizontal*2-10}
});