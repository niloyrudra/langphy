import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import DictionaryIcon from '@/assets/images/screen-icons/dictionary-icon.svg';

const FloatingDictionaryIcon = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <DictionaryIcon width={40} height={40} />
    </TouchableOpacity>
  )
}

export default FloatingDictionaryIcon;

const styles = StyleSheet.create({
    container: {
      position: "absolute",
      right: 10,
      bottom: 100,

      width: 70, // 80
      height: 70,
      borderRadius: 35, // 40
      backgroundColor: "#24DEEC",
      justifyContent: "center",
      alignItems: "center",

      elevation: 5,
      shadowColor: "#55565626",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.2,
      shadowRadius: 5
    }
})