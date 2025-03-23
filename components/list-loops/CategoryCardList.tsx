import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { Category } from '@/types';
import SIZES from '@/constants/size';
import CategoryCard from '../CategoryCard';
import { getCardContainerWidth } from '@/utils';
import { CATEGORY_DATA } from '@/schemes/static-data';

const CategoryCardList = () => {
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);
  return (
    <>
        <FlatList
          data={CATEGORY_DATA}
          keyExtractor={({id}: Category) => id}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: SIZES.cardGap,
            alignItems: 'center'
          }}
          ListHeaderComponent={(<View style={{height:0}}/>)}
          renderItem={({item}: {item: Category}) => (
            <>
              {
                ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
                ? (<CategoryCard catTitle={item.catTitle} slug={item.slug} ImgComponent={item.ImgComponent} containerWidth={cardWidth} marginRight={SIZES.cardGap} />)
                : (<CategoryCard catTitle={item.catTitle} slug={item.slug} ImgComponent={item.ImgComponent} containerWidth={cardWidth} />)
              }
            </>
          )}
          ListFooterComponent={(<View style={{height:20}} />)}
        />
    </>
  )
}

export default CategoryCardList