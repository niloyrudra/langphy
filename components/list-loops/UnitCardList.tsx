import React from 'react'
import { UnitIndividualCategory } from '@/types'
import { FlatList, View } from 'react-native'
import UnitRectangleCard from '../UnitRectangleCard'
import SIZES from '@/constants/size'
import { useLocalSearchParams } from 'expo-router'
import { db } from '@/utils'

const UnitCardList = () => {
  const { slug, title } = useLocalSearchParams();
  const [data, setData] = React.useState<UnitIndividualCategory[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      // unitData is already an array of UnitIndividualCategory
      const unitData = await db[slug as keyof typeof db];
      
      // TS may still complain if db[slug] could be undefined
      if (Array.isArray(unitData)) {
        setData(unitData);
      } else {
        console.warn(`No data found for slug: ${slug}`);
        setData([]); // fallback
      }
    };
    if( slug ) loadData();
  }, [slug]);
  
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={({category}:UnitIndividualCategory) => category}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: SIZES.cardGap }}
        ListHeaderComponent={(<View style={{height:0}}/>)}
        renderItem={({item}: {item: UnitIndividualCategory}) => (<UnitRectangleCard title={item.category} completion={item?.completion} goal={item?.goal} ImgComponent={item?.ImgComponent} />)}
        ListFooterComponent={(<View style={{height:30}} />)}
      />
    </>
  );
}

export default UnitCardList;