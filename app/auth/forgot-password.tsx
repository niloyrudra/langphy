import { Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useAuth } from '@/context/AuthContext';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import AuthInput from '@/components/form-components/auth/AuthInput';
import PlainTextLink from '@/components/form-components/auth/PlainTextLink';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is rewuired!"),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
  confirmedPassword: Yup.string().required("Confirm Password is required!").oneOf([ Yup.ref('newPassword') ], "Passwords must match!")
});

const ForgotPasswordScreen = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {user} = useAuth();

  const handleResetPassword = async ( email: string, password: string, confirmedPassword: string ) => {
    if( user?.email == email.trim() ) return Alert.alert("Your email is incorrect.");
    try {
      setLoading(true)
    }
    catch(err) {
      setLoading(false)

    }
    finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout screenTitle={"Reset Password"}>

      {/* FORM */}
      <Formik
        initialValues={{ email: "", password: "", confirmedPassword: "" }}
        validationSchema={ResetPasswordSchema}
        // style={{flex:1}}
        onSubmit={(values, {resetForm}) => {
          handleResetPassword( values.email, values.password, values.confirmedPassword);
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
            />

            <AuthInput
              value={values.confirmedPassword}
              placeholderText='Confirm Password'
              inputMode='text'
              handleBlur={handleBlur('confirmedPassword')}
              handleChange={handleChange('confirmedPassword')}
              error={errors.confirmedPassword || null}
              touched={touched.confirmedPassword ? "true" : null}
            />

            {/* Submit Button */}
            <ActionPrimaryButton
              buttonTitle="Reset"
              onSubmit={handleSubmit}
              isLoading={loading}
            />
            
          </View>
        )}
      </Formik>

      <View style={{marginTop: 20}}>
        <PlainTextLink route="/auth/login" text='Do you want to go back?' linkText='Log in' />
      </View>

      <View style={{flex:1}} />
    
    </AuthLayout>
  )
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    gap: 16
  }
})