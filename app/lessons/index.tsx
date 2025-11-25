import React from 'react'
import SafeAreaLayout from '@/components/layouts/SafeAreaLayout';
import CategoryCardList from '@/components/list-loops/CategoryCardList';

const HomeScreen = () => {
  // React.useEffect(() => {
  //     const loadData = async () => {
  //       // setLoading(true)
  //       // unitData is already an array of UnitIndividualCategory
  //       const unitData = await db;
        
  //       // console.log( unitData )
  //       // TS may still complain if db[slug] could be undefined
  //       if (unitData) {
          
  //         // const unitArray = Object.values(unitData); // .flat();
  //         const unitArray = unitData as any[]; // .flat();

  //         // console.log(unitArray[473]?.items.length)

  //         const newData = (units as any)
  //           .filter((item: any, idx: number) => item?.title === (unitArray[idx] as any)?.category)
  //           .map((item: any, idx: number) => {
  //             // Match found → map children
  //             const children = (unitArray[idx] as any)?.items || [];
  //               return children.map((child: Record<string, any>) => ({
  //                 categoryId: item.categoryId,
  //                 unitId: item.unitId,
  //                 phrase: child?.phrase
  //                 // ...child,
  //               }));
  //         });

  //         console.log(newData.flat())

  //         // setData(unitArray);
  //       } else {
  //         console.warn(`No data found`);
  //         // setData([]); // fallback
  //       }
  //       // setLoading(false)
  //     };
  //     loadData();
  //   }, []);
  return (
    <SafeAreaLayout>
      <CategoryCardList />
    </SafeAreaLayout>
  );
};
export default HomeScreen;