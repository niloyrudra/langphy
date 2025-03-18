import { StyleProp, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

import * as STYLES from '@/constants/styles'

interface TitleProps {
    title: string,
    wrapperStyle?: StyleProp<ViewProps>
    titleStyle?: StyleProp<ViewProps>
}

const FormHeaderTitle = ({title, wrapperStyle, titleStyle}: TitleProps) => {
    const {colors} = useTheme();
  return (
    <View style={[STYLES.childContentCentered, styles.headerWrapper, (wrapperStyle && wrapperStyle)]}>
        <Text style={[styles.header, {color: colors.text}, (titleStyle && titleStyle)]}>{title}</Text>
    </View>
  )
}

export default FormHeaderTitle

const styles = StyleSheet.create({
  headerWrapper: {
    marginVertical: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "800" // 600
  },
})