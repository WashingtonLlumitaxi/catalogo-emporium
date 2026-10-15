import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductListScreen } from './src/screens/ProductListScreen';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ProductListScreen}
            options={{ title: 'Catálogo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}