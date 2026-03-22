import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Title from './Title';
import sizes from '@/constants/size';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
import AppImage from './AppImage';
import { Images } from '@/constants/images';
import { useFeedback } from '@/utils/feedback';

type unitItemType = {
  unitId: string,
  categoryId: string,
  title: string,
  unitSlug: string,
  customStyle?: StyleProp<ViewStyle>
}

const UnitRectangleCard: React.FC<unitItemType> = ({ title, unitId, unitSlug, categoryId, customStyle }) => {
  const { colors } = useTheme();
  // const completionMatrix = (completion/goal)*100;
  const {category} = useLocalSearchParams();
  const {triggerFeedback} = useFeedback();

  const routeHandler = React.useCallback(() => {
    triggerFeedback("tap");
    router.push({
      pathname: `/lessons/${String(category).toLowerCase()}/${String(unitSlug).toLowerCase()}`,
      params: { title, categoryId, unitId }
    });
  }, [router, category, unitSlug, title, categoryId, unitId]);

  return (
    <TouchableOpacity
      onPress={routeHandler}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.unitCardBackgroundColor,
            borderColor: colors.unitCardBorderColor
          },
          (customStyle && customStyle )
        ]}
      >
        
        <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.unitIconBackgroundColor}]}>
          <AppImage source={Images.unit.dolphin_reading} size={49} />
        </View>

        <Title title={title} />

        <View style={[STYLES.childContentCentered, styles.progressBarWrapper]}>
          {/* <ProgressBar completion={completionMatrix} /> */}
        </View>

      </View>
    </TouchableOpacity>
  );
}
export default UnitRectangleCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: 16,
    borderWidth: 1,

    padding: 0,
    // paddingHorizontal: 0, // 24

    width: sizes.screenWidth - (sizes.bodyPaddingHorizontal*2),
    height: 78,
  },
  imageWrapper: {
    width: 75,
    height: 75,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  progressBarWrapper: {
    width: 75,
    height: 75,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  progressBar: {
    width: 52
  }
});