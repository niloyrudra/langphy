import { StyleSheet, Text, View, TextInputProps } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import TextInputComponent from '../TextInputComponent';

interface AuthInputProps {
  placeholderText?: string;
  inputMode?: TextInputProps['inputMode'];
  value: string | null;
  handleBlur: (e: any) => void;
  handleChange: (e: any) => void;
  error: string | null;
  touched: string | null;
  isPassword?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  placeholderText,
  inputMode,
  value,
  handleBlur,
  handleChange,
  error,
  touched,
  isPassword=false
}) => {
  const {colors} = useTheme();
  return (
    <>
      <TextInputComponent
        placeholder={placeholderText ?? ""}
        value={value ?? ''}
        inputMode={inputMode}
        placeholderTextColor={colors.placeholderColor}
        onBlur={handleBlur}
        onChange={handleChange}
        
        isPassword={isPassword ?? false}
      />
      {error && touched && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorContent, STYLES.wordWrapStyle, {color: colors.redDanger}]}>{error}</Text>
        </View>
      )}
    </>
  );
}

export default AuthInput;

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: "flex-start",
    marginBottom: 10
  },
  errorContent: {
    fontSize: 14,
    fontWeight: "700"
  }
})