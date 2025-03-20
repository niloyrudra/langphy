import React from 'react'
import { SafeAreaView, useWindowDimensions } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useTheme } from '@/theme/ThemeContext'

import CategoryCardList from '@/components/list-loops/CategoryCardList';
import { getCardContainerWidth } from '@/utils'
import StatusBarComponent from '@/components/StatusBarComponent'

const App = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[ {flex: 1}, { backgroundColor: colors.background }]}>
        
        <StatusBarComponent />
        <CategoryCardList cardWidth={cardWidth} />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;