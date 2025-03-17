import { StyleSheet, FlatList, View, ImageBackgroundProps, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeContext';

import SubCategoryCard from '@/components/SubCategoryCard';
import sizes from '@/constants/size';

interface SubCategory {
  id: string,
  title: string,
  completion: number,
  imgSource: ImageBackgroundProps | undefined
}

const SUB_CATEGORY_DATA = [
  {
    id: '1',
    title: 'Hello',
    completion: 80,
    imgSource: require('@/assets/images/categories/sub-categories/open-archive.png')
  },
  {
    id: '2',
    title: 'Good Day!',
    completion: 60,
    imgSource: require('@/assets/images/categories/sub-categories/open-archive.png')
  },
  {
    id: '3',
    title: 'Good Bye!',
    completion: 40,
    imgSource: require('@/assets/images/categories/sub-categories/open-archive.png')
  },
];

const Category = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>

      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}
      >
        <FlatList
          data={SUB_CATEGORY_DATA}
          keyExtractor={({id}:SubCategory) => id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap:16,
          }}
          ListHeaderComponent={(<View style={{height:20}}/>)}
          renderItem={({item}: {item: SubCategory}) => (
            <>
              {
               ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
                ?
                  (<SubCategoryCard title={item.title} completion={item.completion} imgSource={item.imgSource} customStyle={{marginRight:25}} />)
                :
                  (<SubCategoryCard title={item.title} completion={item.completion} imgSource={item.imgSource} />)
              }
            </>
          )}
          ListFooterComponent={(<View style={{height:30}} />)}
        />
      </SafeAreaView>

    </SafeAreaProvider>
  );
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: sizes.bodyPaddingHorizontal,
  }
})