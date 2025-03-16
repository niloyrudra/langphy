import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// import SettingIcon from '@/assets/images/header/account-setting-icon.png';
import SettingIcon from '@/assets/images/header/settings-icon.svg';

const SettingsButton = () => {
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <SettingIcon width={32} height={32} />
    </TouchableOpacity>
  )
}

export default SettingsButton

const styles = StyleSheet.create({
  container: {}
})