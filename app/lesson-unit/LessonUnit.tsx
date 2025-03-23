import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeContext';

import UnitCardList from '@/components/list-loops/UnitCardList';
import STYLES from '@/constants/styles';


const LessonUnit = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[STYLES.defaultContainer, {backgroundColor: colors.background}]}>
        <UnitCardList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default LessonUnit;