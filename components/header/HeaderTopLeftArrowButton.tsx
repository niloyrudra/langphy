import { TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import SIZES from '@/constants/size';
import { LeftArrowDark, LeftArrowLight } from '@/utils/SVGImages';

const HeaderTopLeftArrowButton = () => {
  const { colors, theme } = useTheme();

  const handlePress = React.useCallback(() => {
    router.back();
  }, [router]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[STYLES.headerIcon, {borderColor: colors.headerIconBorder}]}
    >
      {
        theme === 'light'
          ? (<LeftArrowLight width={SIZES.headerIcon} height={SIZES.headerIcon} />)
          : (<LeftArrowDark width={SIZES.headerIcon} height={SIZES.headerIcon} />)
      }
    </TouchableOpacity>
  );
};

export default HeaderTopLeftArrowButton;