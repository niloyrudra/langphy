import React from 'react'
// import { Quiz } from '@/types'
import { QUIZ_DATA } from '@/schemes/static-data'
import SIZES from '@/constants/size'

import QuizOptionCard from '../QuizOptionCard'
import GridLayout from '../layouts/GridLayout'
import { getCardContainerWidth } from '@/utils'

const QuizOptionCardList = ({ options, answer, selectedOption, height, isSelectionHappened, onSelect}: { options: [string, string, string, string], answer: string, selectedOption?: string, height?: number, isSelectionHappened: boolean, onSelect: (title: string, isCorrect: boolean ) => void }) => {
  const cardWidth = getCardContainerWidth();

  const optionRef = React.useRef<Map<string, any>>(new Map());

  return (
    <GridLayout<string>
      data={options.length ? options : QUIZ_DATA.map(item => item.title)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item: option }: { item: string }) => (
        <QuizOptionCard
          option={option}
          selectedOption={selectedOption ?? ''}
          answer={answer}
          isSelectionHappened={isSelectionHappened}
          onSelect={(selected) => {
            const isCorrect = selected === answer;
            onSelect(selected, isCorrect);
          }}
          containerWidth={cardWidth}
          marginRight={ options?.indexOf( option ) == 0 || options?.indexOf( option ) == 2 ? SIZES.cardGap : 0 }
          customStyle={[...(height && [{height: height}] || [])]}
        />
      )}
    />
  );
}

export default QuizOptionCardList;