import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// import SettingIcon from '@/assets/images/header/account-setting-icon.png';
import SettingIcon from '@/assets/images/header/account-settings-icon.svg';

const SettingsButton = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log("Settings Button")}
    >
      <SettingIcon width={36} height={36} />
    </TouchableOpacity>
  )
}

export default SettingsButton

const styles = StyleSheet.create({
  container: {}
})