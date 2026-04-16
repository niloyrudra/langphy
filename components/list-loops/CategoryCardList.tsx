import React from 'react';
import { LocalCategory } from '@/types';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import { useCategories } from '@/hooks/useCategories';
import LoadingScreenComponent from '../LoadingScreenComponent';

const CategoryCardList = () => {
  const { data: categories, isLoading, isFetching, error } = useCategories();
  if( isLoading || isFetching ) return (<LoadingScreenComponent />);
  return (
    <GridLayout<LocalCategory>
      data={categories?.filter(category => category.position_at !== '63' && category.position_at !== '64') || []}
      keyExtractor={({id}) => id}
      renderItem={({item}: {item: LocalCategory}) => (
        <CategoryCard
          cat_id={item.id}
          title={item.title}
          slug={item.slug}
        />
      )}
    />
  );
}
export default CategoryCardList;