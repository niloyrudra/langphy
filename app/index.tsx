import React from 'react'
import { SvgProps } from 'react-native-svg';
import { StyleSheet, View, SafeAreaView, FlatList, ImageSourcePropType, StatusBar, useWindowDimensions } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import CategoryCard from '@/components/CategoryCard'
import { useTheme } from '@/theme/ThemeContext'
import sizes from '@/constants/size'

import GreetingsIcon from '@/assets/images/categories/svgs/greetings.svg';
import IntroIcon from '@/assets/images/categories/svgs/intro.svg';
import NumbersIcon from '@/assets/images/categories/svgs/numbers.svg';
import TimeIcon from '@/assets/images/categories/svgs/time.svg';
import ChatIcon from '@/assets/images/categories/svgs/chat.svg';
import FamilyIcon from '@/assets/images/categories/svgs/family.svg';
import FoodsIcon from '@/assets/images/categories/svgs/foods.svg';
import LocationIcon from '@/assets/images/categories/svgs/location.svg';

type Category = {
  id: string,
  catTitle: string,
  slug: string,
  ImgComponent: React.FC<SvgProps>
  // imgSource: ImageSourcePropType | undefined
}

const CATEGORY_DATA = [
  {
    id: '1',
    catTitle: "Greetings",
    slug: "greet",
    // imgSource: require("@/assets/images/categories/greetings.png")
    ImgComponent: GreetingsIcon
  },
  {
    id: '2',
    catTitle: "Introductions",
    slug: "intro",
    // imgSource: require("@/assets/images/categories/intro.png")
    ImgComponent: IntroIcon
  },
  {
    id: '3',
    catTitle: "Numbers",
    slug: "numbers",
    // imgSource: require("@/assets/images/categories/numbers.png")
    ImgComponent: NumbersIcon
  },
  {
    id: '4',
    catTitle: "Time",
    slug: "time",
    // imgSource: require("@/assets/images/categories/time.png")
    ImgComponent: TimeIcon
  },
  {
    id: '5',
    catTitle: "Everyday Phrases",
    slug: "phrases",
    // imgSource: require("@/assets/images/categories/chat.png")
    ImgComponent: ChatIcon
  },
  {
    id: '6',
    catTitle: "Family & Friends",
    slug: "family",
    // imgSource: require("@/assets/images/categories/family.png")
    ImgComponent: FamilyIcon
  },
  {
    id: '7',
    catTitle: "Food & Drinks",
    slug: "foods",
    // imgSource: require("@/assets/images/categories/foods.png")
    ImgComponent: FoodsIcon
  },
  {
    id: '8',
    catTitle: "Directions & Places",
    slug: "locations",
    // imgSource: require("@/assets/images/categories/location.png")
    ImgComponent: LocationIcon
  },
  {
    id: '9',
    catTitle: "Greetings 2",
    slug: "greetings-2",
    // imgSource: require("@/assets/images/categories/svgs/greetings.svg")
    ImgComponent: GreetingsIcon
  },
]

const App = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = (width - ( (sizes.bodyPaddingHorizontal*2) + sizes.cardGap )) / 2;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {/* {
          (theme === 'light')
          ? (<StatusBar animated={true} barStyle="light-content" />)
          : (<StatusBar animated={true} barStyle="dark-content" />)
        } */}
        {/* {
          theme === 'light' ?
          (<StatusBar animated={true} barStyle="light-content" backgroundColor={colors.background} />)
          : (<StatusBar animated={true} barStyle="dark-content" backgroundColor={colors.background} />)
        } */}
        
        <FlatList
          data={CATEGORY_DATA}
          keyExtractor={({id}:Category) => id}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: sizes.cardGap,
            alignItems: 'center'
          }}
          ListHeaderComponent={(<View style={{height:0}}/>)}
          renderItem={({item}: {item: Category}) => (
            <>
              {
                ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
                ? (<CategoryCard catTitle={item.catTitle} slug={item.slug} ImgComponent={item.ImgComponent} containerWidth={cardWidth} marginRight={sizes.cardGap} />)
                : (<CategoryCard catTitle={item.catTitle} slug={item.slug} ImgComponent={item.ImgComponent} containerWidth={cardWidth} />)
              }
            </>
          )}
          ListFooterComponent={(<View style={{height:20}} />)}
        />
      </SafeAreaView>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  }
})

export default App;