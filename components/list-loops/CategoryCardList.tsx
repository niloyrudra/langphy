import React from 'react';
import { Category } from '@/types';
import SIZES from '@/constants/size';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import { CATEGORY_DATA_V2 } from '@/schemes/static-data';

const CategoryCardList = () => {
  return (
    <GridLayout<Category>
      data={CATEGORY_DATA_V2}
      keyExtractor={(item) => item.id}
      renderItem={({item}: {item: Category}) => (
        <>
          {
            ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
            ? (<CategoryCard title={item.title} slug={item.slug} ImgComponent={item.ImgComponent} marginRight={SIZES.cardGap} />)
            : (<CategoryCard title={item.title} slug={item.slug} ImgComponent={item.ImgComponent} />)
          }
        </>
      )}
    />
  );
}
export default CategoryCardList;