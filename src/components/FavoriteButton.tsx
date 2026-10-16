import { useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useFavorites } from '../store/favorites';
import { Product } from '../types/product';

interface Props {
  product: Product;
}

export function FavoriteButton({ product }: Props) {
  const { colors } = useTheme();
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
      <Pressable
        style={[
          styles.button,
          { borderColor: colors.primary },
          isFavorite && { backgroundColor: colors.primary },
        ]}
        onPress={handlePress}
      >
        <Text style={[styles.text, { color: isFavorite ? colors.onPrimary : colors.primary }]}>
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
    alignItems: 'center',
  },
  text: { fontWeight: '600', fontSize: 16 },
});