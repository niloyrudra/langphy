import React from 'react';
import { LocalCategory } from '@/types';
import CategoryCard from '../CategoryCard';
import GridLayout from '../layouts/GridLayout';
import { useCategories } from '@/hooks/useCategories';
import LoadingScreenComponent from '../LoadingScreenComponent';
import OfflineCategoryGuard from '../offline/OfflineCategoryGuard';
import { RefreshControl } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

const CategoryCardList = () => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: categories, isLoading, isFetching, error, refetch } = useCategories();
 
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if( isLoading ) return (<LoadingScreenComponent />);
  if (error || !categories?.length) {
    return (
      <OfflineCategoryGuard
        reason={error ? "fetch_failed" : "no_data"}
        onRetry={refetch}
      />
    );
  }
  return (
    <GridLayout<LocalCategory>
      data={categories || []}
      keyExtractor={({id}) => id}
      renderItem={({item}: {item: LocalCategory}) => (
        <CategoryCard
          cat_id={item.id}
          title={item.title}
          slug={item.slug}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    />
  );
}
export default CategoryCardList;