import { TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { SettingDark, SettingLight } from '@/utils/SVGImages';

const Settings = () => {
  const { theme } = useTheme();

  const handlePress = () => {
    router.push('/dashboard/settings');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {
        theme === 'light'
        ? (<SettingLight width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<SettingDark width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default Settings;