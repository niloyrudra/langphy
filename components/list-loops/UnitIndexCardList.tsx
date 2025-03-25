import React from 'react';
import { UnitLesson } from '@/types';
import SIZES from '@/constants/size';
import GridLayout from '../layouts/GridLayout';
import { LESSON_UNIT_DATA } from '@/schemes/static-data'
import LessonUnitIndexCard from '../LessonUnitIndexCard'

const UnitIndexCardList = () => {
  return (
    <GridLayout<UnitLesson>
      data={LESSON_UNIT_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({item}: {item: UnitLesson}) => (<LessonUnitIndexCard title={item.title} slug={item.slug} ImgComponent={item.ImgComponent} completion={item.completion} goal={item.goal} marginRight={(parseInt(item?.id) % 2 !== 0) ? SIZES.cardGap : 0} />)}
    />
  );
}
export default UnitIndexCardList;