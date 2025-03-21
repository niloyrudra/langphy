import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { UnitDataProps } from '@/types';
import { useTheme } from '@/theme/ThemeContext';

import UnitRectangleCard from '@/components/UnitRectangleCard';
import sizes from '@/constants/size';

import { UNIT_DATA } from '@/schemes/static-data';
import UnitCardList from '@/components/list-loops/UnitCardList';


const LessonUnit = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
        <UnitCardList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default LessonUnit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
  }
})