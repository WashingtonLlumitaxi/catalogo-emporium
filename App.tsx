import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text, View } from 'react-native';
import { useProducts } from './src/hooks/useProducts';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

const Stack = createNativeStackNavigator();

function Home() {
  const { data, isLoading, isError } = useProducts('', null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <Text>Cargando...</Text>}
      {isError && <Text>Error al cargar</Text>}
      {data && <Text>{data.pages[0].products.length} productos cargados</Text>}
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}