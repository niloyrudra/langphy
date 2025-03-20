import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { SubCategoryProps } from '@/types';
// import * as Progress from 'react-native-progress';
import { useTheme } from '@/theme/ThemeContext';
import STYLES from '@/constants/styles';
import sizes from '@/constants/size';

import ProgressBar from './ProgressBar';
import Title from './Title';


const SubCategoryCard = ({ title, completion, imgSource, customStyle }: SubCategoryProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/lessons', params: { title: title } })}
    >
      <View style={[styles.container, {backgroundColor: colors.subCatCardBackgroundColor, borderColor: colors.subCatCardBorderColor}, (customStyle && customStyle ) ]}>
        
        <View style={[STYLES.childContentCentered, styles.imageWrapper, {backgroundColor: colors.subCatIconBackgroundColor}]}>
          <Image source={imgSource} style={styles.image} />
        </View>

        <Title title={title} />

        <ProgressBar completion={completion} />

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
  image: {
    width: 49,
    height: 49
  },
  progressBar: {
    width: 52
  }
});

export default SubCategoryCard;