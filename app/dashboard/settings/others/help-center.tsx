import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import SIZES from '@/constants/size';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';

const HelpCenterScreen = () => {
  const { colors, theme } = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>

        <View
          style={{
            flex: 1,
          }}
        >
          <Text>Help Center</Text>
        </View>

      </ScrollView>
    </SafeAreaLayout>
  )
}

export default HelpCenterScreen

const styles = StyleSheet.create({})