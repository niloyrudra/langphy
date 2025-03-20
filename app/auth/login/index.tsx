import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

import FacebookIcon from '@/assets/images/social/facebook.svg'
import GoogleIcon from '@/assets/images/social/google.svg'


import sizes from '@/constants/size'
import * as STYLES from '@/constants/styles'
import TextInputComponent from '@/components/form-components/TextInputComponent'
import ForgotPasswordLink from '@/components/form-components/auth/ForgotPasswordLink'
import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import AuthTopBannerImage from '@/components/form-components/auth/AuthTopBannerImage'
import FormHeaderTitle from '@/components/form-components/auth/FormHeaderTitle'
import SocialButton from '@/components/form-components/auth/SocialButton'
import HorizontalSeparator from '@/components/form-components/auth/HorizontalSeparator'
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton'

const Login = () => {
  const { colors } = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView contentContainerStyle={{ flex:1 }}>

      <View style={[styles.container, {backgroundColor: colors.background}]}>

        {/* Banner Component */}
        <AuthTopBannerImage />

        {/* Title Component */}
        <FormHeaderTitle title="Sign In" />

        {/* FORM */}
        <View style={styles.form}>

          {/* Email TextField Component */}
          <TextInputComponent
            placeholder="Email"
            value={email}
            inputMode="email"
            placeholderTextColor={colors.placeholderColor}
            onChange={(text: string) => setEmail( prevValue => prevValue = text)}
          />

          {/* Password TextField Component */}
          <TextInputComponent
            placeholder="Password"
            value={password}
            inputMode="text"
            isPassword={true}
            placeholderTextColor={colors.placeholderColor}
            onChange={(text: string) => setPassword( prevValue => prevValue = text)}
          />

          {/* Forgot Password Link Component */}
          <ForgotPasswordLink />

          {/* Form Submit Button Component */}
          <ActionPrimaryButton
            buttonTitle='Sign In'
            onSubmit={() => {
              console.log("Submitted value", email, password)
              setEmail('')
              setPassword('')
            }}
          />

        </View>

        {/* Section Breaker Component */}
        <HorizontalSeparator />

        <View>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              height: sizes.buttonHeight,
              marginBottom: 20
            }}
          >
            <SocialButton
              iconComponent={<FacebookIcon width={sizes.defaultIconSize} height={sizes.defaultIconSize} />}
              socialMediaName='facebook'
              onTap={() => console.log("Facebook")}
            />

            <SocialButton
              iconComponent={<GoogleIcon width={sizes.defaultIconSize} height={sizes.defaultIconSize} />}
              socialMediaName='Google'
              onTap={() => console.log("Google")}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              marginBottom: 20
            }}
          >
            <Text style={{color: colors.textSubColor}}>Don't have an account?</Text>

            <PlainTextLink
              route="/auth/signUp"
              linkText='Create Account'
            />
          </View>

        </View>

      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: 30,
    
  },
  headerWrapper: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 32,
    color: "#142C57",
    fontWeight: "600"
  },
  form: {
    flexDirection: 'column',
    gap: 16
  }
})