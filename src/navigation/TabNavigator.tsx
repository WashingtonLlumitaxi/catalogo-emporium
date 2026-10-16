import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import { useFavorites } from '../store/favorites';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const favoritesCount = useFavorites((state) => state.favorites.length);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Catalog"
        component={ProductListScreen}
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, size }) => <Ionicons name="grid" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}