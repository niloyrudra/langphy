import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
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
import { Formik } from "formik";
import * as Yup from "yup";
// import { UserData } from '@/types';
// import SIZES from '@/constants/size';
import { useAuth } from '@/context/AuthContext';
// import * as SecureStore from "expo-secure-store";

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
        // await SecureStore.setItemAsync("accessToken", token);
        setUser(user);
        if(message) Alert.alert( message )
        else Alert.alert("Successfully signed up!");
        
        router.replace("/auth/login");
      }
      else {
        Alert.alert( "Signup failed!" )
        // await SecureStore.deleteItemAsync("accessToken");
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
    <ScrollView contentContainerStyle={{ flex:1 }}>

      <View style={[styles.container, {backgroundColor: colors.background}]}>

        <AuthTopBannerImage />

        <FormHeaderTitle title="Create Account" />

        {/* FORM */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleSignup(values.email, values.password)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>

              {/* Email TextField Component */}
              <TextInputComponent
                placeholder="Email"
                inputMode="email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {errors.email && touched.email && <Text>{errors.email}</Text>}

              <TextInputComponent
                placeholder="Password"
                isPassword={true}
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {errors.password && touched.password && <Text>{errors.password}</Text>}

              {/* Submit Button */}
              <ActionPrimaryButton
                buttonTitle="Create Account"
                onSubmit={handleSubmit}
                isLoading={loading}
              />
              
            </View>
          )}
        </Formik>
      
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

          <PlainTextLink text="Already have an account?" route="/auth/login" linkText="Login here." />

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