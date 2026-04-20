import React from 'react';
import UnitList from '@/components/list-loops/UnitList';
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';

const CategoryScreen = () => (
  <SafeAreaLayout edges={['bottom', 'left', 'right']}>
    <UnitList />
  </SafeAreaLayout>  
);

export default CategoryScreen;