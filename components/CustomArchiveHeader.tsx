import { StyleSheet, View } from 'react-native'
import React from 'react'
import HeaderTopLeftArrowButton from './HeaderTopLeftArrowButton'
import HeaderLogo from './HeaderLogo'
import SettingsButton from './SettingsButton'
import CategoryArchiveHeaderTitle from './CategoryArchiveHeaderTitle'

const CustomArchiveHeader = ({title}: {title: string}) => {
  return (
    <View
      style={styles.container}
    >
      <HeaderTopLeftArrowButton/>
      { title ? (<CategoryArchiveHeaderTitle title={title} />) : (<HeaderLogo/>)}
      <SettingsButton/>
    </View>
  )
}

export default CustomArchiveHeader

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