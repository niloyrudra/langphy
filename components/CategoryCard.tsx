import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { CategoryProps } from '@/types';
import STYLES from '@/constants/styles';
import TitleHeading from './TitleHeading';
import { getCardContainerWidth } from '@/utils';
import GridCardIcon from './GridCardIcon';
import { useFeedback } from '@/utils/feedback';


const CategoryCard = ( { cat_id, title, slug}: CategoryProps ) => {
  const {colors} = useTheme();
  const cardWidth = getCardContainerWidth();
  const {triggerFeedback} = useFeedback();

  const routeHandler = React.useCallback(() => {
    triggerFeedback("tap");
    router.push({
      pathname: `/lessons/${slug}`,
      params: { title, slug, categoryId: cat_id }
    })
  }, [router, slug, title, cat_id]);

  return (
    <TouchableOpacity onPress={routeHandler}>
      <View
        style={[
          STYLES.contentCentered,
          styles.container,
          {
            backgroundColor: colors.cardBackgroundColor,
            borderColor: colors.cardBorderColor,
            width: cardWidth,
            height: cardWidth
          }
        ]}
      >
        <GridCardIcon slug={slug} type="category" />
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
    margin:0,
  },
});