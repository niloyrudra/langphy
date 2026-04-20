import React from 'react';
import { LocalCategory } from '@/types';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import { useCategories } from '@/hooks/useCategories';
import LoadingScreenComponent from '../LoadingScreenComponent';
import OfflineCategoryGuard from '../offline/OfflineCategoryGuard';

const CategoryCardList = () => {
  const { data: categories, isLoading, isFetching, error, refetch } = useCategories();
  if( isLoading || isFetching ) return (<LoadingScreenComponent />);
  if (error || !categories?.length) {
    return (
      <OfflineCategoryGuard
        reason={error ? "fetch_failed" : "no_data"}
        onRetry={refetch}
      />
    );
  }
  return (
    <GridLayout<LocalCategory>
      data={categories || []}
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