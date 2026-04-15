import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeContext';
import { milestonesData } from '@/static-data/static-data';
import { MilestonesType } from '@/types';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import MilestonesItemRectangle from '@/components/dashboard/_partials/MilestonesItemRectangle';
import { authSnapshot } from '@/snapshots/authSnapshot';
import { useStreak } from '@/hooks/useStreaks';

const MilestonesScreen = () => {
  const { colors } = useTheme();
  const userId = authSnapshot.getUserId() ?? "";
  const { data: streak } = useStreak(userId);
  console.log(streak)
  return (
    <SafeAreaLayout>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          {
            milestonesData.map( (item: MilestonesType) => (
              <MilestonesItemRectangle
                key={item.id.toString()}
                title={item.title}
                description={item.description}
                milestones={item.milestones}
                isLocked={(streak?.current_streak ?? 0) < item.milestones ? true : false}
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