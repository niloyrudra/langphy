import React from 'react'
import { UnitIndividualCategory } from '@/types'
import { ActivityIndicator, FlatList, View } from 'react-native'
import UnitRectangleCard from '../UnitRectangleCard'
import SIZES from '@/constants/size'
import { useLocalSearchParams } from 'expo-router'
// import { db } from '@/utils'
import { useTheme } from '@/theme/ThemeContext'
import LoadingScreenComponent from '../LoadingScreenComponent'

// const UNIT_API_BASE = "http://192.168.1.6:3000/api/unit";

type unitItemType = {
  _id: string,
  categoryId: string,
  title: string,
  slug: string
}[]

const UnitCardList = () => {
  const { categoryId } = useLocalSearchParams();
  const [ unitData, setUnitData ] = React.useState<unitItemType[]>([]);
  const [ loading, setLoading ] = React.useState<boolean>(false);

  // console.log("Cat Id:", categoryId)

  React.useEffect(() => {
    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/unit/category/${categoryId}`);
        if (!res.ok) {
          console.error("Error fetching units:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUnitData(data)
      } catch (err) {
        console.error("Error fetching units:", err);
        setUnitData([])
        // throw err;
      }
      setLoading(false)
    }

    dataLoad();
    if( categoryId ) dataLoad();
  }, [categoryId]);
  
  if( loading ) return (<LoadingScreenComponent />);

  return (
    <>
      <FlatList
        data={unitData}
        keyExtractor={({_id}:unitItemType) => _id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: SIZES.cardGap }}
        ListHeaderComponent={(<View style={{height:0}}/>)}
        renderItem={({item}: {item: unitItemType}) => {
          return (
            <UnitRectangleCard
              title={item?.title}
              categoryId={item?.categoryId as string}
              unitId={ item?._id as string}
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

export default UnitCardList;