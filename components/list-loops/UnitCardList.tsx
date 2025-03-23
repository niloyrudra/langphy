import { FlatList, View } from 'react-native'
import React from 'react'
import { UNIT_DATA } from '@/schemes/static-data'
import { UnitDataProps } from '@/types'
import UnitRectangleCard from '../UnitRectangleCard'

const UnitCardList = () => {
    return (
        <>
            <FlatList
                data={UNIT_DATA}
                keyExtractor={({id}:UnitDataProps) => id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    gap:16,
                }}
                ListHeaderComponent={(<View style={{height:0}}/>)}
                renderItem={({item}: {item: UnitDataProps}) => (<UnitRectangleCard title={item.title} completion={item.completion} goal={item.goal} ImgComponent={item.ImgComponent} />)}
                ListFooterComponent={(<View style={{height:30}} />)}
            />
        </>
    );
}

export default UnitCardList;