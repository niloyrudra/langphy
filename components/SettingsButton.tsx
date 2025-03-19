import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
// Constants
import sizes from '@/constants/size';

import SettingIcon from '@/assets/images/header/account-settings-icon.svg';
import SettingDarkIcon from '@/assets/images/header/account-settings-icon-dark.svg';

const SettingsButton = () => {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => router.push("/auth/login")}
    >
      {
        theme === 'light'
        ? (<SettingIcon width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<SettingDarkIcon width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
      
    </TouchableOpacity>
  )
}

export default SettingsButton;