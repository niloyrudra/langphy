import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import SpeakerIcon from "@/assets/images/screen-icons/speaker-icon.svg";

const SpeakerComponent = () => {
  return (
    <TouchableOpacity
        style={styles.container}
    >
      <SpeakerIcon width={20} height={20} />
    </TouchableOpacity>
  )
}

export default SpeakerComponent;

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9EFFF",
    padding: 6,
    backgroundColor: "#ffffff"
  }
})