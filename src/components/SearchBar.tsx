import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: Props) {
    const { colors } = useTheme();

    return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar productos"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 12 },
  input: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
  },
});