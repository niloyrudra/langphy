import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { UnitProps } from '@/types';
// import * as Progress from 'react-native-progress';
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size';

import ProgressBar from './ProgressBar';
import Title from './Title';
// import { BookIcon } from '@/utils/SVGImages';


const UnitRectangleCard = ({ title, completion, goal, ImgComponent, customStyle }: UnitProps) => {
  const { colors } = useTheme();
  const completionMatrix = (completion/goal)*100;
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/lesson-unit-index', params: { title:title, completion: completion, goal: goal }})}
    >
      <View style={[styles.container, {backgroundColor: colors.unitCardBackgroundColor, borderColor: colors.unitCardBorderColor}, (customStyle && customStyle ) ]}>
        
        <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.unitIconBackgroundColor}]}>
          <ImgComponent width={49} height={49} />
        </View>

        <Title title={title} />

        <View style={[STYLES.childContentCentered, styles.progressBarWrapper]}>
          <ProgressBar completion={completionMatrix} />
        </View>

      </View>
    </TouchableOpacity>
  );
}

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

export default UnitRectangleCard;