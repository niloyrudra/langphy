import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import SpeakerAltIcon from "@/assets/images/screen-icons/speaker-icon-alt.svg";

const SpeakerAltComponent = () => {
  return (
    <TouchableOpacity
        style={styles.container}
    >
      <SpeakerAltIcon width={20} height={20} />
    </TouchableOpacity>
  )
}

export default SpeakerAltComponent;

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