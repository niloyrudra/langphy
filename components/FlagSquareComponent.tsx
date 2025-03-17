import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import GermanyFlagSquareIcon from '@/assets/images/header/flag-germany-square.svg';

const FlagSquareComponent = () => {
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <GermanyFlagSquareIcon width={31} height={24} />
    </TouchableOpacity>
  )
}

export default FlagSquareComponent;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 6.65,

    width: 35,
    height: 28
  }
})