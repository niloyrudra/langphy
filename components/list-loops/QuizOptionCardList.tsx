import React from 'react'
import { Quiz } from '@/types'
import { QUIZ_DATA } from '@/schemes/static-data'
import SIZES from '@/constants/size'

import QuizOptionCard from '../QuizOptionCard'
import GridLayout from '../layouts/GridLayout'
import { getCardContainerWidth } from '@/utils'

const QuizOptionCardList = ({ height, isSelectionHappened, onSelect}: { height?: number, isSelectionHappened: boolean, onSelect: (title: string, isCorrect: boolean ) => void }) => {
  const cardWidth = getCardContainerWidth();
  return (
    <GridLayout<Quiz>
      data={QUIZ_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({item: {id, title, isCorrect}}: {item: Quiz}) => (
        <QuizOptionCard
          title={title}
          isCorrect={isCorrect}
          isSelectionHappened={isSelectionHappened}
          onSelect={onSelect}
          containerWidth={cardWidth}
          marginRight={(parseInt(id) % 2 !== 0) ? SIZES.cardGap : 0}
          customStyle={[...(height && [{height: height}] || [])]}
        />
      )}
    />
  );
}

export default QuizOptionCardList;