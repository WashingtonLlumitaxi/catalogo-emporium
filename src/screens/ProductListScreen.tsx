import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export function ProductListScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useProducts('', null);

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <ProductCard product={item} onPress={() => {}} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      refreshing={isRefetching && !isFetchingNextPage}
      onRefresh={refetch}
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  footer: { marginVertical: 16 },
});