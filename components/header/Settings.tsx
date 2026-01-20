import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { SettingDark, SettingLight } from '@/utils/SVGImages';
import STYLES from '@/constants/styles';
import SIZES from '@/constants/size';

const Settings = () => {
  const { theme } = useTheme();

  const handlePress = () => {
    router.push('/dashboard/settings');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      {
        theme === 'light'
        ? (<SettingLight width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<SettingDark width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    width: SIZES.headerIcon,
    height: SIZES.headerIcon,
    elevation: 5,
    shadowColor: "#55565626",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5
  }
});