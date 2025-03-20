import { StyleSheet, Text, Image, TouchableOpacity, StyleProp, ViewProps, useWindowDimensions, View } from 'react-native'
import React from 'react'
// import { SvgXml } from 'react-native-svg';
// import { useTheme } from '@/theme/ThemeContext';

import * as STYLES from '@/constants/styles'

// import ButtonGradient from '@/assets/images/button/button-gradient.svg';
import ButtonGradientPng from '@/assets/images/button/button-gradient.png';
import sizes from '@/constants/size';


// import sizes from '@/constants/size';

interface SubmitButtonProps {
    buttonTitle?: string,
    onSubmit: () => void,
    buttonStyle?: StyleProp<ViewProps>,
    buttonTextStyle?: StyleProp<ViewProps>,
    disabled?: boolean
}

const ActionPrimaryButton = ( {
        buttonTitle="Submit",
        onSubmit,
        buttonStyle,
        buttonTextStyle,
        disabled=false
    }: SubmitButtonProps ) => {
    // const {colors} = useTheme();

    // const { width } = useWindowDimensions();
    // const aspectRatio = 350/56;
    // const containerWidth = width - (sizes.bodyPaddingHorizontal*2);
    // const containerHeight = containerWidth/aspectRatio

    // const svgMarup = ButtonGradient

  return (
    <TouchableOpacity
        style={[
            STYLES.childContentCentered,
            styles.button,
            // {
            //     width: containerWidth,
            //     height: sizes.buttonHeight
            // }
            // {backgroundColor: colors.primary, borderColor: colors.primary},
            // (buttonStyle && buttonStyle)
        ]}

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

        {/* <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgMarkup} width="100%" height="100%" />
        </View> */}

        {/* <ButtonGradient width={containerWidth} height={containerHeight} /> */}

        <Text style={[{position:"absolute", fontSize: 16, color: "#fff", fontWeight: "800"}, (buttonTextStyle && buttonTextStyle)]}>{buttonTitle}</Text>

    </TouchableOpacity>
  )
}

export default ActionPrimaryButton;

const styles = StyleSheet.create({
    button: {
        
        position: "relative",
        // height: sizes.buttonHeight,
        // padding: 16,
        // borderRadius: 32,
        // borderWidth: 1,
        // borderColor: "#F7F7F7",
    }
})