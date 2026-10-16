import { useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { useFavorites } from '../store/favorites';
import { Product } from '../types/product';

interface Props {
  product: Product;
}

export function FavoriteButton({ product }: Props) {
  const isFavorite = useFavorites((state) => state.favorites.some((p) => p.id === product.id));
  const toggleFavorite = useFavorites((state) => state.toggleFavorite);
 const [scale] = useState(() => new Animated.Value(1));
  const handlePress = () => {
    toggleFavorite(product);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable style={[styles.button, isFavorite && styles.buttonActive]} onPress={handlePress}>
        <Text style={[styles.text, isFavorite && styles.textActive]}>
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </Text>
      </Pressable>
    </Animated.View>
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