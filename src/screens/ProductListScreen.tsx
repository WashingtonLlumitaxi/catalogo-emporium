import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { CategoryChips } from '../components/CategoryChips';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyView, ErrorView, LoadingView } from '../components/StateView';
import { useDebounce } from '../hooks/useDebounce';
import { useCategories, useProducts } from '../hooks/useProducts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

//Type props
//type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


//export function ProductListScreen({ navigation }: Props) {
export function ProductListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search.trim());
  const query = category ? '' : debouncedSearch;

  const { data: categories } = useCategories();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useProducts(query, category);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (category) setCategory(null);
  };

  const handleSelectCategory = (slug: string | null) => {
    setCategory(slug);
    setSearch('');
  };

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  let content;
  if (isLoading) {
    content = <LoadingView />;
  } else if (isError && !data) {
    content = <ErrorView onRetry={refetch} />;
  } else {
    content = (
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductCard 
          product={item} 
           onPress={() => navigation.navigate('ProductDetail', { id: item.id })} 
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching && !isFetchingNextPage}
        onRefresh={refetch}
        contentContainerStyle={products.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          <EmptyView
            message={query ? `No hay resultados para "${query}"` : 'No se encontraron productos'}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={handleSearch} />
      <CategoryChips
        categories={categories ?? []}
        selected={category}
        onSelect={handleSelectCategory}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: { marginVertical: 16 },
  emptyContainer: { flexGrow: 1 },
});