import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import CategoryCardList from '@/components/list-loops/CategoryCardList';
// import { warmUpSpeech } from '@/helpers/speechController';
// import { useAuth } from '@/context/AuthContext';

const HomeScreen = () => {
  // const { user } = useAuth();
  
  return (
    <SafeAreaLayout>
      <CategoryCardList />
    </SafeAreaLayout>
  );
};

export default HomeScreen;