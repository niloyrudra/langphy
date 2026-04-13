import { ScrollView, StyleSheet, View } from 'react-native'
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
                {/*
                  * contentContainerStyle must NOT have flex:1
                  * flex:1 prevents ScrollView from scrolling — the content
                  * fills exactly the container height and never overflows.
                  * Remove it so the ScrollView can actually scroll when the
                  * keyboard pushes content below the visible area.
                  *
                  * flexGrow:1 + justifyContent:center centres short content
                  * while still allowing taller content (keyboard open) to scroll.
                  */}
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
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
    scrollContent: {
        flexGrow: 1,        // allows scroll when content overflows
    },
    container: {
        flex: 1,
        justifyContent: "center"
    }
})