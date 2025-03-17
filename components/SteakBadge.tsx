import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import SteakIcon from '@/assets/images/header/water-drop-icon.svg';

const SteakBadge = () => {
  return (
    <View
      style={styles.container}
    >
      <SteakIcon width={10} height={15} />
      <Text style={styles.steakCount}>1,001</Text>
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
    padding: 4,
    gap: 4,
    height: 28,
    backgroundColor: "#DAFFFF",
    // borderWidth: 2,
    // borderColor: "#ffffff"

    // borderWidth: 2,
    // borderColor: "#D9EFFF", // "#f7f7f7",
    // borderRadius: 30,
    // paddingHorizontal: 8,
    // paddingVertical: 2
  },
  steakCount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#142C57"
  }
})