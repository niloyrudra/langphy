// import React from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import { UnitLesson, UnitLessonItemProps } from '@/types';
// import SIZES from '@/constants/size';
// import GridLayout from '../layouts/GridLayout';
// import { LESSON_UNIT_DATA } from '@/schemes/static-data';
// import LessonUnitIndexCard from '../LessonUnitIndexCard';

// const UnitIndexCardList = () => {
//   const { title, category,  } = useLocalSearchParams();

//   // Parse 'items' param safely (expected: JSON string of UnitLessonItemProps[])
//   // let parsedItems: UnitLessonItemProps[] = [];
//   // try {
//   //   parsedItems = items ? JSON.parse(items as string) : [];
//   // } catch (err) {
//   //   console.warn('Invalid items JSON:', err);
//   // }

//   return (
//     <GridLayout<UnitLesson>
//       data={LESSON_UNIT_DATA}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <LessonUnitIndexCard
//           title={item.title}
//           slug={item.slug}
//           ImgComponent={item.ImgComponent}
//           completion={item.completion}
//           goal={item.goal}
//           id={item.id}
//           marginRight={(parseInt(item.id) % 2 !== 0) ? SIZES.cardGap : 0}
//           // ✅ Pass parsedItems (UnitLessonItemProps[]) as children lessons
//           // items={parsedItems}
//         />
//       )}
//     />
//   );
// };

// export default UnitIndexCardList;


import React from 'react';
import { UnitLesson, UnitLessonProps } from '@/types';
import SIZES from '@/constants/size';
import GridLayout from '../layouts/GridLayout';
import { LESSON_UNIT_DATA } from '@/schemes/static-data'
import LessonUnitIndexCard from '../LessonUnitIndexCard'
import { useLocalSearchParams } from 'expo-router';

const UnitIndexCardList = () => {
   const {unitLessonCategory, rootCategory} = useLocalSearchParams();
  //  console.log(unitLessonCategory, rootCategory);
  return (
    <GridLayout<UnitLesson>
      data={LESSON_UNIT_DATA}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <LessonUnitIndexCard
          title={item.title}
          rootCategory={rootCategory as string}
          unitLessonCategory={unitLessonCategory as string}
          slug={item.slug}
          ImgComponent={item.ImgComponent}
          completion={item.completion}
          goal={item.goal}
          marginRight={(parseInt(item?.id) % 2 !== 0) ? SIZES.cardGap : 0}
          id={''}
        />
      )}
    />
  );
}
export default UnitIndexCardList;