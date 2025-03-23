import React, { ReactNode } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';

const SafeAreaLayout = ({children}: {children: ReactNode}) => {
    const {colors} = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[STYLES.defaultContainer, {backgroundColor: colors.background}]}>
      {children && children}
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SafeAreaLayout;
