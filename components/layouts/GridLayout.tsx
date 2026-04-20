import React, { JSX, JSXElementConstructor } from 'react';
import { FlatList, View, StyleSheet, RefreshControlProps } from 'react-native';
import SIZES from '@/constants/size';

interface GridLayoutProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
  numColumns?: number;
  // Optional — pass a <RefreshControl> from the parent when pull-to-refresh
  // is needed. Keeping it optional means GridLayout stays generic and the
  // lesson list (which explicitly does NOT want refresh) just omits it.
  refreshControl?: React.ReactElement<RefreshControlProps, string | JSXElementConstructor<any>>;
}

const GridLayout = <T,>({
  data,
  renderItem,
  keyExtractor,
  numColumns = 2,
  refreshControl
}: GridLayoutProps<T>) => (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
      refreshControl={refreshControl}
      ListFooterComponent={<View style={styles.space} />}
    />
);
export default GridLayout;

const styles = StyleSheet.create({
  contentContainer: {
    gap: SIZES.cardGap,
    alignItems: "center"
  },
  columnWrapper: {
    gap: SIZES.cardGap
  },
  space: {height: 20}
});