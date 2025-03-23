import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import STYLES from '@/constants/styles';
import ProgressBar from './ProgressBar';
import { UnitLessonProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext';

const LessonUnitIndexCard = ( { title, slug, ImgComponent, completion, goal, marginRight=0, containerWidth=172}: UnitLessonProps ) => {
  const {colors} = useTheme();
  const {category, unit} = useLocalSearchParams();

  return (
    <TouchableOpacity onPress={() =>  router.push({ pathname: `/lessons/${category}/${unit}/${slug}`, params: { completion: completion, goal: goal, slug: slug } })}>
      
      <View style={[STYLES.contentCentered, styles.container, {backgroundColor: colors.cardBackgroundColor, borderColor: colors.cardBorderColor, width: containerWidth, height: containerWidth, marginRight: marginRight} ]}>
        
        <ImgComponent width={80} height={80} />
        
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        
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
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  }
});