import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SubmitButtonProps } from '@/types';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size';

import { ButtonGradientPng } from '@/utils/pngImages';
import { useTheme } from '@/theme/ThemeContext';

const ActionPrimaryButton = ( {
        buttonTitle="Submit",
        onSubmit,
        buttonStyle,
        buttonTextStyle,
        disabled=false
    }: SubmitButtonProps ) => {
        const {colors} = useTheme();
    return (
        <TouchableOpacity
            style={[ STYLES.childContentCentered, {position: "relative"}, (disabled && [styles.content, {backgroundColor: colors.disabledButtonBackgroundColor}]) ]}
            onPress={onSubmit}
            disabled={disabled}
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
            <Text style={[{position:"absolute", fontSize: 16, color: (disabled ? colors.disabledButtonColor : "#ffffff"), fontWeight: "800"}, (buttonTextStyle && buttonTextStyle)]}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
}
export default ActionPrimaryButton;

const styles = StyleSheet.create({
    content: {
        // backgroundColor: "#EDEDED",
        borderRadius: 100,
        height: sizes.buttonHeight
    }
})