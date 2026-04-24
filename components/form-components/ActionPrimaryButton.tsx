import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SubmitButtonProps } from '@/types';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size';

import { useTheme } from '@/theme/ThemeContext';
import LangphyText from '../text-components/LangphyText';
import { LinearGradient } from 'expo-linear-gradient';

const ActionPrimaryButton = ( {
    buttonTitle="Submit",
    onSubmit,
    buttonStyle,
    buttonTextStyle,
    disabled=false,
    isLoading
}: SubmitButtonProps ) => {
    const {colors} = useTheme();
    return (
        <TouchableOpacity
            style={[
                STYLES.childContentCentered,
                (disabled && [styles.content, {backgroundColor: colors.disabledButtonBackgroundColor}]),
                (buttonStyle && buttonStyle)
            ]}
            onPress={onSubmit}
            disabled={disabled || isLoading}
        >
            <LinearGradient
                colors={!disabled ? [ "#48E4EF", "#1B7CF5" ] : ['transparent', 'transparent']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 1]}
            >

                <LangphyText
                    weight="semibold"
                    style={[
                        styles.text,
                        { color: (disabled ? colors.disabledButtonColor : "#ffffff")},
                        (buttonTextStyle && buttonTextStyle)
                    ]}
                >
                    {isLoading ? "Processing..." : buttonTitle}
                </LangphyText>
            </LinearGradient>
        </TouchableOpacity>
    );
}
export default ActionPrimaryButton;

const styles = StyleSheet.create({
    content: {
        // backgroundColor: "#EDEDED",
        borderRadius: 100,
        height: sizes.buttonHeight
    },
    button: {
        width: "100%",
        height: sizes.buttonHeight,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
        // objectFit: "fill"
    },
    text: {
        // position:"absolute",
        fontSize: 16,
    }
})