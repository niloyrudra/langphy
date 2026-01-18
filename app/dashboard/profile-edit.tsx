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
import ActionButton from '@/components/form-components/ActionButton';

const ProfileEditSchema = Yup.object().shape({
    firstName: Yup.string().min( 2, "Name must be at least 2 characters" ),
    lastName: Yup.string().min( 2, "Name must be at least 2 characters" ),
    username: Yup.string().trim(), // .required("Email is required"),
    profile_image: Yup.string().trim(), // .required("Email is required"),
});

const ProfileEditScreen = () => {
    const {colors, theme} = useTheme();
    const { user, setUser } = useAuth()
    const [loading, setLoading] = React.useState<boolean>(false);

    // Handler
    const handleProfileEdit = async (
        firstName: string,
        lastName: string,
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
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    profile_image
                })
            }
            );
            const data = await res.json();
    
            console.log(res.status, data)
    
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
                        firstName: "",
                        lastName: "",
                        username:"",
                        profile_image:""
                    }}
                    validationSchema={ProfileEditSchema}
                    onSubmit={async (values, {resetForm}) => {
                        await handleProfileEdit(
                            values.firstName,
                            values.lastName,
                            values.username,
                            values.profile_image
                        );
                        resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex:1, gap: 20 }}>

                            <AuthInput
                                value={values.firstName}
                                placeholderText='Your First Name'
                                inputMode='text'
                                isPassword={false}
                                handleBlur={handleBlur('firstName')}
                                handleChange={handleChange('firstName')}
                                error={errors.firstName || null}
                                touched={touched.firstName ? "true" : null}
                            />

                            <AuthInput
                                value={values.lastName}
                                placeholderText='Your Last Name'
                                inputMode='text'
                                handleBlur={handleBlur('lastName')}
                                handleChange={handleChange('lastName')}
                                error={errors.lastName || null}
                                touched={touched.lastName ? "true" : null}
                            />

                            <AuthInput
                                value={values.username}
                                placeholderText='Your username'
                                inputMode='text'
                                handleBlur={handleBlur('username')}
                                handleChange={handleChange('username')}
                                error={errors.username || null}
                                touched={touched.username ? "true" : null}
                            />

                            <AuthInput
                                value={values.profile_image}
                                placeholderText='Profile Image'
                                inputMode='text'
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