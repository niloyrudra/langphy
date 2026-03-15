import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
import GridCardIcon from './GridCardIcon';
import TitleHeading from './TitleHeading';
import { getCardContainerWidth } from '@/utils';
import { UnitSessionType } from '@/types';

const UnitSessionCard: React.FC<UnitSessionType> = ( { title, categoryId, unitId, slug} ) => {
  const { colors } = useTheme();
  const { category, unit } = useLocalSearchParams();
  const cardWidth = getCardContainerWidth();

  const routeHandler = React.useCallback(() => {
    router.push({
      pathname: `/lessons/${category}/${unit}/${slug}`,
      params: { title, slug, categoryId, unitId }
    })
  }, [router, category, unit, slug, categoryId, unitId, title]);

  return (
    <TouchableOpacity  onPress={routeHandler}>
      <View 
        style={[
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor: colors.cardBackgroundColor,
            borderColor: colors.cardBorderColor,
            width: cardWidth,
          }
        ]}
      >
        
        <GridCardIcon slug={slug} type="unit" />
        
        <TitleHeading title={title} />
        
        {/* <ProgressBar completion={completion ?? 0} /> */}

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