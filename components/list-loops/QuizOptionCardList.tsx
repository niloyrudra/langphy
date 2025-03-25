import React from 'react'
import { Quiz, QuizProps } from '@/types'
import { QUIZ_DATA } from '@/schemes/static-data'
import SIZES from '@/constants/size'

import QuizOptionCard from '../QuizOptionCard'
import GridLayout from '../layouts/GridLayout'

const QuizOptionCardList = ({cardWidth, height}: {cardWidth: number, height?: number}) => {
  return (
    <GridLayout<Quiz>
      data={QUIZ_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({item: {id, title, isCorrect}}: {item: Quiz}) => (
        <>
          {
            ( parseInt(id) === 1 || parseInt(id) % 2 === 1 )
            ? (<QuizOptionCard title={title} isCorrect={isCorrect} containerWidth={cardWidth} marginRight={SIZES.cardGap} customStyle={[(height && {height: height})]} />)
            : (<QuizOptionCard title={title} isCorrect={isCorrect} containerWidth={cardWidth} customStyle={[(height && {height: height})]} />)
          }
        </>
      )}
    />
  );
}

export default QuizOptionCardList;