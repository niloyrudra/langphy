import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '@/components/layouts/AuthLayout';
import AuthInput from '@/components/form-components/auth/AuthInput';
import ActionPrimaryButton from '@/components/form-components/ActionPrimaryButton';
import { toastError, toastLoading, toastSuccess } from '@/services/toast.service';
import { requestOtp, verifyOtp } from '@/services/auth.service';
import LangphyText from '@/components/text-components/LangphyText';
import { useTheme } from '@/theme/ThemeContext';
import { useNetwork } from '@/context/NetworkContext';

const OtpSchema = Yup.object().shape({
    otp: Yup.string().length(6, "Code must be 6 digits").required("Code is required"),
});

const OtpVerification = () => {
    const router = useRouter();
    const { colors } = useTheme();
    const { isOnline } = useNetwork();
    const { email, password } = useLocalSearchParams<{ email: string; password: string }>();
    const [loading, setLoading] = React.useState(false);
    const [resendCoolDown, setResendCoolDown] = React.useState(0);

    // Countdown timer for resend
    React.useEffect(() => {
        if (resendCoolDown <= 0) return;
        const t = setTimeout(() => setResendCoolDown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCoolDown]);

    const handleVerify = async (otp: string) => {
        if (!isOnline) {
            toastError("You're offline!");
            return;
        }
        const toastId = toastLoading("Verifying...");
        try {
            setLoading(true);
            const res = await verifyOtp(email, password, otp);
            if (res.status === 201) {
                toastSuccess("Account created!", { id: toastId });
                router.replace("/auth/login");
            } else {
                toastError("Verification failed.", { id: toastId });
            }
        } catch (err: any) {
            const msg = err?.response?.data?.errors?.[0]?.message ?? "Invalid code.";
            toastError(msg, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCoolDown > 0) return;
        try {
            await requestOtp(email, password); // reuse same service call
            toastSuccess("New code sent!");
            setResendCoolDown(60); // 60s coolDown
        } catch {
            toastError("Could not resend code.");
        }
    };

    return (
        <AuthLayout screenTitle="Check your email">
            <LangphyText style={[styles.subtitle, { color: colors.textSubColor }]}>
                We sent a 6-digit code to {email}
            </LangphyText>

            <Formik
                initialValues={{ otp: "" }}
                validationSchema={OtpSchema}
                onSubmit={async (values, { resetForm }) => {
                    await handleVerify(values.otp);
                    resetForm();
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <AuthInput
                            value={values.otp}
                            placeholderText="6-digit code"
                            inputMode="numeric"
                            handleBlur={handleBlur("otp")}
                            handleChange={handleChange("otp")}
                            error={errors.otp || null}
                            touched={touched.otp ? "true" : null}
                        />
                        <ActionPrimaryButton
                            buttonTitle="Verify Email"
                            onSubmit={handleSubmit}
                            isLoading={loading}
                        />
                    </View>
                )}
            </Formik>

            <LangphyText
                style={[styles.resend, { color: resendCoolDown > 0 ? colors.textSubColor : colors.primary }]}
                onPress={handleResend}
            >
                {resendCoolDown > 0 ? `Resend code in ${resendCoolDown}s` : "Resend code"}
            </LangphyText>
        </AuthLayout>
    );
};

export default OtpVerification;

const styles = StyleSheet.create({
    subtitle: { textAlign: "center", marginBottom: 24, fontSize: 14 },
    form: { flexDirection: "column", gap: 16 },
    resend: { textAlign: "center", marginTop: 20, fontSize: 14 },
});