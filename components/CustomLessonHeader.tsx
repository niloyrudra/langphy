import { StyleSheet, View } from 'react-native'
import React from 'react'
import HeaderTopLeftArrowButton from './HeaderTopLeftArrowButton'
import SettingsButton from './SettingsButton'

const CustomLessonHeader = () => {
  return (
    <View
      style={styles.container}
    >
      <HeaderTopLeftArrowButton/>
      <SettingsButton/>
    </View>
  )
}

export default CustomLessonHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 17,
    paddingVertical: 10,
    height:55,
    backgroundColor: "#F9FAFB"
  }
})