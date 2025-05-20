'use client';

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { THEME } from '@/constants/theme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { themesOptions } from '@/theme';
import { Theme } from '@/types/theme';
import { ThemeContext } from '@/context/ThemeContext';

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useLocalStorage('theme-config', { theme: THEME.LIGHT });
  // To tackle the hydration error, we need to use the same value for the initial state and the state
  const [currentTheme, setCurrentTheme] = useState(config?.theme ?? THEME.LIGHT);

  const changeTheme = useCallback(
    (theme: Theme) => {
      setConfig({ theme });
    },
    [setConfig]
  );

  useEffect(() => {
    setCurrentTheme(config?.theme);
  }, [config?.theme]);

  const darkTheme = createTheme(themesOptions?.[THEME.DARK]);
  const lightTheme = createTheme(themesOptions?.[THEME.LIGHT]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme }}>
      <ThemeProvider theme={currentTheme === THEME.LIGHT ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
