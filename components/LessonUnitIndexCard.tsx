import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import STYLES from '@/constants/styles';
import ProgressBar from './ProgressBar';
import { UnitLesson, UnitLessonItemProps, UnitLessonProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext';
import GridCardIcon from './GridCardIcon';
import TitleHeading from './TitleHeading';
import { db, getCardContainerWidth } from '@/utils';

const LessonUnitIndexCard: React.FC<UnitLessonProps> = ( { title, rootCategory, unitLessonCategory, slug, ImgComponent, completion, goal, marginRight=0} ) => {
  const {colors} = useTheme();
  const {category, unit} = useLocalSearchParams();
  const cardWidth = getCardContainerWidth();

  // console.log("Slug", slug);
  // console.log("rcat", rootCategory);
  // console.log("unCat", unitLessonCategory);

  // const categoryKey = Array.isArray(category) ? category[0] : category;
  // const unitKey = Array.isArray(unit) ? unit[0] : unit;
  // console.log(unitKey, categoryKey, db[categoryKey]?.filter((item: { category: string; }) => item.category == unitKey));

  return (
    <TouchableOpacity onPress={() =>  router.push({ pathname: `/lessons/${category}/${unit}/${slug}`, params: { completion: completion, goal: goal, slug: slug, rootCategory: rootCategory, unitLessonCategory: unitLessonCategory } })}>
      <View style={[STYLES.contentCentered, styles.container, {backgroundColor: colors.cardBackgroundColor, borderColor: colors.cardBorderColor, width: cardWidth, height: cardWidth, marginRight: marginRight} ]}>
        
        <GridCardIcon ImgComponent={ImgComponent} />
        
        <TitleHeading title={title} />
        
        <ProgressBar completion={completion} />

      </View>
    </TouchableOpacity>
  );
}

export default LessonUnitIndexCard;

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
  }
});