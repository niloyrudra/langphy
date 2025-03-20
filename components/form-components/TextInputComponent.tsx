import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
// Types
import { InputProps } from '@/types'
// ConTexts
import { useTheme } from '@/theme/ThemeContext'
// Constants
import sizes from '@/constants/size'
// Components
import ToggledEyeIcon from './auth/ToggledEyeIcon'

const TextInputComponent = ({
    value='',
    placeholder,
    onChange,
    multiline=false,
    numberOfLines=1,
    maxLength=100,
    inputMode='text',
    placeholderTextColor,
    isPassword=false
}: InputProps) => {
    const { colors } = useTheme();
    const [ isSecureTextEntry, setIsSecureTextEntry ] = React.useState(true)
    const [ isFocused, setIsFocused ] = React.useState(false)

  return (
    <View>
        <TextInput
            placeholder={placeholder}
            value={value}
            keyboardType='default'

            style={[styles.input, { color: colors.text, backgroundColor: colors.textFieldBackgroundColor, borderColor: colors.textFieldBorderColor }, (isFocused && {borderColor: colors.authTextFieldBorderColorFocus})]}
            // editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            placeholderTextColor={placeholderTextColor}
            enterKeyHint="done"
            inputMode={inputMode}
    
            secureTextEntry={ isSecureTextEntry ?? isPassword}

            onChangeText={onChange}
            onFocus={() => setIsFocused(prevValue => prevValue = ! prevValue)}
            onBlur={() => setIsFocused(prevValue => prevValue = ! prevValue)}
        />

        {
            isPassword && (<ToggledEyeIcon onChange={() => setIsSecureTextEntry( prevValue => prevValue = !prevValue )} isSecureTextEntry={isSecureTextEntry} />)
        }

    </View>
  )
}

export default TextInputComponent;

const styles = StyleSheet.create({
    container: {
        position:"relative",
        height: sizes.textFieldHeight
    },
    input: {
        height: sizes.textFieldHeight,
        paddingVertical: 8, //16,
        paddingHorizontal: 16, //16,
        borderRadius: 16,
        borderWidth: 1
    }
});