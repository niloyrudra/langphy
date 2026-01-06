import React from 'react';
import { UnitLesson } from '@/types';
import SIZES from '@/constants/size';
import GridLayout from '../layouts/GridLayout';
import { LESSON_UNIT_DATA } from '@/schemas/static-data'
import { useLocalSearchParams } from 'expo-router';
import UnitSessionCard from '../UnitSessionCard';

const UnitSessionList = () => {
  const {unitId, categoryId} = useLocalSearchParams();
  return (
    <GridLayout<UnitLesson>
      data={LESSON_UNIT_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <UnitSessionCard
          title={item.title}
          categoryId={categoryId as string}
          unitId={unitId as string}
          slug={item.slug}
          ImgComponent={item.ImgComponent}
          completion={item.completion}
          goal={item.goal}
          marginRight={(parseInt(item?.id) % 2 !== 0) ? SIZES.cardGap : 0}
        />
      )}
    />
  );
}
export default UnitSessionList;