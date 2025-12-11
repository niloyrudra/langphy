import { TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { ListIconDark, ListIconLight, } from '@/utils/SVGImages';

const ShowListButton = () => {
  const { theme } = useTheme();

  const handlePress = () => {
    // router.push('/dashboard/ShowListButton');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {
        theme === 'light'
        ? (<ListIconLight width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<ListIconDark width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default ShowListButton;