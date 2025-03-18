import { StyleSheet, Text, TouchableOpacity, StyleProp, ViewProps } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

import * as STYLES from '@/constants/styles'

interface SubmitButtonProps {
    buttonTitle?: string,
    onSubmit: () => void,
    buttonStyle?: StyleProp<ViewProps>,
    buttonTextStyle?: StyleProp<ViewProps>,
    disabled?: boolean
}

const FormSubmitButton = ( {
        buttonTitle="Submit",
        onSubmit,
        buttonStyle,
        buttonTextStyle,
        disabled=false
    }: SubmitButtonProps ) => {
    const {colors} = useTheme();
  return (
    <TouchableOpacity
        style={[STYLES.childContentCentered, styles.button, {backgroundColor: colors.primary, borderColor: colors.primary}, (buttonStyle && buttonStyle)]}

        onPress={onSubmit}
        disabled={disabled}
    >
        <Text style={[{fontSize: 16, color: colors.text, fontWeight: "800"}, (buttonTextStyle && buttonTextStyle)]}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

export default FormSubmitButton

const styles = StyleSheet.create({
    button: {
        height: 56,
        padding: 16,
        borderRadius: 32,
        borderWidth: 1,
        // borderColor: "#F7F7F7",
    }
})