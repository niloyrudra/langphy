import { View, Alert } from 'react-native'
import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import KeyboardAvoidingViewLayout from '@/components/layouts/KeyboardAvoidingViewLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import AuthInput from '@/components/form-components/auth/AuthInput';
import ActionButton from '@/components/form-components/ActionButton';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/context/AuthContext';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';

const ProfileEditSchema = Yup.object().shape({
    first_name: Yup.string().min( 2, "Name must be at least 2 characters." ),
    last_name: Yup.string().min( 2, "Name must be at least 2 characters." ),
    username: Yup.string().trim().lowercase(), // .required("Email is required"),
    profile_image: Yup.string().trim(), // .required("Email is required"),
});

const ProfileEditScreen = () => {
    const { colors, theme } = useTheme();
    const {user} = useAuth();
    const { data: profile } = useProfile(user?.id as string);
    const { mutate: updateProfile, isPending } = useUpdateProfile(user?.id as string);

    // Handler
    const handleProfileEdit = React.useCallback( (
        first_name: string,
        last_name: string,
        username: string,
        profile_image: string,
    ) => {
        try {
            updateProfile({
                id: user?.id,
                email: user?.email,
                created_at: user?.created_at,
                first_name,
                last_name,
                username,
                profile_image
            });

            Alert.alert(
                "Congratualations!",
                "Profile updated successfully.",
                [
                    {
                        text: "Edit",
                        onPress: () => {},
                        style: 'cancel'
                    },
                    {
                        text: "Go Back",
                        onPress: () => router.push("/dashboard"),
                        style: 'default'
                    }
                ]
            );
        }
        catch(err) {
            console.error("Profile update Error:", err)
            Alert.alert("Profile update failed!")
        }
    }, [user])

    return (
        <SafeAreaLayout>
            <KeyboardAvoidingViewLayout>

                {/* FORM */}
                <Formik
                    initialValues={{
                        first_name: profile?.first_name ?? "",
                        last_name: profile?.last_name ?? "",
                        username: profile?.username ?? "",
                        profile_image: profile?.profile_image ?? ""
                    }}
                    validationSchema={ProfileEditSchema}
                    onSubmit={ (values, {resetForm}) => {
                        handleProfileEdit(
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
                                    buttonTitle="Save"
                                    onSubmit={handleSubmit}
                                    isLoading={isPending}
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