import { StyleProp, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import * as STYLES from '@/constants/styles'
import sizes from '@/constants/size'
import { useTheme } from '@/theme/ThemeContext'

const HorizontalSeparator = ({style}: {style?: StyleProp<ViewProps>}) => {
    const {colors} = useTheme();
    return (
        <View style={[STYLES.childContentCentered, {position:"relative", marginVertical: 30}, (style && style)]}>
            <View style={{width: "100%", height: 1, backgroundColor: colors.orSeparatorColor}} />
            <View style={{backgroundColor: colors.background, position: "absolute", padding: 6}}>
                <Text style={{color: colors.orSeparatorColor, fontSize: 14}}>or</Text>
            </View>
        </View>
    );
}

export default HorizontalSeparator

const styles = StyleSheet.create({})