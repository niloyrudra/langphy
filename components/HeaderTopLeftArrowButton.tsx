import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import ArrowLeftIcon from '@/assets/images/header/arrow-left-icon.png';

const HeaderTopLeftArrowButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Image source={ArrowLeftIcon} style={styles.arrowLeftIcon} />
    </TouchableOpacity>
  )
}

export default HeaderTopLeftArrowButton

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#D9EFFF",
    backgroundColor: "#EEF8FF",
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  arrowLeftIcon: {
    width:20,
    height:20
  }
})