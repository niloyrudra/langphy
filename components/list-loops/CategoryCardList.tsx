import React from 'react';
import { Category } from '@/types';
import SIZES from '@/constants/size';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import { CATEGORY_DATA_V3 } from '@/schemes/static-data';

const CategoryCardList = () => {
  return (
    <GridLayout<Category>
      data={CATEGORY_DATA_V3}
      keyExtractor={(item) => item.id}
      renderItem={({item}: {item: Category}) => (<CategoryCard title={item.title} slug={item.slug} ImgComponent={item.ImgComponent} marginRight={( parseInt(item?.id) % 2 !== 0) ? SIZES.cardGap : 0} />)}
    />
  );
}
export default CategoryCardList;