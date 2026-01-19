import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import UserProfile from '@/components/dashboard/UserProfile';
import LearningProgress from '@/components/dashboard/LearningProgress';
import Milestones from '@/components/dashboard/Milestones';
import { useProfile } from '@/context/ProfileContext';

const Dashboard = () => {
  const { refreshProfile, loading } = useProfile();
  const onRefresh = async () => {
    try {
      await refreshProfile();
    }
    catch(err) {
      console.error(err)
    }
  }
  return (
    <SafeAreaLayout>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >

        <View style={styles.container}>
          {/* User's Information */}
          <UserProfile />
          
          {/* Learning Progress */}
          <LearningProgress title="Learning Progress" />

          {/* Milestones */}
          <Milestones title="Milestones" />

        </View>

        <View style={{height: 30}} />

      </ScrollView>
    </SafeAreaLayout>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 30
  }
});