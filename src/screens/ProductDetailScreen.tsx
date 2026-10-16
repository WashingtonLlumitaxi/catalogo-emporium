import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FavoriteButton } from '../components/FavoriteButton';
import { ImageGallery } from '../components/ImageGallery';
import { ErrorView, LoadingView } from '../components/StateView';
import { useProduct } from '../hooks/useProducts';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  const { id } = route.params;
  const { data: product, isLoading, isError, refetch } = useProduct(id);

  if (isLoading) return <LoadingView />;
  if (isError || !product) return <ErrorView onRetry={refetch} />;

  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <ScrollView style={styles.container}>
      <ImageGallery images={images} />
      <View style={styles.body}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{`$${product.price.toFixed(2)}`}</Text>
        <Text style={styles.meta}>{`⭐ ${product.rating.toFixed(1)}   ·   Stock: ${product.stock}`}</Text>
        <FavoriteButton product={product} />
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700' },
  price: { fontSize: 20, color: '#2e7d32', marginTop: 6 },
  meta: { fontSize: 14, color: '#555', marginTop: 4 },
  description: { fontSize: 15, lineHeight: 22, color: '#333', marginTop: 16 },
});