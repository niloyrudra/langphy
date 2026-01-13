import React from 'react'
import { Image, View } from 'react-native'
import { BannerProps } from '@/types';
import STYLES from '@/constants/styles';
// import SIZES from '@/constants/size'

import { DolphinIconPng } from '@/utils/pngImages';

const AuthTopBannerImage = ({width, height}: BannerProps) => {
  return (
    <View style={[STYLES.childContentCentered, {height: 220}]}>
    {/* <View style={[STYLES.contentCentered, {marginTop: SIZES.authMarginTop}]}> */}
      <Image
        source={DolphinIconPng}
        style={{
          width: 187, // "48%", // width ?? 187,
          height: 211.67 // "52.25%" // height ?? 211.67
        }}
      />
    </View>
  );
}
export default AuthTopBannerImage;