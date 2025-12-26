import React from 'react';
import { Category } from '@/types';
import SIZES from '@/constants/size';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import LoadingScreenComponent from '../LoadingScreenComponent';

console.log(`${process.env.EXPO_PUBLIC_API_BASE}/category`);

const CategoryCardList = () => {

  const [loading, setLoading] = React.useState<boolean>(false)
  const [ categories, setCategories ] = React.useState<Category[]>([])

  React.useEffect(() => {

    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/category`);
        if (!res.ok) {
          console.error("Error fetching categories:", res.status);
          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data)
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([])
        // throw err;
      }
      setLoading(false)
    }

    dataLoad();

    return setCategories([])
  }, []);

  // console.log(catIcons['airport'])
  // console.log(process.env.EXPO_PUBLIC_API_BASE)
  if( loading ) return (<LoadingScreenComponent />);

  return (
    <GridLayout<Category>
      data={categories || []}
      keyExtractor={(item) => item._id}
      renderItem={({item}: {item: Category}) => (
        <CategoryCard
          cat_id={item._id}
          title={item.title}
          slug={item.slug}
          marginRight={( parseInt(item?.position_at) % 2 !== 0) ? SIZES.cardGap : 0}
        />
      )}
    />
  );
}
export default CategoryCardList;