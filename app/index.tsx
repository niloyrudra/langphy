import React from 'react'
import { StyleSheet, View, SafeAreaView, FlatList, ImageSourcePropType, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import CategoryCard from '@/components/CategoryCard'

type Category = {
  id: string,
  catTitle: string,
  slug: string,
  imgSource: ImageSourcePropType | undefined
}

const CATEGORY_DATA = [
  {
    id: '1',
    catTitle: "Greetings",
    slug: "greet",
    imgSource: require("@/assets/images/categories/greetings.png")
  },
  {
    id: '2',
    catTitle: "Introductions",
    slug: "intro",
    imgSource: require("@/assets/images/categories/intro.png")
  },
  {
    id: '3',
    catTitle: "Numbers",
    slug: "numbers",
    imgSource: require("@/assets/images/categories/numbers.png")
  },
  {
    id: '4',
    catTitle: "Time",
    slug: "time",
    imgSource: require("@/assets/images/categories/time.png")
  },
  {
    id: '5',
    catTitle: "Everyday Phrases",
    slug: "phrases",
    imgSource: require("@/assets/images/categories/chat.png")
  },
  {
    id: '6',
    catTitle: "Family & Friends",
    slug: "family",
    imgSource: require("@/assets/images/categories/family.png")
  },
  {
    id: '7',
    catTitle: "Food & Drinks",
    slug: "foods",
    imgSource: require("@/assets/images/categories/foods.png")
  },
  {
    id: '8',
    catTitle: "Directions & Places",
    slug: "locations",
    imgSource: require("@/assets/images/categories/location.png")
  },
]

const App = () => {
  return (
    <SafeAreaProvider>

      <SafeAreaView
        style={styles.container}
      >
        <FlatList
          data={CATEGORY_DATA}
          keyExtractor={({id}:Category) => id}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap:16,
            alignItems: 'center'
          }}
          // ListHeaderComponent={(<View style={{height:50}}/>)}
          renderItem={({item}: {item: Category}) => (
            <>
              {
               ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
                ?
                  (<CategoryCard catTitle={item.catTitle} slug={item.slug} imgSource={item.imgSource} customStyle={{marginRight:16}} />)
                :
                  (<CategoryCard catTitle={item.catTitle} slug={item.slug} imgSource={item.imgSource} />)
              }
            </>
          )}
          ListFooterComponent={(<View style={{height:30}} />)}
        />
      </SafeAreaView>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    margin: 0,
    padding: 0
  }
})

export default App;