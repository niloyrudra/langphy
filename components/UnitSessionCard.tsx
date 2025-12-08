import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import STYLES from '@/constants/styles';
import ProgressBar from './ProgressBar';
import { useTheme } from '@/theme/ThemeContext';
import GridCardIcon from './GridCardIcon';
import TitleHeading from './TitleHeading';
import { getCardContainerWidth } from '@/utils';
import { SvgProps } from 'react-native-svg';
import { UnitSessionType } from '@/types';

const UnitSessionCard: React.FC<UnitSessionType> = ( { title, categoryId, unitId, slug, ImgComponent, completion, goal, marginRight=0} ) => {
  const {colors} = useTheme();
  const {category, unit} = useLocalSearchParams();
  // const { categoryId, unitId, completion, goal } = useLocalSearchParams();
  const cardWidth = getCardContainerWidth();

  return (
    <TouchableOpacity onPress={() =>  router.push({ pathname: `/lessons/${category}/${unit}/${slug}`, params: { completion: completion, goal: goal, slug: slug, categoryId, unitId } })}>
      <View 
        style={[
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor: colors.cardBackgroundColor,
            borderColor: colors.cardBorderColor,
            width: cardWidth,
            marginRight: marginRight
          }
        ]}
      >
        
        <GridCardIcon ImgComponent={ImgComponent} />
        
        <TitleHeading title={title} />
        
        <ProgressBar completion={completion} />

      </View>
    </TouchableOpacity>
  );
}

export default UnitSessionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    margin:0,
  }
});