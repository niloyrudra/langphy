import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { Token } from '@/types';

interface TooltipProps<T extends Token> {
    top: number;
    left: number;
    token: T;
    translation: string;
    color: ColorValue | null;
}

const ToolTipComponent = ({top, left, translation, color}: {top: number, left: number, translation: string, color: ColorValue | null}) => {
    const { colors, theme } = useTheme();
    // console.log("ToolTip Container Visibled...");
  return (
    <View
        pointerEvents='none'
        style={[
            styles.toolTip,
            {top: top, left: left},
            {
                backgroundColor: colors.background,
                borderWidth: 1,
                borderColor: color ?? colors.textDark
            }
        ]}
    >
        <View style={{ position: "relative" }}>

            <Text
                style={[
                    styles.mainText,
                    {
                        textTransform: "capitalize",
                        // color: colors.textDark
                        color: color ?? colors.textDark
                    }
                ]}
            >
                {translation}
            </Text>
            
            <View
                style={[
                    styles.pointer,
                    {
                        // borderTopColor: color ?? colors.textDark,
                        // borderLeftColor: color ?? colors.textDark,
                        // borderRightColor: color ?? colors.textDark,
                        borderBottomColor: color ?? colors.textDark
                    }
                ]}
            />

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
        // backgroundColor: "#1B7CF5", // colors.cardBackground,
        maxWidth: 250,
        zIndex: 10000, // 9999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50 // 5,
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
        // transform: {
        //     ro
        // }
        // borderWidth: 12,
        // borderTopWidth: 6,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 6,
        // borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        // borderBottomColor: '#1B7CF5',
        borderRadius: 4,
        position: "absolute",
        top: -12,
        left: -5
    }
})