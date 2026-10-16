import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootStackParamList } from './src/navigation/types';
import { TabNavigator } from './src/navigation/TabNavigator';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { useTheme } from './src/hooks/useTheme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { isDark } = useTheme();
  
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ title: 'Detalle' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}