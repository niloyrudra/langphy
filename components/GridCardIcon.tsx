import React from 'react'
import { StyleSheet, View } from 'react-native'
import STYLES from '@/constants/styles'
import { SvgProps } from 'react-native-svg'
import { useTheme } from '@/theme/ThemeContext'
import SIZES from '@/constants/size'
import { categoryIcon } from '@/utils'

const GridCardIcon = ({slug}: {slug: string}) => {
  const { colors } = useTheme();

  const ImgComponent = categoryIcon[slug as keyof typeof categoryIcon];
  if (!ImgComponent) {
    console.warn(`Icon not found for slug: ${slug}`);
    return null; // or a default placeholder icon
  }
  return (
    <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.cardIconBackgroundColor}]}>
      {ImgComponent && (<ImgComponent width={SIZES.gridCardIconDimension} height={SIZES.gridCardIconDimension} />)}
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