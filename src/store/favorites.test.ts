import { Product } from '../types/product';
import { useFavorites } from './favorites';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const makeProduct = (id: number): Product => ({
  id,
  title: `Producto ${id}`,
  description: 'Descripción de prueba',
  category: 'beauty',
  price: 10,
  discountPercentage: 0,
  rating: 4.5,
  stock: 5,
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/1.jpg'],
});

describe('favorites store', () => {
  beforeEach(() => {
    useFavorites.setState({ favorites: [] });
  });

  it('agrega un producto a favoritos', () => {
    useFavorites.getState().toggleFavorite(makeProduct(1));

    expect(useFavorites.getState().favorites).toHaveLength(1);
    expect(useFavorites.getState().favorites[0].id).toBe(1);
  });

  it('quita el producto si ya era favorito', () => {
    useFavorites.getState().toggleFavorite(makeProduct(1));
    useFavorites.getState().toggleFavorite(makeProduct(1));

    expect(useFavorites.getState().favorites).toHaveLength(0);
  });

  it('guarda varios productos sin mezclarlos', () => {
    useFavorites.getState().toggleFavorite(makeProduct(1));
    useFavorites.getState().toggleFavorite(makeProduct(2));
    useFavorites.getState().toggleFavorite(makeProduct(1));

    const ids = useFavorites.getState().favorites.map((p) => p.id);
    expect(ids).toEqual([2]);
  });
});