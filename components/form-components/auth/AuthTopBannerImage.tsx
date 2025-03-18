import { StyleProp, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'

import DolphinIcon from '@/assets/images/auth/dolphin-icon.svg'

import * as STYLES from '@/constants/styles'
import sizes from '@/constants/size'

const AuthTopBannerImage = ({width, height}: {width?: number, height?: number}) => {
  return (
    <View
        style={[STYLES.contentCentered, {marginTop: sizes.authMarginTop}]}
    >
        <DolphinIcon width={187} height={211.67} />
    </View>
  )
}

export default AuthTopBannerImage;