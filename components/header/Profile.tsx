import { TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { router } from 'expo-router';
import SIZES from '@/constants/size';
import { ProfileDark, ProfileLight } from '@/utils/SVGImages';
import STYLES from '@/constants/styles';

const Profile = () => {
   const { colors, theme } = useTheme();

  const handlePress = React.useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[STYLES.headerIcon, {borderColor: colors.headerIconBorder}]}
    >
      {
        theme === 'light'
        ? (<ProfileLight width={SIZES.headerIcon} height={SIZES.headerIcon} />)
        : (<ProfileDark width={SIZES.headerIcon} height={SIZES.headerIcon} />)
      }
    </TouchableOpacity>
  );
}

export default Profile;