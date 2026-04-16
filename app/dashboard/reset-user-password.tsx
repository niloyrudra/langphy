import { StyleSheet, View } from 'react-native'
import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import KeyboardAvoidingViewLayout from '@/components/layouts/KeyboardAvoidingViewLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import AuthInput from '@/components/form-components/auth/AuthInput';
import { resetPassword } from '@/services/profile.service';
import { toastError, toastLoading, toastSuccess } from '@/services/toast.service';

const ResetUserPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().min(4, "Password must be at least 4 characters").required("New Password is required"),
    confirmedPassword: Yup.string().required("Confirmed Password is required").oneOf([ Yup.ref('newPassword') ], "Passwords must match!"),
});

const ResetUserPasswordScreen = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    // Handler
    const handleResetUserPassword = async (
        newPassword: string,
        confirmedPassword: string
    ) => {
        if( newPassword != confirmedPassword ) return toastError("Passwords must match each other!");
        const toastId = toastLoading("Password updating...");
        try {
            setLoading(true);

            const res = await resetPassword( newPassword );

            if( res.status === 200 && res.data! ) {  
                const { message } = res.data;

                if(message) toastSuccess( message, {id: toastId} );
                else toastSuccess("Successfully updated password!", {id: toastId});
                
                // router.replace("/auth/login");
            }
            else {
                toastError( "Password update failed!", {id: toastId} );
            }
    
        }
        catch(err) {
            console.error("Password update Error:", err);
            toastError("Password update failed!", {id: toastId});
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaLayout>
            <KeyboardAvoidingViewLayout>

                {/* FORM */}
                <Formik
                    initialValues={{
                        confirmedPassword: "",
                        newPassword: ""
                    }}
                    validationSchema={ResetUserPasswordSchema}
                    onSubmit={(values, {resetForm}) => {
                        handleResetUserPassword(
                            values.newPassword,
                            values.confirmedPassword
                        );
                        resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.container}>

                            <AuthInput
                                value={values.newPassword}
                                placeholderText='New Password'
                                inputMode='text'
                                isPassword={true}
                                handleBlur={handleBlur('newPassword')}
                                handleChange={handleChange('newPassword')}
                                error={errors.newPassword || null}
                                touched={touched.newPassword ? "true" : null}
                            />

                            <AuthInput
                                value={values.confirmedPassword}
                                placeholderText='Confirm Password'
                                inputMode='text'
                                isPassword={true}
                                handleBlur={handleBlur('confirmedPassword')}
                                handleChange={handleChange('confirmedPassword')}
                                error={errors.confirmedPassword || null}
                                touched={touched.confirmedPassword ? "true" : null}
                            />

                            {/* Submit Button */}
                            <ActionPrimaryButton
                                buttonTitle="Reset Password"
                                onSubmit={handleSubmit}
                                isLoading={loading}
                                buttonStyle={styles.button}
                            />
                        
                        </View>
                    )}
                </Formik>
            
            </KeyboardAvoidingViewLayout>
        </SafeAreaLayout>
    );
}

export default ResetUserPasswordScreen;

const styles = StyleSheet.create({
    container: { flex:1, gap: 20 },
    button: {
        marginTop: "auto"
    }
});