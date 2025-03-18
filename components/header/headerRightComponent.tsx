import { StyleSheet, View } from 'react-native'
import React from 'react'

// import { useTheme } from '@/theme/ThemeContext'

import SettingsButton from '../SettingsButton'
import ToggleColorThemeComponent from '../ToggleColorThemeComponent'
import SteakBadgeFlagComponent from '../SteakBadgeFlagComponent'

const headerRightComponent = () => {
    // const { colors, theme } = useTheme();
  return (
    <View
        style={styles.container}
    >
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