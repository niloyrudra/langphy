import React from 'react'
import { FlatList, View } from 'react-native'
import UnitRectangleCard from '../UnitRectangleCard'
import SIZES from '@/constants/size'
import { useLocalSearchParams } from 'expo-router'
import LoadingScreenComponent from '../LoadingScreenComponent'
import api from '@/lib/api'

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
        const res = await api.get(`/unit/${categoryId}`);
        if(res.status !== 200) return setUnitData([])

        const {data} = res;
        if( data ) setUnitData(data);
      } catch (err) {
        console.error("Error fetching units:", err);
        setUnitData([])
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