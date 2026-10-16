import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../theme/colors';

export function useTheme() {
  const isDark = useColorScheme() === 'dark';
  return { isDark, colors: isDark ? darkColors : lightColors };
}