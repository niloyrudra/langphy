import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { SettingDark, SettingLight } from '@/utils/SVGImages';
import SIZES from '@/constants/size';
import STYLES from '@/constants/styles';

const Settings = () => {
  const { colors, theme } = useTheme();

  const handlePress = React.useCallback(() => {
    router.push('/dashboard/settings');
  }, [router]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[STYLES.headerIcon, {borderColor: colors.headerIconBorder}]}
    >
      {
        theme === 'light'
        ? (<SettingLight width={SIZES.headerIcon} height={SIZES.headerIcon} />)
        : (<SettingDark width={SIZES.headerIcon} height={SIZES.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    width: SIZES.headerIcon,
    height: SIZES.headerIcon,
    borderRadius: SIZES.headerIcon
  }
});