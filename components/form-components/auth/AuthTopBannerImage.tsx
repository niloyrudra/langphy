import React from 'react'
import { Image, View } from 'react-native'
import { BannerProps } from '@/types';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size'

import { DolphinIconPng } from '@/utils/pngImages';

const AuthTopBannerImage = ({width, height}: BannerProps) => {
  return (
    <View style={[STYLES.contentCentered, {marginTop: sizes.authMarginTop}]}>
        {/* <DolphinIcon width={187} height={211.67} /> */}
      <Image
        source={DolphinIconPng}
        style={{
          width: width ?? 187,
          height: height ?? 211.67
        }}
      />
    </View>
  );
}
export default AuthTopBannerImage;