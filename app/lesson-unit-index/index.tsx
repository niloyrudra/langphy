import React from 'react'
import { SafeAreaView, useWindowDimensions, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useTheme } from '@/theme/ThemeContext'

import CategoryCardList from '@/components/list-loops/CategoryCardList';
import { getCardContainerWidth } from '@/utils'
import UnitIndexCardList from '@/components/list-loops/UnitIndexCardList';

const LessonUnitIndex = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[ {flex: 1}, { backgroundColor: colors.background }]}>
        
        <UnitIndexCardList cardWidth={cardWidth} />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default LessonUnitIndex;