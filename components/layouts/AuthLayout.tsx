import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeAreaLayout from './SafeAreaLayout';
import KeyboardAvoidingViewLayout from './KeyboardAvoidingViewLayout';
import AuthTopBannerImage from '../form-components/auth/AuthTopBannerImage';
import FormHeaderTitle from '../form-components/auth/FormHeaderTitle';
import { useTheme } from '@/theme/ThemeContext';

interface AuthLayoutProps {
    screenTitle: string | null;
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({screenTitle, children}) => {
    const {colors} = useTheme();
    return (
        <SafeAreaLayout>
            <KeyboardAvoidingViewLayout>

                <ScrollView
                    // style={{ flex:1 }}
                    contentContainerStyle={{flex:1}}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={true}
                >

                    <View style={[styles.container, {backgroundColor: colors.background}]}>

                        {/* Banner Component */}
                        <AuthTopBannerImage />

                        {/* Title Component */}
                        {screenTitle && (<FormHeaderTitle title={screenTitle} />)}

                        {children && children}

                    </View>

                </ScrollView>

            </KeyboardAvoidingViewLayout>
        </SafeAreaLayout>
    );
}

export default AuthLayout

const styles = StyleSheet.create({
    container: {flex: 1}
})