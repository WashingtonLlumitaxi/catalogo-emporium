import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FavoriteButton } from '../components/FavoriteButton';
import { ImageGallery } from '../components/ImageGallery';
import { ErrorView, LoadingView } from '../components/StateView';
import { useProduct } from '../hooks/useProducts';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const { id } = route.params;
  const { data: product, isLoading, isError, refetch } = useProduct(id);

  if (isLoading) return <LoadingView />;
  if (isError || !product) return <ErrorView onRetry={refetch} />;

  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ImageGallery images={images} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
        <Text style={[styles.price, { color: colors.price }]}>{`$${product.price.toFixed(2)}`}</Text>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>{`⭐ ${product.rating.toFixed(1)}   -   Stock: ${product.stock}`}</Text>
        <FavoriteButton product={product} />
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700' },
  price: { fontSize: 20, marginTop: 6 },
  meta: { fontSize: 14, marginTop: 4 },
  description: { fontSize: 15, lineHeight: 22, marginTop: 16 },
});