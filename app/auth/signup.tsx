import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'
import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton'
import { Formik } from "formik";
import * as Yup from "yup";
import AuthInput from '@/components/form-components/auth/AuthInput'
import AuthLayout from '@/components/layouts/AuthLayout'
import api from '@/lib/api'
import { toast } from '@backpackapp-io/react-native-toast'
import { useFeedback } from '@/utils/feedback'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUp = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const {triggerFeedback} = useFeedback();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSignup = async ( email: string, password: string ) => {
    try {
      setLoading(true)

      const res = await api.post( "/users/signup", {email, password} )

      console.log(res.status)

      if( res.status === 201 && res.data ) {  
        const { message } = res.data;
        
        // Toaster
        if(message) toast.success( message );
        else toast.success("Successfully signed up!");
        
        router.replace("/auth/login");
      }
      else {
        toast.error( "Signup failed!" )
      }

    }
    catch(err) {
      console.error("Signup Error:", err)
      toast.error("Signup failed!")
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
          triggerFeedback("tap");
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