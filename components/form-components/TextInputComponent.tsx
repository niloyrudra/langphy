import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputChangeEventData, ViewProps } from 'react-native'
import React from 'react'

interface InputProps { // TextInputProps
    value: string,
    placeholder?: string,
    onChange: (text: string) => void,
    // onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    editable?: boolean,
    multiline?: boolean,
    numberOfLines?: number,
    maxLength?: number,
    inputMode?: string | undefined,
    placeholderTextColor?: StyleProp<ViewProps>
}

const TextInputComponent = ({
    value='',
    placeholder,
    onChange,
    editable=false,
    multiline=false,
    numberOfLines=1,
    maxLength,
    inputMode='text',
    placeholderTextColor
}: InputProps) => {

    // const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    //     const newText = e.nativeEvent.text ? e.nativeEvent.text.toString() : '';
    //     if (onChange) {
    //         onChange(newText);
    //     }
    // };

  return (
    <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType='default'
        style={styles.input}
        // editable={editable}
        // multiline={multiline}
        // numberOfLines={numberOfLines}
        // maxLength={maxLength}
        // placeholderTextColor={placeholderTextColor && {color: "#e7eee7"}}
        enterKeyHint="done"
        inputMode={inputMode}

        secureTextEntry={ placeholder === 'Password' ? true : false }

        onChangeText={onChange}
        // onFocus={() => console.log("Field is onFocussed!")}
    />
  )
}

export default TextInputComponent;

const styles = StyleSheet.create({
    input: {
        position: "relative",
        height: 56,
        paddingVertical: 8, //16,
        paddingHorizontal: 16, //16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F7F7F7",
        backgroundColor: "#ffffff"
    }
});