import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import SteakIcon from '@/assets/images/header/water-drop-icon.svg';

const SteakBadge = () => {
  return (
    <View
      style={styles.container}
    >
      <SteakIcon width={16} height={24} />
      <Text style={styles.steakCount}>2</Text>
    </View>
  )
}

export default SteakBadge;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#D9EFFF", // "#f7f7f7",
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  steakCount: {
    fontSize:22,
    fontWeight: "700"
  }
})