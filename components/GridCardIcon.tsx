import React from 'react'
import { StyleSheet, View } from 'react-native'
import STYLES from '@/constants/styles'
import { SvgProps } from 'react-native-svg'
import { useTheme } from '@/theme/ThemeContext'
import SIZES from '@/constants/size'

const GridCardIcon = ({ImgComponent}: {ImgComponent: React.FC<SvgProps>}) => {
  const { colors } = useTheme();
  return (
    <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.cardIconBackgroundColor}]}>
      <ImgComponent width={SIZES.gridCardIconDimension} height={SIZES.gridCardIconDimension} />
      {/* <ImgComponent /> */}
    </View>
  );
}

export default GridCardIcon

const styles = StyleSheet.create({
  imageWrapper: {
    width: SIZES.gridCardIconWrapDimension,
    height: SIZES.gridCardIconWrapDimension,
    borderRadius: SIZES.gridCardIconWrapDimension/2,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }
});