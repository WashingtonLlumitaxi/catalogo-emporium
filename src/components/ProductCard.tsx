import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Product } from '../types/product';

interface Props {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable style={[styles.card, { backgroundColor: colors.card }]} onPress={onPress}>
      <Image
        source={{ uri: product.thumbnail }}
        style={[styles.image, { backgroundColor: colors.imagePlaceholder }]}
        contentFit="cover"
      />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={[styles.price, { color: colors.price }]}>${product.price.toFixed(2)}</Text>
        <Text style={[styles.rating, { color: colors.textSecondary }]}>
          🌟 {product.rating.toFixed(1)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 15, marginTop: 4 },
  rating: { fontSize: 13, marginTop: 2 },
});