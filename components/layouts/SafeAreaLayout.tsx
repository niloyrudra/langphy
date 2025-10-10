import React, { ReactNode } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import STYLES from '@/constants/styles';
import { useTheme } from '@/theme/ThemeContext';
import StatusBarComponent from '../StatusBarComponent';

const SafeAreaLayout = ({children}: {children: ReactNode}) => {
    const {colors} = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBarComponent />
      <SafeAreaView style={[STYLES.defaultContainer, {backgroundColor: colors.background}]}>
        {children && children}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SafeAreaLayout;
