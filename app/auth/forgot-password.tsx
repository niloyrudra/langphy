import { StyleSheet, View } from 'react-native'
import React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useAuth } from '@/context/AuthContext';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import AuthInput from '@/components/form-components/auth/AuthInput';
import PlainTextLink from '@/components/form-components/auth/PlainTextLink';
import { useFeedback } from '@/utils/feedback';
import { resetPasswordByEmail } from '@/services/auth.service';
import { toastError, toastLoading, toastSuccess } from '@/services/toast.service';
import { useNetwork } from '@/context/NetworkContext';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
  confirmedPassword: Yup.string().required("Confirm Password is required!").oneOf([ Yup.ref('newPassword') ], "Passwords must match!")
});

const ForgotPasswordScreen = () => {
  const { isOnline } = useNetwork();
  const [loading, setLoading] = React.useState<boolean>(false);
  const {user} = useAuth();
  const {triggerFeedback} = useFeedback();

  const handleResetPassword = async ( email: string, password: string, confirmedPassword: string ) => {
    if (!isOnline) {
      toastError("You're offline!");
      return;
    }
    if( user?.email == email.trim() ) return toastError("Your email is incorrect.");
    if( password !== confirmedPassword ) return toastError("Passwords must match each other!");
    const toastId = toastLoading("Password reset processing...");
    try {
      setLoading(true)

      const res = await resetPasswordByEmail( email, password );

      if( res.status !== 200 ) return toastError(res.statusText, { id: toastId });

      const {data} = res;
      console.log(data);
      if( data.message ) toastSuccess(data.message, { id: toastId });
    }
    catch(err) {
      setLoading(false);
      toastError( 'Password reset failed!', { id: toastId } );
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
          triggerFeedback("tap");
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

      <View style={styles.footer}>
        <PlainTextLink route="/auth/login" text='Do you want to go back?' linkText='Log in' />
      </View>

      {/* <View style={{flex:1}} /> */}
    
    </AuthLayout>
  )
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    gap: 16
  },
  footer: {
    marginTop: 30
  }
})