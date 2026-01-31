import React from 'react'
import { FlatList, View } from 'react-native'
import UnitRectangleCard from '../UnitRectangleCard'
import SIZES from '@/constants/size'
import { useLocalSearchParams } from 'expo-router'
import LoadingScreenComponent from '../LoadingScreenComponent'
import { useUnits } from '@/hooks/useUnits'
import { LocalUnitType } from '@/types'

const UnitList = () => {
  const { categoryId } = useLocalSearchParams();
  const { data: units, isLoading, isFetching, isSuccess, isError } = useUnits( categoryId as string );

  if( isLoading || isFetching ) return (<LoadingScreenComponent />);
  // console.log("units length:", units?.length)
  return (
    <>
      <FlatList
        data={units}
        keyExtractor={({id}:LocalUnitType) => id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: SIZES.cardGap }}
        ListHeaderComponent={(<View style={{height:0}}/>)}
        renderItem={({item: {title, category_id, id, slug}}: {item: LocalUnitType}) => {
          return (
            <UnitRectangleCard
              title={title}
              categoryId={category_id}
              unitSlug={slug}
              unitId={id}
              completion={0}
              goal={100}
            />
          )
        }}
        ListFooterComponent={(<View style={{height:30}} />)}
      />
    </>
  );
}

export default UnitList;