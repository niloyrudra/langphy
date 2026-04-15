import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import SafeAreaLayout from '../layouts/SafeAreaLayout'
import LangphyText from '../text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext'
import ContactDetail from './ContactDetail'
import Paragraph from './_partials/Paragraph'
import Section from './_partials/Section'
import SubSection from './_partials/SubSection'
import LangphyListItem from './_partials/LangphyListItem'
import FooterNote from './_partials/FooterNote'
import ContactSection from './ContactSection'

const PrivacyPolicyContent = () => {
    const {colors} = useTheme();
    return (
        <SafeAreaLayout>
            <ScrollView style={styles.container}>
                
                <LangphyText weight="extrabold" style={[styles.title, {color: colors.text}]}>Privacy Policy</LangphyText>
                <LangphyText style={[styles.date, {color: colors.text}]}>Effective Date: July 1, 2025</LangphyText>

                <Paragraph>
                    This Privacy Policy explains how Langphy, developed and operated by Niloy Rudra and Kheya Nandi ('we', 'us', or 'our'), collects, uses, stores, protects, and shares your personal information when you use the Langphy Android application ('App'). By using the App, you agree to the practices described in this policy.
                </Paragraph>

                {/* 1 */}
                <Section title="1. Who This Policy Applies To">
                    <Paragraph>
                        This policy applies to all users of the Langphy Android application, regardless of geographic location. Users in the European Economic Area (EEA), United Kingdom, or other jurisdictions with specific data protection laws may have additional rights described in Section 10.
                    </Paragraph>

                    <Paragraph>
                        Langphy provides interactive German language lessons across multiple modalities, including reading comprehension, listening practice, speech recognition and pronunciation assessment, vocabulary acquisition, quiz-based review, and writing practice. The application operates with an offline-first architecture, meaning lesson content is stored locally on your device and synchronized to secure backend servers when an internet connection is available.
                    </Paragraph>

                    <SubSection subTitle="1.1 Current Availability">
                        <Paragraph>
                            At the time of launch, Langphy is available as a free application on the Android platform via the Google Play Store. We intend to expand availability to additional platforms and introduce optional paid membership tiers with additional features in future versions of the application. When paid features become available, separate terms governing those features will be presented to you at that time.
                        </Paragraph>
                    </SubSection>
                </Section>

                {/* 2 */}
                <Section title="2. Information We Collect">
                    <SubSection subTitle="2.1 Information You Provide Directly">
                        <Paragraph>When you register and use Langphy, you provide:</Paragraph>

                        <LangphyListItem content="Email address — used for account creation, OTP-based email verification, and account-related communications." />
                        <LangphyListItem content="Password — stored in irreversibly hashed form. Your password is never stored or transmitted in plain text." />
                        <LangphyListItem content="Profile information — optionally, your first name, last name, username, and a profile image." />
                    </SubSection>

                    <SubSection subTitle="2.2 Learning and Activity Data">
                        <Paragraph>
                            As you use the App, the following data is generated and stored to power your learning experience:
                        </Paragraph>

                        <LangphyListItem content="Lesson completion records — which lessons you have completed, your scores, and time spent per lesson." />
                        <LangphyListItem content="Session performance data — accuracy and duration per learning session (reading, listening, speaking, writing, quiz, practice)." />
                        <LangphyListItem content="Streak data — your daily learning consistency, including current streak count, longest streak, and last activity date." />
                        <LangphyListItem content="Vocabulary data — German words and phrases you have studied, including their part of speech and English meanings." />
                        <LangphyListItem content="Learning progress — completion percentage across units and lesson types." />

                        <Paragraph>
                            This data is first stored locally on your Android device in a SQLite database (offline-first), then synchronized to our secure backend servers when an internet connection is available.
                        </Paragraph>
                    </SubSection>

                    <SubSection subTitle="2.3 Speech and Audio Data">
                        <Paragraph>When you use the speech recognition features:</Paragraph>

                        <LangphyListItem content="Your device microphone captures audio of your spoken German." />
                        <LangphyListItem content="This audio is transmitted over an encrypted (TLS) connection to our own speech processing infrastructure, which uses the Whisper open-source model. No audio is sent to third-party AI companies." />
                        <LangphyListItem content="Audio is processed to evaluate pronunciation and generate feedback scores (similarity, pronunciation score, transcription)." />
                        <LangphyListItem content="Audio recordings are not permanently stored after the exercise is complete. Only the derived result data is retained as part of your lesson record." />
                        <LangphyListItem content="Audio data is never used for advertising, voice profiling, or any purpose other than delivering the learning exercise." />
                    </SubSection>

                    <SubSection subTitle="2.4 Technical and Device Data">
                        <Paragraph>
                            We may collect limited technical data through our own infrastructure, including:
                        </Paragraph>

                        <LangphyListItem content="Device operating system version and app version — for compatibility and debugging." />
                        <LangphyListItem content="Error and crash logs — to identify and resolve technical issues." />
                    </SubSection>

                    <SubSection subTitle="2.5 Information We Do Not Collect">
                        <Paragraph>Langphy does not collect:</Paragraph>

                        <LangphyListItem content="Precise geolocation or GPS data." />
                        <LangphyListItem content="Your device contacts, call logs, or messages." />
                        <LangphyListItem content="Biometric data (speech audio is transient and not retained)." />
                        <LangphyListItem content="Payment information (the App is currently free of charge)." />
                        <LangphyListItem content="Browsing history or data from other apps on your device." />
                        <LangphyListItem content="Advertising identifiers." />
                    </SubSection>
                </Section>

                {/* 3 */}
                <Section title="3. How We Use Your Information">
                    <Paragraph>
                        We use the information collected solely for the following purposes:
                    </Paragraph>

                    <LangphyListItem content="Account creation and authentication — to create, manage, and secure your account." />
                    <LangphyListItem content="Email verification — to verify your identity during registration via one-time passcode." />
                    <LangphyListItem content="Learning personalization — to track progress, maintain streaks, adapt content to your history, and provide performance feedback." />
                    <LangphyListItem content="Speech assessment — to evaluate pronunciation and provide real-time exercise feedback." />
                    <LangphyListItem content="Application improvement — to identify bugs, monitor performance, and improve content and user experience." />
                    <LangphyListItem content="Transactional communications — to send account-related emails such as OTP codes and password reset instructions. We do not send unsolicited marketing emails." />
                </Section>

                {/* 4 */}
                <Section title="4. Legal Basis for Processing (GDPR)">
                    <Paragraph>
                        For users in the EEA or UK, we process personal data under the following GDPR legal bases:
                    </Paragraph>

                    <LangphyListItem content="Contract performance (Art. 6(1)(b)): Processing necessary to create and manage your account and deliver the service." />
                    <LangphyListItem content="Legitimate interests (Art. 6(1)(f)): Processing for application security, fraud prevention, and internal performance monitoring." />
                    <LangphyListItem content="Consent (Art. 6(1)(a)): Processing of microphone/audio data for speech exercises, which you can withdraw at any time via your device settings." />
                </Section>

                {/* 5 */}
                <Section title="5. Data Storage, Retention, and Security">
                    <SubSection subTitle="5.1 Where Data Is Stored">
                        <LangphyListItem content="On your device: Lesson data, progress, settings, vocabulary, and event queues are stored in a local SQLite database. This enables offline access." />
                        <LangphyListItem content="On our servers: Account information and synchronized learning data are stored in PostgreSQL databases on a Kubernetes-managed cloud infrastructure. All data is encrypted in transit (TLS) and encrypted at rest." />
                    </SubSection>

                    <SubSection subTitle="5.2 How Long We Keep Your Data">
                        <LangphyListItem content="Account data (email, profile): Retained until you delete your account." />
                        <LangphyListItem content="Learning data (progress, streaks, performance, and vocabulary): Retained until you delete your account." />
                        <LangphyListItem content="Speech audio: Not retained — discarded immediately after processing." />
                        <LangphyListItem content="OTP verification codes: Deleted immediately after use or after a 10-minute expiry." />
                        <LangphyListItem content="Inactive accounts: We may delete accounts inactive for an extended period with reasonable prior notice." />
                    </SubSection>

                    <SubSection subTitle="5.3 Security Measures">
                        <Paragraph>We implement the following protections:</Paragraph>

                        <LangphyListItem content="Passwords are hashed using a secure one-way algorithm before storage." />
                        <LangphyListItem content="All client-server communication is encrypted using TLS." />
                        <LangphyListItem content="Database access is restricted through role-based access controls." />
                        <LangphyListItem content="Our event-driven backend architecture includes idempotency controls to prevent duplicate data writes." />
                        <LangphyListItem content="Kafka message queues include deduplication guards to ensure data integrity." />

                        <Paragraph>
                            No system is entirely immune to security threats. We encourage you to use a strong, unique password and to contact us immediately at support@langphy.com if you believe your account has been compromised.
                        </Paragraph>
                    </SubSection>
                </Section>

                {/* 6 */}
                <Section title="6. Data Sharing and Disclosure">
                    <Paragraph>
                        We do not sell, rent, trade, or share your personal data with third parties for commercial or marketing purposes. Data is shared only in the following limited circumstances:
                    </Paragraph>

                    <LangphyListItem content="Infrastructure providers: Our hosting providers may process data as part of delivering the underlying technical service. They are contractually restricted from using your data for their own purposes." />
                    <LangphyListItem content="Email delivery (Resend): Your email address is shared with our email delivery provider solely to send you transactional emails such as OTP codes and account notifications." />
                    <LangphyListItem content="Legal obligations: We may disclose data if required by law, court order, or legitimate governmental authority." />
                    <LangphyListItem content="Business transfer: In the event of a merger or acquisition, data may transfer as part of that transaction, with prior notice to you." />
                </Section>

                {/* 7 */}
                <Section title="7. Future Paid Features and Billing">
                    <Paragraph>
                        Langphy is currently free. When we introduce optional paid membership features, any payment processing will be handled entirely by the Google Play Store's billing infrastructure. We will not directly collect or store your payment card information. Any data collected in connection with a subscription will be governed by a supplementary privacy notice presented at the time of subscription.
                    </Paragraph>
                </Section>

                {/* 8 */}
                <Section title="8. Cookies and Local Storage">
                    <Paragraph>
                        Langphy uses local device storage (SQLite) to store your learning data for offline functionality. This is essential to the core functionality of the App and cannot be disabled independently without uninstalling the application. This is not browser-based cookie tracking; it is a technical requirement of the offline-first architecture.
                    </Paragraph>
                </Section>

                {/* 9 */}
                <Section title="9. Children's Privacy">
                    <Paragraph>
                        Langphy is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has created an account without your consent, please contact us at support@langphy.com and we will promptly delete the information.
                    </Paragraph>
                </Section>

                {/* 10 */}
                <Section title="10. Your Rights and Choices">
                    <Paragraph>Regardless of your location, you have the following rights:</Paragraph>

                    <LangphyListItem content="Access: Request a copy of the personal data we hold about you." />
                    <LangphyListItem content="Correction: Correct inaccurate data through your in-app profile settings or by contacting us." />
                    <LangphyListItem content="Deletion: Request deletion of your account and all associated data from in-app without emailing us at support@langphy.com." />
                    <LangphyListItem content="Data portability: Request a copy of your learning data in a structured format." />
                    <LangphyListItem content="Withdraw consent: Revoke microphone access at any time through Android system settings." />

                    <Paragraph>
                        Users in the EEA or UK additionally have the right to object to processing, restrict processing, and lodge a complaint with their national data protection authority. We will respond to rights requests within 30 days.
                    </Paragraph>
                </Section>

                {/* 11 */}
                <Section title="11. Additional Rights for EEA and UK Users">
                    <LangphyListItem content="Object to processing" />
                    <LangphyListItem content="Restrict processing" />
                    <LangphyListItem content="Lodge complaints with authorities" />
                </Section>

                {/* 12 */}
                <Section title="12. International Data Transfers">
                    <Paragraph>
                        Our backend infrastructure may be hosted on servers located in different countries. Where data is transferred internationally, we take steps to ensure it is protected to a standard equivalent to that required under applicable data protection laws.
                    </Paragraph>
                </Section>

                {/* 13 */}
                <Section title="13. Changes to This Privacy Policy">
                    <Paragraph>
                        We may update this Privacy Policy over time, including when we introduce paid features or change our data practices. We will update the effective date and provide reasonable notice of material changes through the application or by email. Continued use of the App after changes constitutes acceptance of the updated policy.
                    </Paragraph>
                </Section>


                <Section title="14. Contact">
                    <Paragraph>For privacy-related questions, requests, or concerns:</Paragraph>
                    {/* <ContactDetail /> */}
                    <ContactSection />
                </Section>

                <FooterNote>
                    Last reviewed: July 1, 2025. Langphy is an independent application not affiliated with any advertising network, language authority, or government body.
                </FooterNote>

            </ScrollView>
        </SafeAreaLayout>
    );
}

export default PrivacyPolicyContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 6
    },
    date: {
        fontSize: 14,
        // color: "#666",
        marginBottom: 20
    },
    section: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 8
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
        // color: "#444",
        marginTop: 6
    }
});