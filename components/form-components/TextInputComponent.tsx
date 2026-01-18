import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
// Types
import { InputProps } from '@/types';
// ConTexts
import { useTheme } from '@/theme/ThemeContext';
// Constants
import SIZES from '@/constants/size';
// Components
import ToggledEyeIcon from './auth/ToggledEyeIcon';

const TextInputComponent = ({
    value='',
    placeholder,
    onChange,
    onBlur,
    multiline=false,
    numberOfLines=1,
    maxLength=100,
    inputMode='text',
    placeholderTextColor,
    isPassword=false,
    contentContainerStyle={}
}: InputProps) => {
    const { colors, theme } = useTheme();
    const [ isSecureTextEntry, setIsSecureTextEntry ] = React.useState<boolean>(isPassword);
    const [ isFocused, setIsFocused ] = React.useState<boolean>(false);

  return (
    <View style={contentContainerStyle}>
        <TextInput
            placeholder={placeholder}
            value={value}
            keyboardType={ inputMode == 'email' ? "email-address" : 'default'}

            style={[
                styles.input,
                { color: colors.text, backgroundColor: colors.textFieldBackgroundColor, borderColor: colors.textFieldBorderColor },
                ( isFocused && { borderColor: colors.authTextFieldBorderColorFocus } ),
                ( multiline && {
                    fontSize: SIZES.fontSizeTextArea,
                    height: SIZES.textFieldHeight * numberOfLines,
                    textAlignVertical: 'top'
                }),
                (inputMode == 'email' && { textTransform: "lowercase" })
            ]}
            // textContentType='none'
            // editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            placeholderTextColor={placeholderTextColor}
            enterKeyHint="done"
            inputMode={inputMode}
            keyboardAppearance={theme === 'light' ? 'light' : 'dark'}
    
            secureTextEntry={ isSecureTextEntry ?? isPassword}

            onChangeText={onChange}
            onFocus={() => setIsFocused(prevValue => prevValue = ! prevValue)}
            onBlur={onBlur} // {() => setIsFocused(prevValue => prevValue = ! prevValue)}
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
        height: SIZES.textFieldHeight
    },
    input: {
        height: SIZES.textFieldHeight,
        paddingVertical: 8, //16,
        paddingHorizontal: 16, //16,
        borderRadius: 16,
        borderWidth: 1
    }
});