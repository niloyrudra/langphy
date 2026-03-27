import { StyleSheet, View } from 'react-native'
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
// import SocialLoginSection from '@/components/form-components/auth/SocialLoginSection'
import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import { jwtDecode } from 'jwt-decode'
import { bootstrapProfileFromToken } from '@/bootstraps/profile.bootstrap'
import { bootstrapSettingsFromToken } from '@/bootstraps/settings.bootstrap'
import { bootstrapStreaks } from '@/bootstraps/streaks.bootstrap'
import { authSnapshot } from '@/snapshots/authSnapshot'
import LangphyText from '@/components/text-components/LangphyText'
import { useFeedback } from '@/utils/feedback'
import { signIn } from '@/services/auth.service'
import { toastError, toastLoading, toastSuccess } from '@/services/toast.service'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().min(6, "Password must be at least 6 characters.").required("Password is required.")
});

const Login = () => {
  const {colors} = useTheme();
  const { setUser } = useAuth();
  const {triggerFeedback} = useFeedback()
  const [loading, setLoading] = React.useState<boolean>(false)

  const onSignInHandler = async ( email: string, password: string ) => {
    const toastId = toastLoading("Signing in...");
    try {
      setLoading(true)
      const res = await signIn( email, password );

      if( res.status === 200 && res.data ) {  
        const { token, message } = res.data;
        await SecureStore.setItemAsync("accessToken", token);

        const decode: any = jwtDecode(token);
        setUser( { id: decode.id, email: decode.email, created_at: decode.created_at } );
        authSnapshot.set(
          decode.id,
          token
        );
        // Storing profile locally
        await bootstrapProfileFromToken({
          id: decode.id,
          email: decode.email,
          created_at: decode.created_at
        });
        await bootstrapSettingsFromToken({ user_id: decode.id});
        await bootstrapStreaks({ user_id: decode.id });
        console.log("Bootstrapped data from Login");

        // Toaster
        if(message) toastSuccess( message, { id: toastId! } );
        else toastSuccess("Successfully signed in!", { id: toastId! });
                
        router.replace("/lessons");
      }
      else {
        toastError('Login Failed!', { id: toastId! });
        await SecureStore.deleteItemAsync("accessToken");
      }

    }
    catch(err) {
      setLoading(false)
      console.error("Login Error:", err)
      toastError('Login Failed!');
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
          triggerFeedback("tap");
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
      <View style={[styles.footer]}>
        <LangphyText style={{color: colors.textSubColor}}>Don't have an account?</LangphyText>
        <PlainTextLink
          route="/auth/signup"
          linkText='Create Account.'
        />
      </View>

    </AuthLayout>
  )
}

export default Login;

const styles = StyleSheet.create({
  // headerWrapper: {
  //   marginVertical: 20,
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // header: {
  //   fontSize: 32,
  //   color: "#142C57",
  //   fontWeight: "600"
  // },
  form: {
    flexDirection: 'column',
    gap: 16
  },
  footer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  }
})