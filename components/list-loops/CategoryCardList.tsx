import React from 'react';
import { Category } from '@/types';
import SIZES from '@/constants/size';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import LoadingScreenComponent from '../LoadingScreenComponent';
// import { CATEGORY_DATA_V3 } from '@/schemes/static-data';
// import { categoryIcon } from '@/utils';

// const API_BASE = "http://192.168.1.6:3000/api/category";

type CategoryDataType = {
  _id: string,
  title: string,
  slug: string,
  position_at: string
}[]

// const catIcons = categoryIcon;

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