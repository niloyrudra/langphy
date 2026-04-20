import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import CategoryCardList from '@/components/list-loops/CategoryCardList';

const HomeScreen = () => (
  <SafeAreaLayout edges={['bottom', 'left', 'right']}>
    <CategoryCardList />
  </SafeAreaLayout>
);

export default HomeScreen;