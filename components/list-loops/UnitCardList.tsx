import React from 'react'
import { UnitDataProps } from '@/types'
import { FlatList, View } from 'react-native'
import { UNIT_DATA } from '@/schemes/static-data'
import UnitRectangleCard from '../UnitRectangleCard'
import SIZES from '@/constants/size'

const UnitCardList = () => {
  return (
    <>
      <FlatList
        data={UNIT_DATA}
        keyExtractor={({id}:UnitDataProps) => id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: SIZES.cardGap }}
        ListHeaderComponent={(<View style={{height:0}}/>)}
        renderItem={({item}: {item: UnitDataProps}) => (<UnitRectangleCard title={item.title} completion={item.completion} goal={item.goal} ImgComponent={item.ImgComponent} />)}
        ListFooterComponent={(<View style={{height:30}} />)}
      />
    </>
  );
}

export default UnitCardList;