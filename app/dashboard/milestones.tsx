import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { milestonesData } from '@/schemas/static-data';
import { MilestonesType } from '@/types';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import MilestonesItemRectangle from '@/components/dashboard/_partials/MilestonesItemRectangle';

const MilestonesScreen = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaLayout>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          {
            milestonesData.map( (item: MilestonesType) => (
              <MilestonesItemRectangle
                key={item.id.toString()}
                title={item.milestonesTitle}
                milestones={item.milestones}
                icon={item.icon}
              />
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaLayout>
  )
}

export default MilestonesScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 15
  }
})