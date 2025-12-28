import { TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { LeftArrowDark, LeftArrowLight } from '@/utils/SVGImages';

const HeaderTopLeftArrowButton = () => {
  const { theme } = useTheme();

  const handlePress = () => {
    router.back();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      // style={{backgroundColor: "black"}}
    >
      {
        theme === 'light'
        ? (<LeftArrowLight width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<LeftArrowDark width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default HeaderTopLeftArrowButton;