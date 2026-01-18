import { View, Alert } from 'react-native'
import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import KeyboardAvoidingViewLayout from '@/components/layouts/KeyboardAvoidingViewLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import AuthInput from '@/components/form-components/auth/AuthInput';

const ResetUserPaswordSchema = Yup.object().shape({
    newPassword: Yup.string().min(4, "Password must be at least 4 characters").required("New Password is required"),
    confirmedPassword: Yup.string().required("Confirmed Password is required").oneOf([ Yup.ref('newPassword') ], "Passwords must match!"),
});

const ResetUserPaswordScreen = () => {
    const {colors} = useTheme();
    const { user, setUser } = useAuth()
    const [loading, setLoading] = React.useState<boolean>(false);

    console.log(user?.id)

    // Handler
    const handleResetUserPasword = async (
        newPassword: string,
        confirmedPassword: string
    ) => {
        if( newPassword != confirmedPassword ) return Alert.alert("Passwords must match each other!");
        try {
            setLoading(true)
            const res = await fetch(
            `${process.env.EXPO_PUBLIC_API_BASE}/users/profile/reset-password`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user?.id,
                    password: newPassword
                })
            }
            );
            const data = await res.json();
    
            console.log(res.status, data)
    
            if( res.status === 200 && data! ) {  
                const { profile, message } = data;
                setUser({...user, ...profile});
                if(message) Alert.alert( message )
                else Alert.alert("Successfully updated profile!");
                
                // router.replace("/auth/login");
            }
            else {
                Alert.alert( "Profile update failed!" )
                // await SecureStore.deleteItemAsync("accessToken");
            }
    
        }
        catch(err) {
            console.error("Profile update Error:", err)
            Alert.alert("Profile update failed!")
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
                        console.log( values )
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