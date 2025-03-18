import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import SteakBadge from './SteakBadge';
import FlagSquareComponent from './FlagSquareComponent';

const SteakBadgeFlagComponent = () => {
    const { colors, theme } = useTheme();
  return (
    <View
        style={[ styles.container, (theme === "dark" && {backgroundColor: colors.cardBackgroundColor})
        ]}
    >
        <SteakBadge />
        <FlagSquareComponent />
    </View>
  )
}

export default SteakBadgeFlagComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 7,
        borderWidth: 1,
        borderColor: "#68F0F8",
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 12,
        height: 36,
    }
})