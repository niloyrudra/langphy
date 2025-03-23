import React from 'react';
import { FlatList, View } from 'react-native';
import { UnitLesson } from '@/types';

import { LESSON_UNIT_DATA } from '@/schemes/static-data'

import sizes from '@/constants/size'

import LessonUnitIndexCard from '../LessonUnitIndexCard'

const UnitIndexCardList = ({cardWidth}: {cardWidth: number}) => {
  return (
    <>
      <FlatList
        data={LESSON_UNIT_DATA}
        keyExtractor={({id}: UnitLesson) => id}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: sizes.cardGap,
          alignItems: 'center'
        }}
        ListHeaderComponent={(<View style={{height:0}}/>)}
        renderItem={({item}: {item: UnitLesson}) => (
          <>
            {
              ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
              ? (<LessonUnitIndexCard title={item.title} slug={item.slug} ImgComponent={item.ImgComponent} completion={item.completion} goal={item.goal} containerWidth={cardWidth} marginRight={sizes.cardGap} />)
              
              : (<LessonUnitIndexCard title={item.title} slug={item.slug} ImgComponent={item.ImgComponent} completion={item.completion} goal={item.goal} containerWidth={cardWidth} />)
            }
          </>
        )}
        ListFooterComponent={(<View style={{height:20}} />)}
      />
    </>
  )
}

export default UnitIndexCardList;