import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import SpeakerIcon from "@/assets/images/screen-icons/speaker-icon.png";

const SpeakerIconComponent = () => {
  return (
    <TouchableOpacity
        style={styles.container}
    >
      <Image
        style={styles.icon}
        source={SpeakerIcon}
      />
    </TouchableOpacity>
  )
}

export default SpeakerIconComponent

const styles = StyleSheet.create({
    container: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#D9EFFF",
        padding: 6,
        backgroundColor: "#ffffff"
    },
    icon: {
        width: 20,
        height: 20
    }
})