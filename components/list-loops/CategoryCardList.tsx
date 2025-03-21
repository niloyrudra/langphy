import { FlatList, View } from 'react-native'
import React from 'react'
import { CATEGORY_DATA } from '@/schemes/static-data'
import { Category } from '@/types'
import sizes from '@/constants/size'
import CategoryCard from '../CategoryCard'

const CategoryCardList = ({cardWidth}: {cardWidth: number}) => {
  return (
    <>
        <FlatList
          data={CATEGORY_DATA}
          keyExtractor={({id}: Category) => id}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: sizes.cardGap,
            alignItems: 'center'
          }}
          ListHeaderComponent={(<View style={{height:0}}/>)}
          renderItem={({item}: {item: Category}) => (
            <>
              {
                ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
                ? (<CategoryCard catTitle={item.catTitle} slug={item.slug} ImgComponent={item.ImgComponent} containerWidth={cardWidth} marginRight={sizes.cardGap} />)
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