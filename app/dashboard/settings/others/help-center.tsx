import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import { DarkLogo, LightLogo } from '@/utils/SVGImages';
import Title from '@/components/Title';
import ContactSection from '@/components/contents/ContactSection';

const HelpCenterScreen = () => {
  const { colors, theme } = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
          <View style={styles.banner}>
            {
              theme === "light"
                ? (
                  <LightLogo width={300} height={69.53} />
                )
                : (<DarkLogo width={300} height={69.53} />)
            }
          </View>

          <Title title="Connect with Langphy" alignCenter contentStyle={styles.title} />

          <View style={[styles.separator, {backgroundColor: colors.hLineColor}]} />

          {/* <ContactDetail weight='semibold' style={styles.contactDetail} /> */}

          <ContactSection centered />

          <View style={[styles.separator, {backgroundColor: colors.hLineColor}]} />

        </View>

      </ScrollView>
    </SafeAreaLayout>
  )
}

export default HelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems: "center",
    // height: Dimensions.get("window").height
  },
  banner: {
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24
  },
  separator: {
    width: 50,
    height: 2,
    marginVertical: 20
  },
  contactDetail: {lineHeight: 30, fontSize: 18, textAlign: "center"}
})