import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import CategoryCardList from '@/components/list-loops/CategoryCardList';
// import * as SecureStore from "expo-secure-store";

const HomeScreen = () => (
  <SafeAreaLayout>
    <CategoryCardList />
  </SafeAreaLayout>
);

export default HomeScreen;