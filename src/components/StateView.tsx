import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export function LoadingView() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

interface ErrorProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorView({ message = 'No se pudo cargar la información', onRetry }: ErrorProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>{message}</Text>
      <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={onRetry}>
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

export function EmptyView({ message = 'No hay resultados' }: { message?: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  text: { fontSize: 16, textAlign: 'center' },
  button: { marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  buttonText: { fontWeight: '600' },
});