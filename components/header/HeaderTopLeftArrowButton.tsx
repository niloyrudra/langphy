import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import ArrowLeftIcon from '@/assets/images/header/arrow-left-circle.svg';
import ArrowLeftDarkIcon from '@/assets/images/header/arrow-left-circle-dark.svg';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

const HeaderTopLeftArrowButton = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const handlePress = () => {
    router.back();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      {
        theme === 'light'
        ? (<ArrowLeftIcon width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<ArrowLeftDarkIcon width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default HeaderTopLeftArrowButton;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    // borderColor: "#D9EFFF",
    // backgroundColor: "#EEF8FF",
    // borderRadius: 100,
    // paddingHorizontal: 6,
    // paddingVertical: 6,

    // width: 32,
    // height: 32
  }
});