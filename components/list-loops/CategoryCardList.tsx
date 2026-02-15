import React from 'react';
import { LocalCategory } from '@/types';
import SIZES from '@/constants/size';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import { useCategories } from '@/hooks/useCategories';
import LoadingScreenComponent from '../LoadingScreenComponent';

const CategoryCardList = () => {
  const { data: categories, isLoading, isFetching } = useCategories();
  
  if( isLoading || isFetching ) return (<LoadingScreenComponent />);
  return (
    <GridLayout<LocalCategory>
      data={categories || []}
      keyExtractor={({id}) => id}
      renderItem={({item}: {item: LocalCategory}) => (
        <CategoryCard
          cat_id={item.id}
          title={item.title}
          slug={item.slug}
          marginRight={( parseInt(item?.position_at) % 2 !== 0) ? SIZES.cardGap : 0}
        />
      )}
    />
  );
}
export default CategoryCardList;