import React from 'react';
import { UnitLesson } from '@/types';
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
          // completion={item.completion}
          // goal={item.goal}
        />
      )}
    />
  );
}
export default UnitSessionList;