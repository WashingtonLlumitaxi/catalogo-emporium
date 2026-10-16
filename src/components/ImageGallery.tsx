import { Image } from 'expo-image';
import { useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

interface Props {
  images: string[];
}

export function ImageGallery({ images }: Props) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri, i) => `${uri}-${i}`}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, height: width }} contentFit="contain" />
        )}
      />
      <View style={styles.dots}>
        {images.map((uri, i) => (
          <View key={`${uri}-${i}`} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc' },
  dotActive: { backgroundColor: '#1565c0' },
});