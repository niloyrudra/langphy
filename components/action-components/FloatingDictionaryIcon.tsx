import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import DictionaryIcon from '@/assets/images/screen-icons/dictionary-icon.png';

const FloatingDictionaryIcon = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={DictionaryIcon}
      />
    </TouchableOpacity>
  )
}

export default FloatingDictionaryIcon

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 10,
        bottom: 100,

        width: 70, // 80
        height: 70,
        borderRadius: 35, // 40
        padding: 13,
        backgroundColor: "#24DEEC",
        justifyContent: "center",
        alignItems: "center",

        elevation: 5,
        shadowColor: "",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 5
    },
    image: {
        width: 35, // 40
        height: 35,
    }
})