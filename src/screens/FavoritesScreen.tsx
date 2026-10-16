import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { EmptyView } from '../components/StateView';
import { RootStackParamList } from '../navigation/types';
import { useFavorites } from '../store/favorites';

export function FavoritesScreen() {
  const favorites = useFavorites((state) => state.favorites);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
        />
      )}
      contentContainerStyle={favorites.length === 0 ? styles.empty : undefined}
      ListEmptyComponent={
        <EmptyView message="Aún no tienes favoritos. Abre un producto y agrégalo." />
      }
    />
  );
}

const styles = StyleSheet.create({
  empty: { flexGrow: 1 },
});