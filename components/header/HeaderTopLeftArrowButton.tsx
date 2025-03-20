import { TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { ArrowLeftDarkIcon, ArrowLeftIcon } from '@/utils/SVGImages';

const HeaderTopLeftArrowButton = () => {
  const { theme } = useTheme();

  const handlePress = () => {
    router.back();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {
        theme === 'light'
        ? (<ArrowLeftIcon width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<ArrowLeftDarkIcon width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default HeaderTopLeftArrowButton;