import React from 'react'
import { Image, View } from 'react-native'
import { BannerProps } from '@/types';
import STYLES from '@/constants/styles';

const AuthTopBannerImage = ({width, height}: BannerProps) => {
  return (
    <View style={[STYLES.childContentCentered, {height: 220}]}>
      <Image
        source={require('@/assets/images/auth/dolphin.png')}
        style={{
          width: width ?? 187, // "48%", // width ?? 187,
          height: height ?? 211.67 // "52.25%" // height ?? 211.67
        }}
      />
    </View>
  );
}
export default AuthTopBannerImage;