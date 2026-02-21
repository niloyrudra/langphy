import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Title from './Title';
import sizes from '@/constants/size';
import STYLES from '@/constants/styles';
import ProgressBar from './ProgressBar';
import { useTheme } from '@/theme/ThemeContext';
import { DolphinReading } from '@/utils/SVGImages';

type unitItemType = {
  unitId: string,
  categoryId: string,
  title: string,
  unitSlug: string,
  goal: number,
  completion: number,
  customStyle?: StyleProp<ViewStyle>
}

const UnitRectangleCard: React.FC<unitItemType> = ({ title, unitId, unitSlug, categoryId, completion, goal, customStyle }) => {
  const { colors } = useTheme();
  const completionMatrix = (completion/goal)*100;
  const {category} = useLocalSearchParams();

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: `/lessons/${String(category).toLowerCase()}/${String(unitSlug).toLowerCase()}`, params: { title, categoryId, unitId, completion, goal } } )}
    >
      <View style={[styles.container, {backgroundColor: colors.unitCardBackgroundColor, borderColor: colors.unitCardBorderColor}, (customStyle && customStyle ) ]}>
        
        <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.unitIconBackgroundColor}]}>
          <DolphinReading width={49} height={49} />
        </View>

        <Title title={title} />

        <View style={[STYLES.childContentCentered, styles.progressBarWrapper]}>
          <ProgressBar completion={completionMatrix} />
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