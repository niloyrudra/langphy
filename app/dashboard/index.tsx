import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import UserProfile from '@/components/dashboard/UserProfile';
import LearningProgress from '@/components/dashboard/LearningProgress';
import Milestones from '@/components/dashboard/Milestones';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: profile, isLoading, isFetching, refetch } = useProfile(  user?.id as string );
  const onRefresh = React.useCallback( () => refetch(), [refetch] );

  React.useEffect(() => console.log("Dashboard Profile Data:", profile), [profile]);

  return (
    <SafeAreaLayout>
      <ScrollView
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading || isFetching} onRefresh={onRefresh} />}
      >

        <View style={styles.container}>
          {/* User's Information */}
          <UserProfile profile={profile!} isLoading={isLoading} isFetching={isFetching} />
          
          {/* Learning Progress */}
          <LearningProgress title="Learning Progress" />

          {/* Milestones */}
          <Milestones title="Milestones" />

        </View>

      </ScrollView>
    </SafeAreaLayout>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 30,
    marginBottom: 30
  }
});