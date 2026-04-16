import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'
import PlainTextLink from '@/components/form-components/auth/PlainTextLink'
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton'
import { Formik } from "formik";
import * as Yup from "yup";
import AuthInput from '@/components/form-components/auth/AuthInput'
import AuthLayout from '@/components/layouts/AuthLayout'
import { useFeedback } from '@/utils/feedback'
import LangphyText from '@/components/text-components/LangphyText'
import { toastError, toastLoading, toastSuccess } from '@/services/toast.service'
import { requestOtp } from '@/services/auth.service'
import { useNetwork } from '@/context/NetworkContext'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUp = () => {
  const { colors } = useTheme();
  const { isOnline } = useNetwork();
  const router = useRouter();
  const { triggerFeedback } = useFeedback();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSignup = async (email: string, password: string) => {
    if (!isOnline) {
      toastError("You're offline! Please reconnect and try again.");
      return;
    }
    const toastId = toastLoading("Sending verification code...");
    try {
      setLoading(true);
      const res = await requestOtp(email, password);
      if (res.status === 200) {
        toastSuccess("Check your email for the code!", { id: toastId });
        // Pass credentials to OTP screen — password stays client-side only
        router.push({
          pathname: "/auth/verify-otp",
          params: { email, password }
        });
      }
    } catch (err: any) {
      const msg = err?.response?.data?.errors?.[0]?.message ?? "Signup failed!";
      toastError(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

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
        <LangphyText style={{color: colors.textSubColor}}>By signing in to Langphy, you agree to our </LangphyText>

        <PlainTextLink route="/terms" linkText='Terms' />

        <LangphyText style={{color: colors.textSubColor}}> and </LangphyText>

        <PlainTextLink route="/privacy" linkText='Privacy Policy' />

        <LangphyText style={{color: colors.textSubColor}}>.</LangphyText>

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
    marginVertical: 20,
    flexWrap: "wrap"
  }
})