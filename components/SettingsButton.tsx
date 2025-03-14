import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import SettingIcon from '@/assets/images/header/account-setting-icon.png';

const SettingsButton = () => {
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <Image source={SettingIcon} style={styles.settingIcon} />
    </TouchableOpacity>
  )
}

export default SettingsButton

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#D9EFFF",
    backgroundColor: "#EEF8FF",
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  settingIcon: {
    width:20,
    height:20
  }
})