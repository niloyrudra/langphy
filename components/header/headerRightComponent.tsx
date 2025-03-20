import React from 'react';
import { StyleSheet, View } from 'react-native';
import SettingsButton from '../SettingsButton';
import ToggleColorThemeComponent from '../ToggleColorThemeComponent';
import SteakBadgeFlagComponent from '../SteakBadgeFlagComponent';

const headerRightComponent = () => {
  return (
    <View style={styles.container}>
        <SteakBadgeFlagComponent />
        <ToggleColorThemeComponent />
        <SettingsButton />
    </View>
  )
}

export default headerRightComponent

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        gap: 16
    }
})