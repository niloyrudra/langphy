import { View } from 'react-native'
import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import KeyboardAvoidingViewLayout from '@/components/layouts/KeyboardAvoidingViewLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import AuthInput from '@/components/form-components/auth/AuthInput';
import { toast } from '@backpackapp-io/react-native-toast';
import { resetPassword } from '@/services/profie.service';
import { toastError, toastSuccess } from '@/services/toast.service';

const ResetUserPaswordSchema = Yup.object().shape({
    newPassword: Yup.string().min(4, "Password must be at least 4 characters").required("New Password is required"),
    confirmedPassword: Yup.string().required("Confirmed Password is required").oneOf([ Yup.ref('newPassword') ], "Passwords must match!"),
});

const ResetUserPaswordScreen = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    // Handler
    const handleResetUserPasword = async (
        newPassword: string,
        confirmedPassword: string
    ) => {
        if( newPassword != confirmedPassword ) return toast.error("Passwords must match each other!");
        try {
            setLoading(true);

            const res = await resetPassword( newPassword );

            if( res.status === 200 && res.data! ) {  
                const { message } = res.data;

                if(message) toastSuccess( message );
                else toastSuccess("Successfully updated password!");
                
                // router.replace("/auth/login");
            }
            else {
                toastError( "Password update failed!" );
            }
    
        }
        catch(err) {
            console.error("Password update Error:", err);
            toastError("Password update failed!");
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
                    validationSchema={ResetUserPaswordSchema}
                    onSubmit={(values, {resetForm}) => {
                        // console.log( values )
                        handleResetUserPasword(
                            values.newPassword,
                            values.confirmedPassword
                        );
                        resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex:1, gap: 20 }}>

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
                                // onSubmit={() => console.log("OK")}
                                onSubmit={handleSubmit}
                                isLoading={loading}
                                buttonStyle={{
                                    marginTop: "auto"
                                }}
                            />
                        
                        </View>
                    )}
                </Formik>
            
            </KeyboardAvoidingViewLayout>
        </SafeAreaLayout>
    );
}

export default ResetUserPaswordScreen;