import { ColorValue, InputModeOptions, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import ToggleColorThemeComponent from '../ToggleColorThemeComponent'
import ToggledEyeIcon from './auth/ToogledEyeIcon'
import { useTheme } from '@/theme/ThemeContext'
import sizes from '@/constants/size'

interface InputProps { // extends TextInputProps -> better approach
    value: string,
    placeholder?: string,
    onChange: (text: string) => void,
    // onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    multiline?: boolean,
    numberOfLines?: number,
    maxLength?: number,
    inputMode?: InputModeOptions | undefined,
    placeholderTextColor?: ColorValue | undefined,
    isPassword?: boolean
}

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
    const [ isSecureTextEntry, setIsSecureTextEntry ] = React.useState(false)

  return (
    <View>
        <TextInput
            placeholder={placeholder}
            value={value}
            keyboardType='default'

            style={[styles.input, { color: colors.text, backgroundColor: colors.textFieldBackgroundColor, borderColor: colors.textFieldBorderColor }]}
            // editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            placeholderTextColor={placeholderTextColor}
            enterKeyHint="done"
            inputMode={inputMode}
    
            secureTextEntry={ isSecureTextEntry ?? isPassword}

            onChangeText={onChange}
            // onFocus={() => console.log("Field is onFocussed!")}
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