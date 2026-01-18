import { View, Alert, TextInput } from 'react-native'
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
import ActionButton from '@/components/form-components/ActionButton';

const ProfileEditSchema = Yup.object().shape({
    first_name: Yup.string().min( 2, "Name must be at least 2 characters." ),
    last_name: Yup.string().min( 2, "Name must be at least 2 characters." ),
    username: Yup.string().trim().lowercase(), // .required("Email is required"),
    profile_image: Yup.string().trim(), // .required("Email is required"),
});

const ProfileEditScreen = () => {
    const { colors, theme } = useTheme();
    const { user, setUser } = useAuth()
    const [ loading, setLoading ] = React.useState<boolean>(false);

    // Handler
    const handleProfileEdit = async (
        first_name: string,
        last_name: string,
        username: string,
        profile_image: string,
    ) => {
        if (!user?.id) {
            Alert.alert("User not loaded yet");
            return;
        }
        try {
            setLoading(true)
            const res = await fetch(
            `${process.env.EXPO_PUBLIC_API_BASE}/profile/update/${user.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username,
                    profile_image
                })
            }
            );
            const data = await res.json();    
            if( res.status === 200 && data! ) {  
                const { profile, message } = data;                
                setUser({
                    id: user?.id ?? "",
                    email: user?.email ?? "",
                    created_at: user?.created_at,
                    provider: user?.provider ?? "",
                    first_name: profile.first_name ?? "",
                    last_name: profile.last_name ?? "",
                    username: profile.username ?? "",
                    profile_image: profile.profile_image ?? "",
                });

                if(message) Alert.alert( message )
                else Alert.alert("Successfully updated profile!");
            }
            else {
                Alert.alert( "Profile update failed!" )
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
                        first_name: user?.first_name ?? "",
                        last_name: user?.last_name ?? "",
                        username: user?.username ?? "",
                        profile_image: user?.profile_image ?? ""
                    }}
                    validationSchema={ProfileEditSchema}
                    onSubmit={async (values, {resetForm}) => {
                        await handleProfileEdit(
                            values.first_name,
                            values.last_name,
                            values.username,
                            values.profile_image
                        );
                        resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex:1, gap: 20 }}>

                            <AuthInput
                                placeholderText='Your First Name'
                                inputMode='text'
                                value={values.first_name}
                                handleBlur={handleBlur('first_name')}
                                handleChange={handleChange('first_name')}
                                error={errors.first_name || null}
                                touched={touched.first_name ? "true" : null}
                            />

                            <AuthInput
                                placeholderText='Your Last Name'
                                inputMode='text'
                                value={values.last_name}
                                handleBlur={handleBlur('last_name')}
                                handleChange={handleChange('last_name')}
                                error={errors.last_name || null}
                                touched={touched.last_name ? "true" : null}
                            />

                            <AuthInput
                                placeholderText='Your username'
                                inputMode='text'
                                value={values.username}
                                handleBlur={handleBlur('username')}
                                handleChange={handleChange('username')}
                                error={errors.username || null}
                                touched={touched.username ? "true" : null}
                            />

                            <AuthInput
                                placeholderText='Profile Image'
                                inputMode='text'
                                value={values.profile_image}
                                handleBlur={handleBlur('profile_image')}
                                handleChange={handleChange('profile_image')}
                                error={errors.profile_image || null}
                                touched={touched.profile_image ? "true" : null}
                            />

                            {/* Submit Button */}
                            <View style={{marginTop: "auto", gap: 20}}>
                                <ActionPrimaryButton
                                    buttonTitle="Create Account"
                                    onSubmit={handleSubmit}
                                    isLoading={loading}
                                />

                                <ActionButton
                                    buttonTitle='Reset Password'
                                    onSubmit={() => router.push('/dashboard/reset-user-password') }
                                    buttonStyle={{
                                        borderColor: theme == 'light' ? colors.primary : "#FFFFFF"
                                    }}
                                />
                            </View>
                        
                        </View>
                    )}
                </Formik>
            
            </KeyboardAvoidingViewLayout>
        </SafeAreaLayout>
    );
}

export default ProfileEditScreen;