import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Catalog: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: { id: number };
};