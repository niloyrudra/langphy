import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { CategoryProps } from '@/types';

import STYLES from '@/constants/styles';
import TitleHeading from './TitleHeading';
import { getCardContainerWidth } from '@/utils';
import GridCardIcon from './GridCardIcon';


const CategoryCard = ( { cat_id, title, slug, marginRight=0}: CategoryProps ) => {
  const {colors} = useTheme();
  const cardWidth = getCardContainerWidth();

  return (
    <TouchableOpacity
      onPress={() =>  router.push({ pathname: `/lessons/${slug}`, params: { title: title, slug: slug, categoryId: cat_id } })}
    >
      <View style={[STYLES.contentCentered, styles.container, {backgroundColor: colors.cardBackgroundColor, borderColor: colors.cardBorderColor, width: cardWidth, height: cardWidth, marginRight: marginRight} ]}>
        
        <GridCardIcon slug={slug} />
        
        <TitleHeading title={title} />
        
      </View>
    </TouchableOpacity>
  );
}
export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16, // 20
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    // paddingHorizontal: 16, // 24
    margin:0,
    // minWidth: 172,
    // minHeight: 172,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});