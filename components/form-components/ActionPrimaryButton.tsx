import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SubmitButtonProps } from '@/types';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size';

import { ButtonGradientPng } from '@/utils/pngImages';
import { useTheme } from '@/theme/ThemeContext';
import LangphyText from '../text-components/LangphyText';

const ActionPrimaryButton = ( {
    buttonTitle="Submit",
    onSubmit,
    buttonStyle,
    buttonTextStyle,
    disabled=false,
    isLoading
}: SubmitButtonProps ) => {
    const {colors} = useTheme();

    // if(  )

    return (
        <TouchableOpacity
            style={[
                STYLES.childContentCentered,
                {position: "relative"},
                (disabled && [styles.content, {backgroundColor: colors.disabledButtonBackgroundColor}]),
                (buttonStyle && buttonStyle)
            ]}
            onPress={onSubmit}
            disabled={disabled || isLoading}
        >
            {
                !disabled && (
                    <Image
                        source={ButtonGradientPng}
                        style={{
                            width: "100%",
                            height: sizes.buttonHeight,
                            objectFit: "fill"
                        }}
                    />
                )
            }
            <LangphyText
                weight="extrabold"
                style={[
                    styles.text,
                    { color: (disabled ? colors.disabledButtonColor : "#ffffff")},
                    (buttonTextStyle && buttonTextStyle)
                ]}
            >
                {isLoading ? "Processing..." : buttonTitle}
            </LangphyText>
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
    text: {
        position:"absolute",
        fontSize: 16,
    }
})