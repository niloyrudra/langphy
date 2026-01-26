import { Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useAuth } from '@/context/AuthContext';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import AuthInput from '@/components/form-components/auth/AuthInput';
import PlainTextLink from '@/components/form-components/auth/PlainTextLink';
import api from '@/lib/api';

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
    if( password !== confirmedPassword ) return Alert.alert("Passwords must match each other!");
    try {
      setLoading(true)
      const res = await api.put(
        `/users/reset-password`,
        {
          email,
          password: password
        }
      );
      if( res.status !== 200 ) return Alert.alert(res.statusText)
      // const data = await res.json();
      const {data} = res
      console.log(data);
      if( data.message ) Alert.alert(data.message);
    }
    catch(err) {
      setLoading(false)
      Alert.alert( 'Password reset failed!' );
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout screenTitle={"Reset Password"}>

      {/* FORM */}
      <Formik
        initialValues={{ email: "", newPassword: "", confirmedPassword: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values, {resetForm}) => {
          handleResetPassword( values.email, values.newPassword, values.confirmedPassword);
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
              value={values.newPassword}
              placeholderText='New Password'
              inputMode='text'
              handleBlur={handleBlur('newPassword')}
              handleChange={handleChange('newPassword')}
              error={errors.newPassword || null}
              touched={touched.newPassword ? "true" : null}
              isPassword={true}
            />

            <AuthInput
              value={values.confirmedPassword}
              placeholderText='Confirm Password'
              inputMode='text'
              handleBlur={handleBlur('confirmedPassword')}
              handleChange={handleChange('confirmedPassword')}
              error={errors.confirmedPassword || null}
              touched={touched.confirmedPassword ? "true" : null}
              isPassword={true}
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