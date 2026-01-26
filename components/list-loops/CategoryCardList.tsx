import React from 'react';
import { Category } from '@/types';
import SIZES from '@/constants/size';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import LoadingScreenComponent from '../LoadingScreenComponent';
import api from '@/lib/api';

const CategoryCardList = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [ categories, setCategories ] = React.useState<Category[]>([])

  React.useEffect(() => {

    const dataLoad = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/category`);
        if(res.status !== 200) return setCategories([])
        
        const {data} = res;  
        if( data ) setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([])
      }
      setLoading(false)
    }

    dataLoad();

    return setCategories([]);
  }, []);

  if( loading ) return (<LoadingScreenComponent />);

  return (
    <GridLayout<Category>
      data={categories}
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