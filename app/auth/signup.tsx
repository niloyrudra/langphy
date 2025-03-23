import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'

import sizes from '@/constants/size'

import FacebookIcon from '@/assets/images/social/facebook.svg'
import GoogleIcon from '@/assets/images/social/google.svg'

import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import TextInputComponent from '@/components/form-components/TextInputComponent'
import FormHeaderTitle from '@/components/form-components/auth/FormHeaderTitle'
import AuthTopBannerImage from '@/components/form-components/auth/AuthTopBannerImage'
import SocialButton from '@/components/form-components/auth/SocialButton'
import HorizontalSeparator from '@/components/form-components/auth/HorizontalSeparator'
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton'

const SignUp = () => {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView contentContainerStyle={{ flex:1 }}>

      <View style={[styles.container, {backgroundColor: colors.background}]}>

        <AuthTopBannerImage />

        <FormHeaderTitle title="Create Account" />

        {/* FORM */}
        <View style={styles.form}>
         
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

          <ActionPrimaryButton
            buttonTitle='Create Account'
            onSubmit={() => {
              console.log("Submitted")
              router.push("/onboarding")
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
              justifyContent: "center",
              marginVertical: 20
            }}
          >
            <Text style={{color: colors.textSubColor}}>By signing in to Langphy, you agree to our </Text>

            <PlainTextLink route="/terms" linkText='Terms' />

            <Text style={{color: colors.textSubColor}}> and </Text>

            <PlainTextLink route="/privacy" linkText='Privacy Policy' />

            <Text style={{color: colors.textSubColor}}>.</Text>

          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              marginBottom: 20
            }}
          >
            <Text style={{color: colors.textSubColor}}>Already have an account?</Text>

            <PlainTextLink route="/auth/login" linkText='Sign In' />

          </View>

        </View>

      </View>

    </ScrollView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
    paddingVertical: 30,
    
  },
  form: {
    flexDirection: 'column',
    gap: 16
  }
})