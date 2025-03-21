import { FlatList, View } from 'react-native'
import React from 'react'
import { Quiz } from '@/types'
import { QUIZ_DATA } from '@/schemes/static-data'
import sizes from '@/constants/size'

import QuizOptionCard from '../QuizOptionCard'

const QuizOptionCardList = ({cardWidth}: {cardWidth: number}) => {
  return (
    <>
        <FlatList
          data={QUIZ_DATA}
          keyExtractor={({id}: Quiz) => id}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: sizes.cardGap,
            alignItems: 'center'
          }}
          ListHeaderComponent={(<View style={{height:0}}/>)}
          renderItem={({item}: {item: Quiz}) => (
            <>
              {
                ( parseInt(item?.id) === 1 || parseInt(item?.id) % 2 === 1 )
                ? (<QuizOptionCard title={item.title} isCorrect={item.isCorrect} containerWidth={cardWidth} marginRight={sizes.cardGap} />)
                : (<QuizOptionCard title={item.title} isCorrect={item.isCorrect} containerWidth={cardWidth} />)
              }
            </>
          )}
          ListFooterComponent={(<View style={{height:20}} />)}
        />
    </>
  )
}

export default QuizOptionCardList;