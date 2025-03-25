import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import SIZES from '@/constants/size';

interface GridLayoutProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
  numColumns?: number;
}

const GridLayout = <T,>({
  data,
  renderItem,
  keyExtractor,
  numColumns = 2,
}: GridLayoutProps<T>) => (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
);


const styles = StyleSheet.create({
  contentContainer: {
    gap: SIZES.cardGap,
    alignItems: "center"
  }
});

export default GridLayout;