import React from 'react'
import SIZES from '@/constants/size'
import QuizOptionCard from '../QuizOptionCard'
import GridLayout from '../layouts/GridLayout'
import { getCardContainerWidth } from '@/utils'
import { QuizOptionProps } from '@/types'

const QuizOptions: React.FC<QuizOptionProps> = ({ options, answer, isCorrect, selectedOption, height, isSelectionHappened, onSelect}) => {
  const cardWidth = getCardContainerWidth();
  return (
    <GridLayout<string>
      data={options.length ? options : []}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: option }: { item: string }) => (
        <QuizOptionCard
          option={option}
          selectedOption={selectedOption ?? ''}
          answer={answer}
          isCorrect={ isCorrect }
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

export default QuizOptions;