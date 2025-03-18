import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

import sizes from '@/constants/size'

import HorizontalLine from '@/components/HorizontalLine'

import FacebookIcon from '@/assets/images/social/facebook.svg'
import GoogleIcon from '@/assets/images/social/google.svg'

import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import FormSubmitButton from '@/components/form-components/FormSubmitButton'
import TextInputComponent from '@/components/form-components/TextInputComponent'
import FormHeaderTitle from '@/components/form-components/auth/FormHeaderTitle'
import AuthTopBannerImage from '@/components/form-components/auth/AuthTopBannerImage'

const SignUp = () => {
  const { colors } = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        flex:1
      }}
    >

      <View
      style={[styles.container, {backgroundColor: colors.background}]}>

        <AuthTopBannerImage />

        <FormHeaderTitle title="Create Account" />

        {/* FORM */}
        <View
          style={styles.form}
        >
         
          <TextInputComponent
            placeholder="Email"
            value=""
          />
          <TextInputComponent
            placeholder="Password"
            value=""
          />

          <FormSubmitButton
            buttonTitle='Create Account'
            onSubmit={() => console.log("Submitted")}
          />

        </View>

        <HorizontalLine />

        <View>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              height: 56,
            }}
          >

            <TouchableOpacity
              style={{
                flex:1,
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: "#F7F7F7",
                backgroundColor: "#ffffff"
              }}
            >
              <FacebookIcon width={24} height={24} />
              <Text>facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex:1,
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: "#F7F7F7",
                backgroundColor: "#ffffff"
              }}
            >
              <GoogleIcon width={24} height={24} />
              <Text>Google</Text>
            </TouchableOpacity>

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