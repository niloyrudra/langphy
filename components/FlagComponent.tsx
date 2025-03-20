import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { GermanyCircleFlagIcon } from '@/utils/SVGImages'

const FlagComponent = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <GermanyCircleFlagIcon width={30} height={30} />
    </TouchableOpacity>
  )
}

export default FlagComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: 30,
    height: 30
  }
})