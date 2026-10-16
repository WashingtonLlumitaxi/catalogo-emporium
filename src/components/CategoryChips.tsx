import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Category } from '../types/product';

interface Props {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

export function CategoryChips({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Chip label="Todas" active={selected === null} onPress={() => onSelect(null)} />
      {categories.map((category) => (
        <Chip
          key={category.slug}
          label={category.name}
          active={selected === category.slug}
          onPress={() => onSelect(category.slug)}
        />
      ))}
    </ScrollView>
  );
}

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

function Chip({ label, active, onPress }: ChipProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.chip, { backgroundColor: active ? colors.primary : colors.chip }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.chipText,
          { color: active ? colors.onPrimary : colors.chipText },
          active && styles.chipTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, flexShrink: 0 },
  content: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  chipText: {},
  chipTextActive: { fontWeight: '600' },
});