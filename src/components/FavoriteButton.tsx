import { Pressable, StyleSheet, Text } from 'react-native';
import { useFavorites } from '../store/favorites';
import { Product } from '../types/product';

interface Props {
  product: Product;
}

export function FavoriteButton({ product }: Props) {
  const isFavorite = useFavorites((state) => state.favorites.some((p) => p.id === product.id));
  const toggleFavorite = useFavorites((state) => state.toggleFavorite);

  return (
    <Pressable
      style={[styles.button, isFavorite && styles.buttonActive]}
      onPress={() => toggleFavorite(product)}
    >
      <Text style={[styles.text, isFavorite && styles.textActive]}>
        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1565c0',
    alignItems: 'center',
  },
  buttonActive: { backgroundColor: '#1565c0' },
  text: { color: '#1565c0', fontWeight: '600', fontSize: 16 },
  textActive: { color: '#fff' },
});