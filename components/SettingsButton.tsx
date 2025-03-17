import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

// import SettingIcon from '@/assets/images/header/account-setting-icon.png';
import SettingIcon from '@/assets/images/header/account-settings-icon.svg';
import SettingDarkIcon from '@/assets/images/header/account-settings-icon-dark.svg';

import { useTheme } from '@/theme/ThemeContext';

const SettingsButton = () => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log("Settings Button")}
    >
      {
        theme === 'light'
        ? (<SettingIcon width={36} height={36} />)
        : (<SettingDarkIcon width={36} height={36} />)
      }
      
    </TouchableOpacity>
  )
}

export default SettingsButton

const styles = StyleSheet.create({
  container: {}
})