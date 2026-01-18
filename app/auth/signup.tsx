import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'

// import SIZES from '@/constants/size'

// import FacebookIcon from '@/assets/images/social/facebook.svg'
// import GoogleIcon from '@/assets/images/social/google.svg'

import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
// import FormHeaderTitle from '@/components/form-components/auth/FormHeaderTitle'
// import AuthTopBannerImage from '@/components/form-components/auth/AuthTopBannerImage'
// import SocialButton from '@/components/form-components/auth/SocialButton'
// import HorizontalSeparator from '@/components/form-components/auth/HorizontalSeparator'
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton'
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from '@/context/AuthContext';
import AuthInput from '@/components/form-components/auth/AuthInput'
import AuthLayout from '@/components/layouts/AuthLayout'
// import SocialLoginSection from '@/components/form-components/auth/SocialLoginSection'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUp = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { setUser } = useAuth();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSignup = async ( email: string, password: string ) => {
    try {
      setLoading(true)
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE}/users/signup`,
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

      if( res.status === 201 && data! ) {  
        const { user, message } = data;
        setUser(user);
        if(message) Alert.alert( message )
        else Alert.alert("Successfully signed up!");
        
        router.replace("/auth/login");
      }
      else {
        Alert.alert( "Signup failed!" )
      }

    }
    catch(err) {
      console.error("Signup Error:", err)
      Alert.alert("Signup failed!")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout screenTitle={"Create Account"}>

      {/* FORM */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={ async (values, {resetForm}) => {
          await handleSignup(values.email, values.password);
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

            {/* Submit Button */}
            <ActionPrimaryButton
              buttonTitle="Create Account"
              onSubmit={handleSubmit}
              isLoading={loading}
            />
            
          </View>
        )}
      </Formik>
    
      {/* <SocialLoginSection /> */}

      <View style={[styles.footer]}>
        <Text style={{color: colors.textSubColor}}>By signing in to Langphy, you agree to our </Text>

        <PlainTextLink route="/terms" linkText='Terms' />

        <Text style={{color: colors.textSubColor}}> and </Text>

        <PlainTextLink route="/privacy" linkText='Privacy Policy' />

        <Text style={{color: colors.textSubColor}}>.</Text>

      </View>

      <PlainTextLink text="Already have an account?" route="/auth/login" linkText="Login here." />

    </AuthLayout>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    gap: 16
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20
  }
})