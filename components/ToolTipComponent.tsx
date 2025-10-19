import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';

const ToolTipComponent = ({top, left, translation}: {top: number, left: number, translation: string}) => {
    const { colors, theme } = useTheme();
  return (
    <View style={[styles.toolTip, {top: top, left: left}]}>
        <View style={{ position: "relative" }}>

            <Text style={[styles.mainText, { textTransform: "capitalize", color: colors.textDark /*tooltip.color*/ }]}>
                {translation}
            </Text>
            
            <View style={styles.pointer} />

        </View>
    </View>
  )
}

export default ToolTipComponent

const styles = StyleSheet.create({
    toolTip: {
        position: "absolute",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "#1B7CF5", // colors.cardBackground,
        maxWidth: 250,
        zIndex: 9999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
    },
    mainText: {
        fontSize: 20,
        fontWeight: "700",
    },
    subText: {
        fontSize: 12,
        fontWeight: "400",
    },
    levelText: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 10
    },
    pointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 10,
        // borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        // borderTopColor: 'transparent', // '#1B7CF5',
        borderBottomColor: '#1B7CF5',
        // marginTop: -1,

        position: "absolute",
        top: -14
    }
})