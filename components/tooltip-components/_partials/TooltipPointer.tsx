import { ColorValue, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

const TooltipPointer = ({color}: {color: ColorValue | string}) => {
    const {colors} = useTheme();
    return (
        <View
            style={[
                styles.pointer,
                { borderBottomColor: color ?? colors.textDark }
            ]}
        />
    )
}

export default TooltipPointer;

const styles = StyleSheet.create({
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
        top: -14,
        alignSelf: "center"
        // left: '40%'
    }
})