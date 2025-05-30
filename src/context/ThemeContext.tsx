import { createContext } from 'react';

import { THEME } from '@/constants/theme';
import { Theme } from '@/libs/types/theme';

interface ThemeContextInterface {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

export const defaultThemeContext: ThemeContextInterface = {
  theme: THEME.LIGHT,
  changeTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextInterface>(defaultThemeContext);
