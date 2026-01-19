import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext'
import ForgotPasswordLink from '@/components/form-components/auth/ForgotPasswordLink'
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton'
import { useAuth } from '@/context/AuthContext'
import * as Yup from "yup";
import { Formik } from 'formik';
import * as SecureStore from "expo-secure-store";
import { router } from 'expo-router'
import AuthInput from '@/components/form-components/auth/AuthInput'
import AuthLayout from '@/components/layouts/AuthLayout'
import SocialLoginSection from '@/components/form-components/auth/SocialLoginSection'
import PlainTextLink from '@/components/form-components/auth/PlainTextLink'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().min(6, "Password must be at least 6 characters.").required("Password is required.")
});

const Login = () => {
  const {colors} = useTheme();
  const [loading, setLoading] = React.useState<boolean>(false)

  const onSignInHandler = async ( email: string, password: string ) => {
    try {
      setLoading(true)
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

      // console.log(res.status, data)

      if( res.status === 200 && data! ) {  
        const { user, token, message } = data;
        await SecureStore.setItemAsync("accessToken", token);

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
      setLoading(false)
      console.error("Login Error:", err)
      Alert.alert("Login failed!")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout screenTitle={"Sign In"}>
      {/* FORM */}
      <Formik
        initialValues={{email:"", password: ""}}
        validationSchema={SignInSchema}
        onSubmit={( values, {resetForm} ) => {
          onSignInHandler( values.email, values.password );
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>

            {/* Email TextField Component */}
            <AuthInput
              value={values.email}
              placeholderText='Email'
              inputMode='email'
              handleBlur={handleBlur('email')}
              handleChange={handleChange('email')}
              error={errors.email || null}
              touched={touched.email ? "true" : null}
            />

            {/* Password TextField Component */}
            <AuthInput
              value={values.password}
              placeholderText='Password'
              inputMode='text'
              handleBlur={handleBlur('password')}
              handleChange={handleChange('password')}
              error={errors.password || null}
              touched={touched.password ? "true" : null}
              isPassword={true}
            />

            {/* Forgot Password Link Component */}
            <ForgotPasswordLink />

            {/* Form Submit Button Component */}
            <ActionPrimaryButton
              buttonTitle='Sign In'
              onSubmit={handleSubmit}
              isLoading={loading}
            />

          </View>
        )}
      </Formik>

      {/* Social Media */}
      {/* <SocialLoginSection /> */}

      {/* Route to Signup */}
      <View style={[styles.footer, {marginTop: 30}]}>
        <Text style={{color: colors.textSubColor}}>Don't have an account?</Text>
        <PlainTextLink
          route="/auth/signup"
          linkText='Create Account.'
        />
      </View>

    </AuthLayout>
  )
}

export default Login

const styles = StyleSheet.create({
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
  },
  footer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginBottom: 20
  }
})