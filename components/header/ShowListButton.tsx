import { TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme/ThemeContext';
import sizes from '@/constants/size';

import { ListIconDark, ListIconLight, } from '@/utils/SVGImages';
import { useSession } from '@/context/SessionContext';
import STYLES from '@/constants/styles';

const ShowListButton = () => {
  const { colors, theme } = useTheme();
  const { toggleLessonList } = useSession();

  return (
    <TouchableOpacity
      onPress={toggleLessonList}
      style={[STYLES.headerIcon, {borderColor: colors.headerIconBorder}]}
    >
      {
        theme === 'light'
        ? (<ListIconLight width={sizes.headerIcon} height={sizes.headerIcon} />)
        : (<ListIconDark width={sizes.headerIcon} height={sizes.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default ShowListButton;