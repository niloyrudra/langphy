import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';

const Dashboard = () => {
  const { colors, theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: SIZES.bodyPaddingHorizontal,
        paddingVertical: SIZES.bodyPaddingVertical
      }}
    >
      <Text>Milestones</Text>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})