import { StyleSheet, View } from 'react-native'
import React from 'react'

import SteakBadge from '../SteakBadge'
import FlagSquareComponent from '../FlagSquareComponent'
import SettingsButton from '../SettingsButton'
import ToggleColorThemeComponent from '../ToggleColorThemeComponent'

const headerRightComponent = () => {
  return (
    <View
        style={{
            flexDirection:"row",
            gap: 16
        }}
    >
        <View
        style={{
            flexDirection: "row",
            gap: 6,
            borderWidth: 1,
            borderColor: "#68F0F8",
            paddingVertical: 3,
            paddingHorizontal: 3,
            borderRadius: 12,
            height: 36
        }}
        >
            <SteakBadge />
            <FlagSquareComponent />
        </View>

        <ToggleColorThemeComponent />

        <SettingsButton />
    </View>
  )
}

export default headerRightComponent

const styles = StyleSheet.create({})