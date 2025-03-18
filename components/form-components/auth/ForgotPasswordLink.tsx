import { View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'

const ForgotPasswordLink = () => {
    const {colors} = useTheme();
  return (
    <View
        style={{
            justifyContent: "center",
            alignItems: "flex-end"              
        }}
        >
        <Link
            href="/auth/forgetPassword"
            style={{
                color: colors.primary
            }}
        >Forgot Password?</Link>
    </View>
  )
}

export default ForgotPasswordLink;