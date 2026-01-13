import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SubmitButtonProps } from '@/types';
import STYLES from '@/constants/styles';
import SIZES from '@/constants/size';

import { useTheme } from '@/theme/ThemeContext';

const ActionButton = ( {
    buttonTitle="Submit",
    onSubmit,
    buttonStyle,
    textStyle,
    disabled=false,
    isLoading
}: SubmitButtonProps ) => {
    const {colors} = useTheme();
    return (
        <TouchableOpacity
            style={[
                STYLES.childContentCentered,
                styles.content,
                (disabled && [
                    {
                        backgroundColor: colors.disabledButtonBackgroundColor,
                        borderColor: colors.disabledButtonBackgroundColor
                    }
                ]),
                (buttonStyle && buttonStyle)
            ]}
            onPress={onSubmit}
            disabled={disabled || isLoading}
        >
            <Text
                style={[
                    styles.button,
                    {
                        color: (disabled ? colors.disabledButtonColor : colors.text),
                    },
                    (textStyle && textStyle)
                ]}
            >
                {isLoading ? "Processing..." : buttonTitle}
            </Text>
        </TouchableOpacity>
    );
}

export default ActionButton;

const styles = StyleSheet.create({
    content: {
        borderRadius: 100,
        borderWidth: 1,
        height: SIZES.buttonHeight
    },
    button: {
        fontSize: 16,
        fontWeight: "800"
    }
})