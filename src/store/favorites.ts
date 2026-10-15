import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from '../types/product'; 

interface FavoritesState {
    favorites: Product[];
    toggleFavorite: (product: Product) => void;
    
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (product) =>
        set((state) => ({
          favorites: state.favorites.some((p) => p.id === product.id)
            ? state.favorites.filter((p) => p.id !== product.id)
            : [...state.favorites, product],
        })),
    }),
    { name: 'favorites', storage: createJSONStorage(() => AsyncStorage) }
  )
);