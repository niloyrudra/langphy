import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import STYLES from '@/constants/styles';
import ProgressBar from './ProgressBar';
import { UnitLessonProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext';
import GridCardIcon from './GridCardIcon';
import TitleHeading from './TitleHeading';
import { getCardContainerWidth } from '@/utils';
import { SvgProps } from 'react-native-svg';

type UnitSessionType = {
  title: string,
  categoryId: string,
  unitId: string,
  goal: number,
  completion: number,
  marginRight?: number,
  ImgComponent: React.FC<SvgProps>,
  slug: string
}

const LessonUnitIndexCard: React.FC<UnitSessionType> = ( { title, categoryId, unitId, slug, ImgComponent, completion, goal, marginRight=0} ) => {
  const {colors} = useTheme();
  const {category, unit} = useLocalSearchParams();
  // const { categoryId, unitId, completion, goal } = useLocalSearchParams();
  const cardWidth = getCardContainerWidth();

  return (
    <TouchableOpacity onPress={() =>  router.push({ pathname: `/lessons/${category}/${unit}/${slug}`, params: { completion: completion, goal: goal, slug: slug, categoryId, unitId } })}>
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