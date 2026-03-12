import SafeAreaLayout from '@/components/layouts/SafeAreaLayout'
import LangphyText from '@/components/text-components/LangphyText'
import { useTheme } from '@/theme/ThemeContext'
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

const TermsOfService = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={styles.container}>

        <LangphyText weight="extrabold" style={[, {color: colors.text}]}>Terms of Service</LangphyText>
        <LangphyText style={[styles.date, {color: colors.text}]}>Effective Date: July 1, 2025</LangphyText>

        <LangphyText style={[styles.text, {color: colors.text}]}>
          By downloading or using Langphy, you agree to these Terms of Service.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>1. About the App</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Langphy is a German language learning app that provides interactive
          lessons, speech exercises, vocabulary practice, and learning tools.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>2. Eligibility</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          You must be at least 13 years old to use the app. Users under 18 must
          have permission from a parent or legal guardian.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>3. User Accounts</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          To access some features you must create an account with a valid
          email address and password. You are responsible for maintaining
          the confidentiality of your account credentials.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>4. Permitted Use</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          The app may only be used for personal, non-commercial language
          learning purposes. You may not copy, modify, distribute,
          reverse-engineer, or attempt to access the app’s source code
          or backend systems.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>5. Microphone Access</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          The app may request microphone permission for speech recognition
          exercises. Disabling microphone access will prevent these features
          from working.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>6. Intellectual Property</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          All content in Langphy including lessons, audio, graphics, and
          software code is protected by intellectual property laws and
          remains the property of the developer.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>7. Disclaimer</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          The app is provided "as is" without guarantees of uninterrupted
          operation or specific learning results.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>8. Limitation of Liability</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          The developer is not responsible for indirect or consequential
          damages resulting from use of the app.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>9. Termination</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Accounts may be suspended or terminated if these terms are violated.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>10. Governing Law</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          These Terms are governed by the laws of Bangladesh.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>Contact</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          Developer: Niloy Rudra{"\n"}
          Email: support@langphy.com{"\n"}
          Website: https://langphy.com
        </LangphyText>

      </ScrollView>
    </SafeAreaLayout>
  )
}

export default TermsOfService

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
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
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444"
  }
})