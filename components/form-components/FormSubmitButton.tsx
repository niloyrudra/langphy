import { StyleSheet, Text, Image, TouchableOpacity, StyleProp, ViewProps } from 'react-native'
import React from 'react'
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

const FormSubmitButton = ( {
        buttonTitle="Submit",
        onSubmit,
        buttonStyle,
        buttonTextStyle,
        disabled=false
    }: SubmitButtonProps ) => {
    // const {colors} = useTheme();
  return (
    <TouchableOpacity
        style={[
            STYLES.childContentCentered,
            styles.button,
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
        {/* <ButtonGradient width={(Dimensions.get('screen').width - sizes.bodyPaddingHorizontal*2)} height={56} /> */}

        <Text style={[{position:"absolute", fontSize: 16, color: "#fff", fontWeight: "800"}, (buttonTextStyle && buttonTextStyle)]}>{buttonTitle}</Text>

    </TouchableOpacity>
  )
}

export default FormSubmitButton

const styles = StyleSheet.create({
    button: {
        position: "relative",
        height: sizes.buttonHeight,
        // padding: 16,
        // borderRadius: 32,
        // borderWidth: 1,
        // borderColor: "#F7F7F7",
    }
})