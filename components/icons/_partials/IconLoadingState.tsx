import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import SIZES from '@/constants/size';

const IconLoadingState = () => {
    const {colors} = useTheme();
    return (
        <View style={[styles.iconLoading, {backgroundColor: colors.speakerIconBg}]}>
            <ActivityIndicator size={32} color={colors.primary} />
        </View>
    );
}

export default IconLoadingState

const styles = StyleSheet.create({
    iconLoading: {
        width: SIZES.speakerDimensions.width,
        height: SIZES.speakerDimensions.height,
        borderRadius: SIZES.speakerDimensions.width/2,
        justifyContent: "center",
        alignItems: "center"
    }
})