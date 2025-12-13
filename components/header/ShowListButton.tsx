import { TouchableOpacity } from 'react-native';
import React from 'react';
// import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { ListIconDark, ListIconLight, } from '@/utils/SVGImages';
import { useSession } from '@/context/SessionContext';

const ShowListButton = () => {
  const { theme } = useTheme();
  const { toggleLessonList } = useSession();

  return (
    <TouchableOpacity onPress={toggleLessonList}>
      {
        theme === 'light'
        ? (<ListIconLight width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<ListIconDark width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default ShowListButton;