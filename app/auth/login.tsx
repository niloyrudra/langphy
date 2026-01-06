import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'

import FacebookIcon from '@/assets/images/social/facebook.svg'
import GoogleIcon from '@/assets/images/social/google.svg'


import sizes from '@/constants/size'
// import * as STYLES from '@/constants/styles'
import TextInputComponent from '@/components/form-components/TextInputComponent'
import ForgotPasswordLink from '@/components/form-components/auth/ForgotPasswordLink'
import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import AuthTopBannerImage from '@/components/form-components/auth/AuthTopBannerImage'
import FormHeaderTitle from '@/components/form-components/auth/FormHeaderTitle'
import SocialButton from '@/components/form-components/auth/SocialButton'
import HorizontalSeparator from '@/components/form-components/auth/HorizontalSeparator'
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton'
import { useAuth } from '@/context/AuthContext'
import * as Yup from "yup";
import { Formik } from 'formik';
import * as SecureStore from "expo-secure-store";
import { router } from 'expo-router'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().min(6, "Password must be at least 6 characters.").required("Password is required.")
});

const Login = () => {
  const { colors } = useTheme();
  const { signIn, setUser } = useAuth();

  const onSignInHandler = async ( email: string, password: string ) => {
    try {
      // const res = await signIn( email, password );
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE}/users/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password})
        }
      );
      const data = await res.json();

      console.log(res.status, data)

      if( res.status === 200 && data! ) {  
        const { user, token, message } = data;
        await SecureStore.setItemAsync("accessToken", token);
        setUser(user);
        if(message) Alert.alert( message )
        else Alert.alert("Successfully signed in!");
        
        router.replace("/lessons");
      }
      else {
        Alert.alert( "Login failed!" )
        await SecureStore.deleteItemAsync("accessToken");
      }

    }
    catch(err) {
      console.error("Login Error:", err)
      Alert.alert("Login failed!")
    }
    finally {
      // setEmail('')
      // setPassword('')
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flex:1 }}>

      <View style={[styles.container, {backgroundColor: colors.background}]}>

        {/* Banner Component */}
        <AuthTopBannerImage />

        {/* Title Component */}
        <FormHeaderTitle title="Sign In" />

        {/* FORM */}
        <Formik
          initialValues={{email:"", password: ""}}
          validationSchema={SignInSchema}
          onSubmit={( values ) => onSignInHandler( values.email, values.password )}
        >
          {({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched }) => (
            <View style={styles.form}>

              {/* Email TextField Component */}
              <TextInputComponent
                placeholder="Email"
                value={values.email}
                inputMode="email"
                placeholderTextColor={colors.placeholderColor}
                onBlur={handleBlur('email')}
                onChange={handleChange('email')}
              />
              {errors.email && touched.email && (<View><Text>{errors.email}</Text></View>)}

              {/* Password TextField Component */}
              <TextInputComponent
                placeholder="Password"
                value={values.password}
                inputMode="text"
                isPassword={true}
                placeholderTextColor={colors.placeholderColor}
                onBlur={handleBlur("password")}
                onChange={handleChange('password')}
              />
              {errors.password && touched.password && (<View><Text>{errors.password}</Text></View>)}

              {/* Forgot Password Link Component */}
              <ForgotPasswordLink />

              {/* Form Submit Button Component */}
              <ActionPrimaryButton
                buttonTitle='Sign In'
                onSubmit={handleSubmit}
                // onSubmit={() => {
                //   handleSubmit();
                //   handleReset();
                // }}
              />

            </View>
          )}


        </Formik>

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
              route="/auth/signup"
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