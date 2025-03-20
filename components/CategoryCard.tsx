import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, StyleProp, ViewProps } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';

import * as STYLES from '@/constants/styles';
import { SvgProps } from 'react-native-svg';

interface CategoryProps {
  catTitle: string,
  slug: string,
  ImgComponent: React.FC<SvgProps>,
  // ImgComponent: ImageSourcePropType | undefined,
  // customStyle?: StyleProp<ViewProps>
  containerWidth: number
  marginRight?: number
}

const CategoryCard = ( { catTitle, slug, ImgComponent, marginRight=0, containerWidth=172}: CategoryProps ) => {
  const router = useRouter();
  const {colors} = useTheme()

  return (
    <TouchableOpacity
      onPress={() =>  router.push({ pathname: '/category', params: { title: catTitle, slug: slug } })}
    >
      <View style={[STYLES.contentCentered, styles.container, {backgroundColor: colors.cardBackgroundColor, borderColor: colors.cardBorderColor, width: containerWidth, height: containerWidth, marginRight: marginRight} ]}>
        {/* <Image source={ImgComponent} style={styles.image} /> */}
        <ImgComponent width={80} height={80} />
        <Text style={[styles.title, { fontFamily: 'PlusJakartaSans-ExtraBold', color: colors.text }]}>{catTitle}</Text>
      </View>
     </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16, // 24
    margin:0,
    minWidth: 172,
    minHeight: 172,
  },
  // image: {
  //   width: 80,
  //   height: 80
  // },
  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  }
});

export default CategoryCard;