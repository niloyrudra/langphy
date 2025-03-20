import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { SubmitButtonProps } from '@/types';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size';

import { ButtonGradientPng } from '@/utils/pngImages';

const ActionPrimaryButton = ( {
        buttonTitle="Submit",
        onSubmit,
        buttonStyle,
        buttonTextStyle,
        disabled=false
    }: SubmitButtonProps ) => {
    return (
        <TouchableOpacity
            style={[ STYLES.childContentCentered, {position: "relative"} ]}
            onPress={onSubmit}
            disabled={disabled}
        >
            <Image
                source={ButtonGradientPng}
                style={{
                    width: "100%",
                    height: sizes.buttonHeight,
                    objectFit: "fill"
                }}
            />
            <Text style={[{position:"absolute", fontSize: 16, color: "#fff", fontWeight: "800"}, (buttonTextStyle && buttonTextStyle)]}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
}
export default ActionPrimaryButton;