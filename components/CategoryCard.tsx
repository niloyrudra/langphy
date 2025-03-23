import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { CategoryProps } from '@/types';

import STYLES from '@/constants/styles';


const CategoryCard = ( { catTitle, slug, ImgComponent, marginRight=0, containerWidth=172}: CategoryProps ) => {
  const {colors} = useTheme()
  return (
    <TouchableOpacity
      onPress={() =>  router.push({ pathname: `/lessons/${slug}`, params: { title: catTitle, slug: slug } })}
    >
      <View style={[STYLES.contentCentered, styles.container, {backgroundColor: colors.cardBackgroundColor, borderColor: colors.cardBorderColor, width: containerWidth, height: containerWidth, marginRight: marginRight} ]}>
        <ImgComponent width={80} height={80} />
        <Text style={[styles.title, { color: colors.text }]}>{catTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default CategoryCard;

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
    // minHeight: 172,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  }
});