import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
// import { useRouteInfo } from 'expo-router/build/hooks';
import { UnitLesson } from '@/types';
import SIZES from '@/constants/size'
import { getCardContainerWidth } from '@/utils';
import { LESSON_UNIT_DATA } from '@/schemes/static-data'
import LessonUnitIndexCard from '../LessonUnitIndexCard'

const UnitIndexCardList = () => {
  const { width } = useWindowDimensions();
  const cardWidth = getCardContainerWidth(width);
  return (
    <>
      <FlatList
        data={LESSON_UNIT_DATA}
        keyExtractor={({id}: UnitLesson) => id}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: SIZES.cardGap,
          alignItems: 'center'
        }}
        ListHeaderComponent={(<View style={{height:0}}/>)}
        renderItem={({item}: {item: UnitLesson}) => (
          <>
            {
              ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
              ? (
                  <LessonUnitIndexCard
                    title={item.title}
                    slug={item.slug}
                    ImgComponent={item.ImgComponent}
                    completion={item.completion}
                    goal={item.goal}
                    containerWidth={cardWidth}
                    marginRight={SIZES.cardGap}
                  />
                )
              
              : (
                <LessonUnitIndexCard
                  title={item.title}
                  slug={item.slug}
                  ImgComponent={item.ImgComponent}
                  completion={item.completion}
                  goal={item.goal}
                  containerWidth={cardWidth}
                />
              )
            }
          </>
        )}
        ListFooterComponent={(<View style={{height:20}} />)}
      />
    </>
  )
}
export default UnitIndexCardList;