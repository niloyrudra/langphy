import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import InfoRow from "./_partials/InfoRow";

const ContactSection = ({centered}: {centered?: boolean}) => {
  return (
    <View style={styles.container}>
        <InfoRow
            label="Development:"
            value="Niloy Rudra"
            onPress={() => {
                Linking.openURL("https://linkedin.com/in/niloy-rudra-dev/")
            }}
            centered={centered}
        />

        <InfoRow
            label="Design:"
            value="Kheya Nandi"
            onPress={() => {
                Linking.openURL("https://linkedin.com/in/kheya-nandi/")
            }}
            centered={centered}
        />

        <InfoRow
            label="Email:"
            value="support@langphy.com"
            onPress={() => Linking.openURL("mailto:support@langphy.com")}
            centered={centered}
        />

        <InfoRow
            label="Website:"
            value="langphy.com"
            onPress={() => Linking.openURL("https://langphy.com")}
            centered={centered}
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