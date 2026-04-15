import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import LangphyText from '@/components/text-components/LangphyText';
import Section from '@/components/contents/_partials/Section';
import Paragraph from '@/components/contents/_partials/Paragraph';
import SubSection from '@/components/contents/_partials/SubSection';
import LangphyListItem from '@/components/contents/_partials/LangphyListItem';
import ContactDetail from '@/components/contents/ContactDetail';
import FooterNote from '@/components/contents/_partials/FooterNote';
import ContactSection from '@/components/contents/ContactSection';

const AcknowledgmentScreen = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={styles.container}>
          
          <LangphyText weight="extrabold" style={[styles.title, {color: colors.text}]}>Disclaimer & Acknowledgment</LangphyText>
          <LangphyText style={[styles.date, {color: colors.text}]}>Effective Date: July 1, 2025 | Version 1.0</LangphyText>

          <Paragraph>
            This Disclaimer and Acknowledgment supplements the Terms of Service and Privacy Policy of Langphy. It sets out important limitations and clarifications users should understand before relying on the application or its content for any purpose beyond personal language learning.
          </Paragraph>

          {/* 1 */}
          <Section title="1. About the Application and Its Team">
              <Paragraph>
                Langphy is an independent German language learning application developed by Niloy Rudra (software development) and Kheya Nandi (product design). It is an independent project with no institutional affiliation, no external investors, and no connection to any language certification authority.
              </Paragraph>

              <Paragraph>
                At the time of this writing, Langphy is available exclusively on Android and is provided free of charge. We intend to register a formal business entity in the future. In the meantime, all responsibility for the application rests with the individual developers named above.
              </Paragraph>
          </Section>

          {/* 2 */}
          <Section title="2. Educational Disclaimer">
              <SubSection subTitle="2.1 No Guarantee of Language Proficiency">
                  <Paragraph>
                    Langphy is a supplementary tool designed to support German language learning. We make no representation or guarantee regarding any specific level of language proficiency, fluency, or skill acquisition as a result of using the application. Language learning is a complex, deeply individual process influenced by many factors, including:
                  </Paragraph>

                  <LangphyListItem content="Prior language learning experience and native language background." />
                  <LangphyListItem content="Time invested and consistency of daily practice." />
                  <LangphyListItem content="Exposure to German outside the application (media, conversation, travel)." />
                  <LangphyListItem content="Individual cognitive learning style and memory retention." />
                  <LangphyListItem content="The specific vocabulary and grammar areas the learner focuses on." />
              </SubSection>

              <SubSection subTitle="2.2 Not a Substitute for Formal Education">
                  <Paragraph>
                    Langphy is not a substitute for formal German language instruction from a qualified teacher or accredited educational institution. It is intended to complement, not replace, structured education. Langphy does not provide preparation for, nor guarantee success in, any formal language examination, including but not limited to Goethe-Institute examinations (A1 through C2), TELC, TestDaF, DSH, or any other recognized language qualification.
                  </Paragraph>
              </SubSection>

              <SubSection subTitle="2.3 Content Accuracy">
                  <Paragraph>
                    We make every reasonable effort to ensure the accuracy of the German language content, grammar explanations, vocabulary, and example sentences in the application. However, we cannot guarantee that all content is entirely free from error. German has regional variations across Germany, Austria, and Switzerland, and certain usages may differ across communities. If you identify any content error or inaccuracy, please report it to support@langphy.com.
                  </Paragraph>
              </SubSection>
          </Section>

          {/* 3 */}
          <Section title="3. Speech Recognition Disclaimer">
            <SubSection subTitle='3.1 Limitations of Automated Assessment'>
              <Paragraph>
                Langphy's speech recognition and pronunciation scoring features rely on automated technology (the Whisper model). This technology has inherent limitations:
              </Paragraph>

              <LangphyListItem content="It may not accurately recognize all accents, non-native speech patterns, or strong regional dialects." />
              <LangphyListItem content="Background noise, microphone quality, distance from the microphone, and speaking volume can significantly affect recognition accuracy." />
              <LangphyListItem content="The similarity and pronunciation scores are algorithmic estimates, not objective assessments by a language professional." />
              <LangphyListItem content="The feedback generated is automated and has not been reviewed or validated by a qualified language teacher, speech therapist, or linguist." />
            </SubSection>

            <SubSection subTitle="3.2 Not a Professional Assessment">
              <Paragraph>
                Scores and feedback provided by Langphy's speech features are intended for educational motivation and self-guided practice only. They do not constitute a professional linguistic, academic, or occupational assessment and should not be used for any formal, legal, or professional evaluation purpose.
              </Paragraph>
            </SubSection>

          </Section>

          {/* 4 */}
          <Section title="4. Technical Disclaimer">
            <SubSection subTitle="4.1 Service Availability">
              <Paragraph>
                Langphy is provided on an 'as available' basis. We do not guarantee uninterrupted availability. Planned maintenance, software defects, server outages, or third-party service failures may cause temporary unavailability of some or all features.
              </Paragraph>
            </SubSection>

            <SubSection subTitle="4.2 Offline Functionality">
              <Paragraph>
                Langphy is designed with an offline-first architecture. Most lesson content can be accessed without an internet connection. However, the following features require connectivity:
              </Paragraph>

              <LangphyListItem content="Speech recognition and pronunciation assessment." />
              <LangphyListItem content="Account registration, login, and password reset." />
              <LangphyListItem content="OTP email verification." />
              <LangphyListItem content="Synchronization of learning progress to our servers." />
              <LangphyListItem content="Fetching updated lesson content." />

              <Paragraph>
                In offline mode, progress is stored locally and synchronized when connectivity is restored. Data stored only on your device may be permanently lost if you uninstall the application, reset your device, or experience device failure before synchronization has occurred. We strongly recommend keeping the application updated and connected to the internet regularly to prevent data loss.
              </Paragraph>
            </SubSection>

            <SubSection subTitle="4.3 Android-Only Platform">
              <Paragraph>
                Langphy is currently available exclusively on Android. It has not been tested on iOS, web browsers, desktop platforms, or other operating systems. We make no representation that the application will function on any platform other than Android. Future availability on other platforms is planned but not guaranteed.
              </Paragraph>
            </SubSection>

            <SubSection subTitle="4.4 Device Compatibility">
              <Paragraph>
                Performance may vary across Android device models, screen sizes, hardware specifications, and Android OS versions. We do not guarantee compatibility with rooted devices, devices running custom or modified Android versions, or devices that have been significantly altered from their factory configuration.
              </Paragraph>
            </SubSection>

            <SubSection subTitle="4.5 Data Loss">
              <Paragraph>
                Despite reasonable technical precautions, data loss can occur due to software bugs, synchronization failures, device failure, or other unforeseen events. We are not liable for the loss of learning progress, streak data, vocabulary records, or any other user data. Users are encouraged to ensure regular synchronization by maintaining an active internet connection.
              </Paragraph>
            </SubSection>

          </Section>

          {/* 5 */}
          <Section title="5. Free Application — Advertising Included">
            <Paragraph>
              Langphy is currently free to use and supported by advertising. The application may display third-party advertisements provided by external ad networks (such as Google AdMob or similar providers).
            </Paragraph>
            <Paragraph>
              These advertising partners may process limited information—such as device identifiers, approximate location, and interaction data—to provide, personalize, and measure advertisements. This processing is carried out in accordance with the privacy policies of the respective ad providers.
            </Paragraph>
            <Paragraph>
              Langphy does not sell your personal data to advertisers. We only work with advertising partners that are expected to comply with applicable data protection laws and industry standards.
            </Paragraph>
            <Paragraph>
              Where required by applicable laws (such as in the European Economic Area, the United Kingdom, or similar regions), we will request your consent before serving personalized advertisements.
            </Paragraph>

              <SubSection subTitle="5.1 Ad Personalization & User Choices">
                <Paragraph>
                  You have control over how advertisements are shown to you:
                </Paragraph>

                  <LangphyListItem content="You may be presented with a consent prompt (e.g., via a Consent Management Platform such as Google UMP) to choose whether to receive personalized ads." />
                  <LangphyListItem content="You can change your preferences at any time through your device settings, including:" />
                  <LangphyListItem content="Android: Settings → Privacy → Ads" indent={true} />
                  <LangphyListItem content="You may opt out of personalized advertising, in which case you will still see ads, but they may be less relevant." />
              
              </SubSection>

              <SubSection subTitle="5.2 Data Shared with Advertising Partners">
                <Paragraph>
                  To support advertising, Langphy may share the following categories of data with ad partners:
                </Paragraph>

                <LangphyListItem content="Device Information (e.g., device model, OS version)" />
                <LangphyListItem content="Advertising Identifiers (e.g., Google Advertising ID)" />
                <LangphyListItem content="Approximate Location (based on IP or device settings, not precise GPS)" />
                <LangphyListItem content="Usage Data (e.g., app interactions, ad engagement)" />

                <Paragraph>This data is used for:</Paragraph>

                <LangphyListItem content="Ad delivery" />
                <LangphyListItem content="Ad personalization (if consent is given)" />
                <LangphyListItem content="Analytics and performance measurement" />
                <LangphyListItem content="Fraud prevention and security" />

                <Paragraph>We do not share:</Paragraph>

                <LangphyListItem content="Precise location data" />
                <LangphyListItem content="Contacts, messages, or sensitive personal content" />
              </SubSection>

              <SubSection subTitle="5.3 Future Paid Features">
                  <Paragraph>
                    Optional paid membership features may be introduced in a future version. These may include benefits such as removing advertisements and unlocking premium features. The free version of the application will remain available.
                  </Paragraph>
              </SubSection>
          </Section>

          {/* 6 */}
          <Section title="6. Third-Party Services">
            <Paragraph>
              Langphy depends on certain third-party services for infrastructure, speech processing, and email delivery. We do not control the availability or conduct of these services. Any failure, downtime, or change in third-party service terms may affect the corresponding Langphy features. We are not responsible for the independent practices of third-party service providers.
            </Paragraph>
          </Section>

          {/* 7 */}
          <Section title="7. No Professional Advice">
            <Paragraph>
              Nothing in the Langphy application, its content, or any communication from us constitutes professional advice of any kind, including pedagogical, medical, legal, or financial advice. The application is a personal software tool for language learning and entertainment purposes only.
            </Paragraph>
          </Section>

          {/* 8 */}
          <Section title="8. Intellectual Property Acknowledgment">
            <Paragraph>
              The German language itself is a natural human language and is not proprietary. However, the specific lesson content, exercise structures, audio recordings, sentence constructions, interface designs, and application code within Langphy are original works created by Niloy Rudra and Kheya Nandi, or are licensed to them. Users acknowledge that they may not reproduce, republish, redistribute, or otherwise exploit lesson content from the application outside of their personal learning use.
            </Paragraph>
          </Section>

          {/* 9 */}
          <Section title="9. Forward-Looking Statements">
            <Paragraph>
              This document and other communications from Langphy may contain statements about future plans, including the introduction of paid membership tiers, availability on additional platforms, or expansion of content. These are intentions and not guarantees. Future features and availability are subject to change based on technical, business, and other considerations. We are under no obligation to deliver any features described as planned or upcoming.
            </Paragraph>
          </Section>

          {/* 10 */}
          <Section title="10. Your Rights and Choices">
            <Paragraph>
              As noted above, Langphy is currently operated by two individuals — Niloy Rudra and Kheya Nandi — rather than a formally registered legal entity. We intend to register a business entity in the future. Until that time, any legal obligations, liabilities, or responsibilities associated with the application rest with Niloy Rudra and Kheya Nandi as individuals. This does not diminish our commitment to protecting your data and providing a quality service in accordance with these Terms and the Privacy Policy.
            </Paragraph>
          </Section>

          {/* 11 */}
          <Section title="11. User Acknowledgment">
            <Paragraph>By creating an account and using Langphy, you confirm that:</Paragraph>
              <LangphyListItem content="You have read and understood the Terms of Service, Privacy Policy, and this Disclaimer." />
              <LangphyListItem content="You understand that Langphy is an independent application and is not affiliated with any language certification authority or educational institution." />
              <LangphyListItem content="You understand that speech assessment features are automated and not evaluated by qualified language professionals." />
              <LangphyListItem content="You acknowledge the offline data storage model and the risk of data loss on unsynced devices." />
              <LangphyListItem content="You understand that Langphy is currently available on Android only and is free of charge, with optional paid features planned for the future." />
              <LangphyListItem content="You understand that Langphy is operated by individual developers and not yet a registered company." />
              <LangphyListItem content="You are of sufficient age to enter into these agreements, or a parent or legal guardian has done so on your behalf." />
          </Section>

          <Section title="12. Contact">
              <Paragraph>For content errors, technical concerns, or any other queries:</Paragraph>
              {/* <ContactDetail /> */}
              <ContactSection />
          </Section>

          <FooterNote>
            Last reviewed: July 1, 2025. These documents will be updated as Langphy evolves, including when a formal business entity is registered or when paid features are introduced.
          </FooterNote>

      </ScrollView>
    </SafeAreaLayout>
  );
}

export default AcknowledgmentScreen;

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
    marginBottom: 20
  },
});