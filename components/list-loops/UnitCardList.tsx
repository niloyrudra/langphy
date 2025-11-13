import React from 'react'
import { UnitIndividualCategory } from '@/types'
import { ActivityIndicator, FlatList, View } from 'react-native'
import UnitRectangleCard from '../UnitRectangleCard'
import SIZES from '@/constants/size'
import { useLocalSearchParams } from 'expo-router'
import { db } from '@/utils'
import { useTheme } from '@/theme/ThemeContext'

const UnitCardList = () => {
  const {colors} = useTheme();
  const { slug, title } = useLocalSearchParams();
  const [data, setData] = React.useState<UnitIndividualCategory[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // unitData is already an array of UnitIndividualCategory
      const unitData = await db[slug as keyof typeof db];
      
      // TS may still complain if db[slug] could be undefined
      if (Array.isArray(unitData)) {
        setData(unitData);
      } else {
        console.warn(`No data found for slug: ${slug}`);
        setData([]); // fallback
      }
      setLoading(false)
    };
    if( slug ) loadData();
  }, [slug]);
  
  if(loading) return (<ActivityIndicator size={32} color={colors.primary} />)

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={({category}:UnitIndividualCategory) => category}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: SIZES.cardGap }}
        ListHeaderComponent={(<View style={{height:0}}/>)}
        renderItem={({item}: {item: UnitIndividualCategory}) => {
          // console.log("Category:", item.category);
          // console.log("Category Slug", item.category_slug);
          // console.log("UnitIndividualCategory", item);
          return (
            <UnitRectangleCard
              title={item.category}
              unitLessonCategory={item.category as string}
              rootCategory={slug as string}
              completion={item?.completion}
              goal={item?.goal}
              ImgComponent={item?.ImgComponent}
              // items={item?.items || []}
            />
          )
        }}
        ListFooterComponent={(<View style={{height:30}} />)}
      />
    </>
  );
}

export default UnitCardList;