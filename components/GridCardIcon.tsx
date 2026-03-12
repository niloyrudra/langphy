import React from 'react';
import { StyleSheet, View } from 'react-native';
import STYLES from '@/constants/styles';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';
// import { categoryIcon } from '@/utils';
import { Images } from '@/constants/images';
import AppImage from './AppImage';

type LessonType = "category" | "unit";

const GridCardIcon = ({slug, type}: {slug?: string, type?: LessonType}) => {
  const { colors } = useTheme();

  // const IconComponent = ImgComponent ? ImgComponent : null; // categoryIcon[slug as keyof typeof categoryIcon];
  if (!slug) {
    return null; // or a default placeholder icon
  }
  return (
    <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.cardIconBackgroundColor}]}>
      {
        // IconComponent
        //   ? (<IconComponent width={SIZES.gridCardIconDimension} height={SIZES.gridCardIconDimension} />)
        //   :
        type === "category"
          ?
            Images.categories[slug] && (
                <AppImage source={Images.categories[slug]} size={SIZES.gridCardIconDimension} />
              )
          :
            Images.sessions[slug] && (
                <AppImage source={Images.sessions[slug]} size={SIZES.gridCardIconDimension} />
              )
          
      }
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