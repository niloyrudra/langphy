import React from 'react'
import { FlatList, View } from 'react-native'
import UnitRectangleCard from '../UnitRectangleCard'
import SIZES from '@/constants/size'
import { useLocalSearchParams } from 'expo-router'
import LoadingScreenComponent from '../LoadingScreenComponent'

type unitItemType = {
  _id: string,
  categoryId: string,
  title: string,
  slug: string
}

const UnitList = () => {
  const { categoryId } = useLocalSearchParams();
  const [ unitData, setUnitData ] = React.useState<unitItemType[]>([]);
  const [ loading, setLoading ] = React.useState<boolean>(false);

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
        renderItem={({item: {title, categoryId, _id, slug}}: {item: unitItemType}) => {
          return (
            <UnitRectangleCard
              title={title}
              categoryId={categoryId}
              unitSlug={slug}
              unitId={_id}
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