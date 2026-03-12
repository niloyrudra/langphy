import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import LangphyText from '@/components/text-components/LangphyText';

const AcknowledgmentScreen = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>

        <LangphyText weight="extrabold" style={[, {color: colors.text}]}>Acknowledgment</LangphyText>
        <LangphyText style={[styles.date, {color: colors.text}]}>Effective Date: July 1, 2025</LangphyText>

        <LangphyText style={[styles.text, {color: colors.text}]}>
          The acknowledgement is structured in five formal sections, just the tools and communities that made Langphy possible.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>I. Mobile Application Layer</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          16 entries covering every significant Expo and React Native dependency, from the core runtime down to the Poppins typeface and Lottie animations.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>II. Microservices Backend</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          17 entries covering the full Node.js stack: Express, KafkaJS, Kafka itself, both database layers (pg/PostgreSQL and Mongoose/MongoDB), JWT infrastructure, Firebase, node-cron, and the monorepo toolchain.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>III. Artificial Intelligence and NLP</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          11 entries dedicated to the Python services, including a specific mention of the cold-start warm-up technique (the NumPy silent inference), Faster-Whisper, CTranslate2, spaCy, RQ, and Redis — all grounded in the actual implementation.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>IV. Infrastructure and Deployment</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          5 entries covering Docker's multi-stage build (with the specific detail about baking model weights), Kubernetes, Skaffold, NGINX Ingress, and EAS.
        </LangphyText>

        <LangphyText weight="bold" style={[styles.section, {color: colors.text}]}>V. Developer Communities</LangphyText>
        <LangphyText style={[styles.text, {color: colors.text}]}>
          5 entries acknowledging the Expo, React Native, Hugging Face, TypeScript, and Stack Overflow communities whose collective knowledge shaped the architecture.
        </LangphyText>

      </ScrollView>
    </SafeAreaLayout>
  )
}

export default AcknowledgmentScreen;

const styles = StyleSheet.create({
  flex: {flex:1},
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6
  },
  date: {
    fontSize: 14,
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
  }
});