import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Link } from 'expo-router'
import { useTheme } from '@/theme/ThemeContext'

const ForgotPasswordLink = () => {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <Link
                href="/auth/forgot-password"
                style={{
                    fontSize: 14,
                    color: colors.text //colors.plainTextLinkColor
                }}
            >Forgot Password?</Link>
        </View>
    );
}
export default ForgotPasswordLink;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "flex-end"
    }
});