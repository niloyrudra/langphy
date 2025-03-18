import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';

import SteakIcon from '@/assets/images/header/water-drop-icon.svg';

const SteakBadge = () => {
  const {colors,theme} = useTheme()
  return (
    <View
      style={[styles.container, {backgroundColor: colors.steakBadgeBackgroundColor}]}
    >
      <SteakIcon width={8} height={12} />
      <Text style={[styles.steakCount, {color: colors.text}, (theme === 'dark' && styles.textShadow)]}>1,001</Text>
    </View>
  )
}

export default SteakBadge;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
    height: 24,
  },
  steakCount: {
    fontSize: 14,
    fontWeight: "700",
  },
  textShadow: {
    textShadowColor: "#444",
    textShadowOffset:{
      width:2,
      height:2
    },
    textShadowRadius: 2
  }
})