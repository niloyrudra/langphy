import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SubmitSecondaryButtonProps } from '@/types';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size';
import { useTheme } from '@/theme/ThemeContext';
import LangphyText from '../text-components/LangphyText';
import { LinearGradient } from 'expo-linear-gradient';

const SecondaryActionButton = ( {
    buttonTitle="Submit",
    onSubmit,
    buttonStyle,
    buttonTextStyle,
    background,
    disabled=false,
    isLoading
}: SubmitSecondaryButtonProps ) => {
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
                <View style={[styles.buttonBg, {backgroundColor: background ?? colors.background}]} />
                <LangphyText
                    weight="semibold"
                    style={[
                        styles.text,
                        { color: (disabled ? colors.disabledButtonColor : colors.secondaryText )},
                        (buttonTextStyle && buttonTextStyle)
                    ]}
                >
                    {isLoading ? "Processing..." : buttonTitle}
                </LangphyText>
            </LinearGradient>
        </TouchableOpacity>
    );
}
export default SecondaryActionButton;

const styles = StyleSheet.create({
    content: {
        borderRadius: 100,
        height: sizes.buttonHeight
    },
    button: {
        width: "100%",
        height: sizes.buttonHeight,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    buttonBg: {
        width: "98%",
        position:"absolute",
        height: sizes.buttonHeight - 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        zIndex: 0
    },
    text: {
        fontSize: 16,
    }
})