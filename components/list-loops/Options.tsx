import React from 'react'
import OptionCard from '../OptionCard'
import GridLayout from '../layouts/GridLayout'
import { getCardContainerWidth } from '@/utils'
import { QuizOptionProps } from '@/types'

const Options: React.FC<QuizOptionProps> = ({ options, answer, isCorrect, selectedOption, height, isSelectionHappened, onSelect}) => {
  const cardWidth = getCardContainerWidth();
  return (
    <GridLayout<string>
      data={options.length ? options : []}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: option }: { item: string }) => (
        <OptionCard
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

export default Options;