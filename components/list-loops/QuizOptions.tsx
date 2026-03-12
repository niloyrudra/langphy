import React from 'react'
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
          customStyle={[...(height && [{height: height}] || [])]}
        />
      )}
    />
  );
}

export default QuizOptions;