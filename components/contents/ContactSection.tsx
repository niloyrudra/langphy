import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import InfoRow from "./_partials/InfoRow";

const ContactSection = () => {
  return (
    <View style={styles.container}>
        <InfoRow
            label="Development:"
            value="Niloy Rudra"
            onPress={() => {
            Linking.openURL("https://linkedin.com/in/niloy-rudra-dev/")
            }}
        />

        <InfoRow
            label="Design:"
            value="Kheya Nandi"
            onPress={() => {
            Linking.openURL("https://linkedin.com/in/kheya-nandi/")
            }}
        />

        <InfoRow
            label="Email:"
            value="support@langphy.com"
            onPress={() => Linking.openURL("mailto:support@langphy.com")}
        />

        <InfoRow
            label="Website:"
            value="langphy.com"
            onPress={() => Linking.openURL("https://langphy.com")}
        />
    </View>
  );
};

export default ContactSection;

const styles = StyleSheet.create({
    container: {
        // padding: 16,
        // borderRadius: 6,
    }
});