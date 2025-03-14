import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'

import SteakIcon from '@/assets/images/header/water-drop-icon.png';

const SteakBadge = () => {
  return (
    <View
      style={styles.container}
    >
      <Image source={SteakIcon} style={styles.steakIcon} />
      <Text style={styles.steakCount}>2</Text>
    </View>
  )
}

export default SteakBadge

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    gap:8,
    borderWidth: 2,
    borderColor: "#f7f7f7",
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  steakIcon: {
    width:10,
    height: 15,
  },
  steakCount: {
    fontSize:16
  }
})