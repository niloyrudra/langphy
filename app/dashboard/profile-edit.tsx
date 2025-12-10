import { View, Text } from 'react-native'
import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import KeyboardAvoidingViewLayout from '@/components/layouts/KeyboardAvoidingViewLayout';
import { Formik } from 'formik';
import * as Yup from "yup";
import TextInputComponent from '@/components/form-components/TextInputComponent';
// import SIZES from '@/constants/size';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { router } from 'expo-router';

const ProfileEditSchema = Yup.object().shape({
    userDisplayName: Yup.string().min( 2, "Name must be at least 2 characters" ), // .required("Name is required"),
    email: Yup.string().email("Invalid email"), // .required("Email is required"),
    currentPassword: Yup.string().min(6, "Password must be at least 6 characters"), // .required("Current Password is required"),
    NewPassword: Yup.string().min(6, "Password must be at least 6 characters") // .required("New Password is required"),
});

const ProfileEditScreen = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    // Handler
    const handleProfileEdit = async (
        displayName: string,
        email: string,
        currentPassword:
        string, newPassword: string
    ) => {

        // Get back to Dashboard
        router.push('/dashboard');
    }

    return (
        <SafeAreaLayout>
            <KeyboardAvoidingViewLayout>

                {/* FORM */}
                <Formik
                    initialValues={{ userDisplayName: "", email: "", currentPassword: "", newPassword: "" }}
                    validationSchema={ProfileEditSchema}
                    onSubmit={(values) => {
                        handleProfileEdit(
                            values.userDisplayName,
                            values.email,
                            values.currentPassword,
                            values.newPassword
                        );
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View
                            style={{
                                gap: 20,
                                // width: SIZES.screenWidth
                            }}
                        >

                            <TextInputComponent
                                placeholder="Your Full Name"
                                inputMode="text"
                                value={values.userDisplayName}
                                onChange={handleChange("userDisplayName")}
                                onBlur={handleBlur("userDisplayName")}
                            />
                            {errors.userDisplayName && touched.userDisplayName && <Text>{errors.userDisplayName}</Text>}

                            <TextInputComponent
                                placeholder="Email"
                                inputMode="email"
                                value={values.email}
                                onChange={handleChange("email")}
                                onBlur={handleBlur("email")}
                            />
                            {errors.email && touched.email && <Text>{errors.email}</Text>}

                            <TextInputComponent
                                placeholder="Current Password"
                                isPassword={true}
                                value={values.currentPassword}
                                onChange={handleChange("currentPassword")}
                                onBlur={handleBlur("currentPassword")}
                            />
                            {errors.currentPassword && touched.currentPassword && <Text>{errors.currentPassword}</Text>}
                            
                            <TextInputComponent
                                placeholder="New Password"
                                isPassword={true}
                                value={values.newPassword}
                                onChange={handleChange("newPassword")}
                                onBlur={handleBlur("newPassword")}
                            />
                            {errors.newPassword && touched.newPassword && <Text>{errors.newPassword}</Text>}

                            {/* Submit Button */}
                            <ActionPrimaryButton
                                buttonTitle="Create Account"
                                onSubmit={handleSubmit}
                                isLoading={loading}
                            />
                        
                        </View>
                    )}
                </Formik>
            
            </KeyboardAvoidingViewLayout>
        </SafeAreaLayout>
    );
}

export default ProfileEditScreen;