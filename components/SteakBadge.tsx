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
    gap: 5,
    justifyContent: "center",
    alignItems: "center"
    // borderWidth: 2,
    // borderColor: "#f7f7f7",
    // borderRadius: 100,
    // paddingHorizontal: 12,
    // paddingVertical: 6
  },
  steakCount: {
    fontSize:20,
    fontWeight: "700"
  }
})