import { THEME } from '@/constants/theme';

export type Theme = THEME.LIGHT | THEME.DARK;

export interface ThemeConfig {
  theme?: string;
}

export interface ColorCategory {
  default?: string;
  primary?: string;
  neutral?: string;
}
