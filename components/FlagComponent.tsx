import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import GermanyFlagIcon from '@/assets/images/header/germany-flag.svg';

const FlagComponent = () => {
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <GermanyFlagIcon width={30} height={30} />
    </TouchableOpacity>
  )
}

export default FlagComponent;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 15,

    width: 30,
    height: 30
  }
})