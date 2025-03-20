import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
// Constants
import sizes from '@/constants/size';

import { SettingIcon, SettingDarkIcon } from '@/utils/SVGImages';

const SettingsButton = () => {
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