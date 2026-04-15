import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import SafeAreaLayout from '../layouts/SafeAreaLayout'
import LangphyText from '../text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext'
import ContactDetail from './ContactDetail'
import LangphyListItem from './_partials/LangphyListItem'
import Section from './_partials/Section'
import SubSection from './_partials/SubSection'
import Paragraph from './_partials/Paragraph'
import FooterNote from './_partials/FooterNote'
import ContactSection from './ContactSection'

const TermsAndConditionsContent = () => {
    const {colors} = useTheme();
    return (
        <SafeAreaLayout>
            <ScrollView style={styles.container}>

                <LangphyText weight="extrabold" style={[styles.title, {color: colors.text}]}>Terms of Service</LangphyText>
                <LangphyText style={[styles.date, {color: colors.text}]}>Effective Date: July 1, 2025</LangphyText>

                <Paragraph>
                    Please read these Terms of Service ('Terms') carefully before creating an account or using Langphy. By downloading, installing, registering for, or using the application, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to any part of these Terms, you must not use the application.
                </Paragraph>

                {/* 1 */}
                <Section title="1. About Langphy">
                    <Paragraph>
                        Langphy is a German language learning application for Android, developed and operated by Niloy Rudra (software development) and Kheya Nandi (product design), collectively referred to in these Terms as 'we', 'us', or 'our'. Langphy is an independent project and is not affiliated with, endorsed by, or connected to any educational institution, language certification authority, or government body.
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
                <Section title="2. Eligibility and Age Requirements">
                    <Paragraph>
                        You must meet the following requirements to use Langphy:
                    </Paragraph>

                    <LangphyListItem content="You must be at least 13 years of age." />
                    <LangphyListItem content="If you are between 13 and 17 years of age, you represent that a parent or legal guardian has reviewed and consented to these Terms on your behalf." />
                    <LangphyListItem content="You must have the legal capacity to enter into a binding agreement under the laws of your country of residence." />
                    <LangphyListItem content="Your use of the application must not be prohibited by any applicable law or regulation in your jurisdiction." />

                    <Paragraph>
                        If we become aware that a user under the age of 13 has created an account, we will take steps to delete that account and any associated data promptly.
                    </Paragraph>
                </Section>

                {/* 3 */}
                <Section title="3. Account Registration and Security">
                    <SubSection subTitle="3.1 Creating an Account">
                        <Paragraph>
                            To access the full functionality of Langphy, you must create an account using a valid email address and a password of your choosing. As part of registration, your email address will be verified through a one-time passcode (OTP) sent to the address you provide. You must complete this verification step before your account is created. We implemented this verification process to ensure the integrity of our user base and to protect you from unauthorised use of your email address.
                        </Paragraph>
                    </SubSection>

                    <SubSection subTitle="3.2 Accuracy of Information">
                        <Paragraph>
                            You agree to provide accurate, current, and complete information during registration and to keep your account information updated at all times. Providing false information, including a fictitious or another person's email address, is a violation of these Terms and may result in account suspension or termination.
                        </Paragraph>
                    </SubSection>

                    {/* 3 */}
                    <SubSection subTitle="3.3 Account Credentials Responsibility">
                        <Paragraph>
                            You are solely responsible for maintaining the confidentiality of your password and for all activity that occurs under your account. You agree to:
                        </Paragraph>

                        <LangphyListItem content="Choose a strong, unique password not used for other services."/>
                        <LangphyListItem content="Not share your login credentials with any third party."/>
                        <LangphyListItem content="Log out of your account when using a shared or public device."/>
                        <LangphyListItem content="Contact us immediately at support@langphy.com if you suspect unauthorised access to your account."/>

                        <Paragraph>
                            We will never ask for your password by email or through any channel other than the application's own secure password reset flow.
                        </Paragraph>
                    </SubSection>

                    <SubSection subTitle="3.4 Account Termination">
                        <Paragraph>
                            You may request deletion of your account at any time by contacting us at support@langphy.com. Upon receiving and verifying your request, your account and associated data will be deleted in accordance with the Privacy Policy. Deletion is irreversible. Your learning progress, streak records, vocabulary history, and profile information will not be recoverable after deletion.
                        </Paragraph>
                    </SubSection>
                </Section>

                {/* 4 */}
                <Section title="4. The Application — Free and Future Paid Features">
                    <SubSection subTitle="4.1 Free Tier">
                        <Paragraph>
                            At launch, Langphy is entirely free to use. All currently available lesson content, learning modalities, and features are accessible without payment. We do not display advertisements in the free version of the application.
                        </Paragraph>
                    </SubSection>

                    <SubSection subTitle="4.2 Future Paid Membership">
                        <Paragraph>
                            We plan to introduce an optional paid membership tier in a future version of the application. This paid tier will offer additional features, content, or capabilities beyond what is available in the free tier. The free tier will remain available, and access to currently free features will not be removed or restricted solely because a paid tier has been introduced.
                        </Paragraph>
                        <Paragraph>
                            When paid features are introduced, the following will apply:
                        </Paragraph>

                        <LangphyListItem content="Separate pricing terms, billing terms, and refund policies will be presented to you before you subscribe."/>
                        <LangphyListItem content="Subscription management and cancellation will be handled through the Google Play Store."/>
                        <LangphyListItem content="We will provide reasonable advance notice of any changes to the free tier that may affect your current experience."/>

                    </SubSection>
                </Section>

                {/* 5 */}
                <Section title="5. Permitted and Prohibited Uses">
                    <SubSection subTitle="5.1 Permitted Use">
                        <Paragraph>
                            Langphy is licensed to you for your personal, non-commercial language learning purposes only. You may use the application on any Android device that you own or control and that meets the technical requirements of the application.
                        </Paragraph>
                    </SubSection>

                    <SubSection subTitle="5.2 Prohibited Conduct">
                        <Paragraph>
                            You agree not to, and agree not to permit or assist any third party to:
                        </Paragraph>

                        <LangphyListItem content="Copy, reproduce, modify, distribute, sell, sublicense, or create derivative works of any part of the application or its content." />
                        <LangphyListItem content="Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the application." />
                        <LangphyListItem content="Access the application's backend systems, APIs, or databases by any means other than through the application's official interface." />
                        <LangphyListItem content="Use automated tools, bots, scripts, or scrapers to interact with or collect data from the application." />
                        <LangphyListItem content="Interfere with, disrupt, or attempt to overload the application's servers or infrastructure." />
                        <LangphyListItem content="Impersonate any person or entity or misrepresent your affiliation with any person or entity." />
                        <LangphyListItem content="Upload, transmit, or store any harmful, offensive, defamatory, or unlawful content." />
                        <LangphyListItem content="Attempt to gain unauthorized access to any other user's account or data." />
                        <LangphyListItem content="Use the application in any jurisdiction where such use is prohibited by applicable law." />
                    </SubSection>
                </Section>

                {/* 6 */}
                <Section title="6. Intellectual Property">
                    <Paragraph>
                        Langphy includes speech-based learning exercises that require access to your device's microphone. By enabling microphone access when prompted:
                    </Paragraph>

                    <LangphyListItem content="You grant Langphy permission to capture audio input from your device's microphone solely for processing your spoken German responses within the context of learning exercises." />
                    <LangphyListItem content="Audio recordings are transmitted over an encrypted connection to a speech processing service and are not permanently stored after each exercise is complete." />
                    <LangphyListItem content="Audio data is used exclusively to evaluate pronunciation accuracy and provide learning feedback. It is not used for advertising, profiling, or any commercial purpose." />
                    <LangphyListItem content="You may revoke microphone access at any time through your Android device's application settings. Doing so will disable speech-based exercises but will not affect other learning features." />
                
                    <Paragraph>
                        Speech processing is conducted using the Whisper open-source model hosted on our own infrastructure. No audio data is sent to third-party AI providers.
                    </Paragraph>
                </Section>

                {/* 7 */}
                <Section title="7. Intellectual Property">
                    <SubSection subTitle="7.1 Ownership">
                        <Paragraph>
                            All content within Langphy, including but not limited to lesson materials, German language content, audio recordings, graphics, illustrations, user interface design, application code, and data structures, is the intellectual property of Niloy Rudra and Kheya Nandi, or their respective licensors, and is protected by applicable copyright and intellectual property laws.
                        </Paragraph>
                    </SubSection>

                    <SubSection subTitle="7.2 License Grant">
                        <Paragraph>
                            Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the application solely for your personal language learning purposes. This license does not include any right to sublicense, sell, reproduce, or create derivative works.
                        </Paragraph>
                    </SubSection>

                    <SubSection subTitle="7.3 Feedback">
                        <Paragraph>
                            If you provide feedback, bug reports, suggestions, or ideas regarding Langphy, you grant us a non-exclusive, royalty-free, perpetual, irrevocable right to use such feedback for any purpose, including improving the application, without any obligation to compensate you.
                        </Paragraph>
                    </SubSection>
                </Section>

                {/* 8 */}
                <Section title="8. User Content and Data">
                    <Paragraph>
                        Langphy does not support public user-generated content. Your data is governed by the Privacy Policy.
                    </Paragraph>
                </Section>

                {/* 9 */}
                <Section title="9. Third-Party Services">
                    <Paragraph>
                        Langphy relies on certain third-party services to deliver specific functionality. These include infrastructure providers for hosting, a speech processing service for pronunciation evaluation, and an email delivery service for account verification communications. We do not control these third-party services and are not responsible for their availability, terms, or independent practices. Their use is governed by their own terms and privacy policies.
                    </Paragraph>
                </Section>

                {/* 10 */}
                <Section title="10. Disclaimer of Warranties">
                    <Paragraph>
                        Langphy is provided 'as is' and 'as available' without warranties of any kind, either express or implied. We do not warrant that:
                    </Paragraph>

                    <LangphyListItem content="The application will be available at all times, free from interruption, or free from technical errors." />
                    <LangphyListItem content="The language learning content will guarantee any specific learning outcome, level of fluency, or examination result." />
                    <LangphyListItem content="The application will be compatible with all Android device configurations or operating system versions." />
                    <LangphyListItem content="Any defects in the application will be corrected within any specific timeframe." />

                    <Paragraph>
                        Language learning outcomes depend on many individual factors. Langphy makes no representations regarding guaranteed fluency or proficiency outcomes.
                    </Paragraph>
                </Section>

                {/* 11 */}
                <Section title="11. Limitation of Liability">
                    <Paragraph>
                        To the fullest extent permitted by applicable law, Niloy Rudra and Kheya Nandi shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages arising from your use of or inability to use the application. This includes, without limitation, loss of learning progress, loss of streak data, or data loss due to device failure or synchronisation errors.
                    </Paragraph>

                    <Paragraph>
                        Our total cumulative liability to you for any claim arising from these Terms or your use of the application shall not exceed the amount you paid, if any, for the application or any in-app purchases in the twelve months preceding the claim. For users on the free tier, this amount is zero, but applicable local consumer protection laws may grant you additional rights.
                    </Paragraph>
                </Section>

                {/* 12 */}
                <Section title="12. Indemnification">
                    <Paragraph>
                        You agree to defend, indemnify, and hold harmless Niloy Rudra and Kheya Nandi from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from: (a) your use of the application in violation of these Terms; (b) your violation of any applicable law or the rights of a third party; or (c) any information you submit or transmit through the application.
                    </Paragraph>
                </Section>

                {/* 13 */}
                <Section title="13. Suspension and Termination">
                    <Paragraph>
                        We reserve the right to suspend or permanently terminate your access to the application at any time, with or without notice, for violation of these Terms, conduct harmful to other users or the application, or for security or technical reasons. Upon termination, your right to use the application ceases immediately. Provisions of these Terms that by their nature should survive termination — including intellectual property, disclaimers, limitation of liability, and governing law — will continue to apply.
                    </Paragraph>
                </Section>

                {/* 14 */}
                <Section title="14. Changes to These Terms">
                    <Paragraph>
                        We may revise these Terms from time to time, including when we introduce paid features, add new functionality, or respond to legal requirements. When we make material changes, we will update the effective date and make reasonable efforts to notify you through the application or by email. Your continued use of the application after any changes constitutes your acceptance of the updated Terms.
                    </Paragraph>
                </Section>

                {/* 15 */}
                <Section title="15. Governing Law and Dispute Resolution">
                    <Paragraph>
                        These Terms are governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Any dispute arising under these Terms should first be addressed by contacting us at support@langphy.com. If the dispute cannot be resolved informally within thirty (30) days, it shall be subject to the exclusive jurisdiction of the competent courts of Bangladesh.
                    </Paragraph>
                </Section>

                {/* 16 */}
                <Section title="16. General Provisions">
                    <LangphyListItem content="Entire Agreement: These Terms, together with the Privacy Policy, constitute the entire agreement between you and us regarding your use of Langphy." />
                    <LangphyListItem content="Severability: If any provision is found unenforceable, the remaining provisions continue in full force." />
                    <LangphyListItem content="No Waiver: Our failure to enforce any right does not constitute a waiver of that right." />
                    <LangphyListItem content="Assignment: You may not assign your rights under these Terms. We may assign our rights and obligations freely." />
                    <LangphyListItem content="Language: These Terms are written in English. In the event of any inconsistency arising from translation, the English version prevails." />
                </Section>

                {/* 17 */}
                <Section title="17. Contact">
                    <Paragraph>
                        For questions or concerns regarding these Terms:
                    </Paragraph>
                    {/* <ContactDetail /> */}
                    <ContactSection />
                </Section>

                <FooterNote>
                    Langphy is an independent application. It is not affiliated with any language certification authority, educational institution, or government body. Last reviewed: July 1, 2025.
                </FooterNote>

            </ScrollView>
        </SafeAreaLayout>
    );
}

export default TermsAndConditionsContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 6
    },
    date: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20
    },
    section: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 8
    },
    subSection: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 8
    }
});