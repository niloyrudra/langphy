import SafeAreaLayout from '@/components/layouts/SafeAreaLayout'
import LangphyText from '@/components/text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext'
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

const PrivacyPolicy = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={styles.container}>
        
        <LangphyText weight="extrabold" style={[styles.title, {color: colors.text}]}>Privacy Policy</LangphyText>
        <LangphyText style={[styles.date, {color: colors.text}]}>Effective Date: July 1, 2025</LangphyText>

        <LangphyText style={[styles.text, {color: colors.text}]}>
          This Privacy Policy explains how Langphy collects, uses, and protects
          your information when you use the app.
        </LangphyText>

        <LangphyText weight="bold" style={styles.section}>1. Information We Collect</LangphyText>

        <LangphyText weight="semibold" style={[styles.subTitle, {color: colors.text}]}>Account Information</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          When you create an account we collect your name, email address, and password.
          Passwords are stored securely in hashed form.
        </LangphyText>

        <LangphyText weight="semibold" style={[styles.subTitle, {color: colors.text}]}>Microphone and Speech Audio</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Langphy uses your device microphone for speech recognition exercises
          such as pronunciation practice. Audio is processed in real time and
          is not permanently stored unless required by a feature you choose to use.
        </LangphyText>

        <LangphyText weight="semibold" style={[styles.subTitle, {color: colors.text}]}>Usage Analytics</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Anonymous analytics may be collected including screens visited,
          session duration, and crash reports. This information helps improve
          the app experience.
        </LangphyText>

        <LangphyText weight="semibold" style={[styles.subTitle, {color: colors.text}]}>Locally Stored Data</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Learning progress, lesson data, and preferences are stored locally
          on your device using SQLite.
        </LangphyText>

        <LangphyText weight="bold" style={styles.section}>2. How We Use Information</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Your information may be used to create your account, provide language
          learning features, process speech input, improve app performance,
          and respond to support requests.
        </LangphyText>

        <LangphyText weight="bold" style={styles.section}>3. Data Security</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          We use industry-standard security practices including encrypted
          connections (HTTPS) and secure password storage. However, no
          system can guarantee absolute security.
        </LangphyText>

        <LangphyText weight="bold" style={styles.section}>4. Data Sharing</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Langphy does not sell or rent your personal information. Data may
          only be shared with service providers needed to operate the app
          or when required by law.
        </LangphyText>

        <LangphyText weight="bold" style={styles.section}>5. Data Retention</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Account data is kept while your account is active. You may request
          deletion of your account at any time.
        </LangphyText>

        <LangphyText weight="bold" style={styles.section}>6. Children's Privacy</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Langphy is not intended for children under 13 and does not knowingly
          collect personal information from them.
        </LangphyText>

        <LangphyText weight="bold" style={styles.section}>Contact</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Developer: Niloy Rudra{"\n"}
          Email: privacy@langphy.com{"\n"}
          Website: https://langphy.com
        </LangphyText>

      </ScrollView>
    </SafeAreaLayout>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#fff"
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
})