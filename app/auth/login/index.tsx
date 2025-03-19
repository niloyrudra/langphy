import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

// import DolphinIcon from '@/assets/images/auth/dolphin-icon.svg'
// import HorizontalLine from '@/components/HorizontalLine'

import FacebookIcon from '@/assets/images/social/facebook.svg'
import GoogleIcon from '@/assets/images/social/google.svg'

// import { Link } from 'expo-router'

import sizes from '@/constants/size'
import * as STYLES from '@/constants/styles'
import TextInputComponent from '@/components/form-components/TextInputComponent'
import ForgotPasswordLink from '@/components/form-components/auth/ForgotPasswordLink'
import FormSubmitButton from '@/components/form-components/FormSubmitButton'
import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import AuthTopBannerImage from '@/components/form-components/auth/AuthTopBannerImage'
import FormHeaderTitle from '@/components/form-components/auth/FormHeaderTitle'
import SocialButton from '@/components/form-components/auth/SocialButton'
import HorizontalLine from '@/components/HorizontalLine'
import HorizontalSeparator from '@/components/form-components/auth/HorizontalSeparator'

const Login = () => {
  const { colors } = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        flex:1
      }}
    >
      <View
        style={[styles.container, {backgroundColor: colors.background}]}
      >

        <AuthTopBannerImage />

        <FormHeaderTitle title="Sign In" />

        {/* FORM */}
        <View
          style={styles.form}
        >
          <TextInputComponent
            placeholder="Email"
            value={email}
            inputMode="email"
            placeholderTextColor={colors.placeholderColor}
            onChange={(text: string) => setEmail( prevValue => prevValue = text)}
          />
          <TextInputComponent
            placeholder="Password"
            value={password}
            inputMode="text"
            isPassword={true}
            placeholderTextColor={colors.placeholderColor}
            onChange={(text: string) => setPassword( prevValue => prevValue = text)}
          />

          <ForgotPasswordLink />

          <FormSubmitButton
            buttonTitle='Sign In'
            onSubmit={() => {
              console.log("Submitted value", email, password)
              setEmail('')
              setPassword('')
            }}
          />

        </View>

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
              // marginBottom: 80
            }}
          >
            <Text style={{color: colors.textSubColor}}>Don't have an account?</Text>

            <PlainTextLink
              route="/auth/signUp"
              linkText='Create Account'
            />
          </View>

        </View>

        {/* <View style={{marginBottom: 80}} /> */}

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