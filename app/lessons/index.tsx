import React from 'react'
import StatusBarComponent from '@/components/StatusBarComponent'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import CategoryCardList from '@/components/list-loops/CategoryCardList';

const HomeScreen = () => (
  <SafeAreaLayout>
    <StatusBarComponent />
    <CategoryCardList />
  </SafeAreaLayout>
);
export default HomeScreen;