'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeContext } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { THEME } from '@/constants/theme';
import { themesOptions } from '@/theme';

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Any;
}) {
  const [config, setConfig] = useLocalStorage('theme-config', { theme: THEME.LIGHT });
  const [currentTheme, setCurrentTheme] = useState(config.theme);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setCurrentTheme(config.theme);
  }, [config.theme]);

  if (!hasMounted) return null;

  const lightTheme = createTheme(themesOptions[THEME.LIGHT]);
  const darkTheme = createTheme(themesOptions[THEME.DARK]);

  return (
    <SessionProvider session={session}>
      <ThemeContext.Provider
        value={{ theme: currentTheme, changeTheme: theme => setConfig({ theme }) }}
      >
        <ThemeProvider theme={currentTheme === THEME.DARK ? darkTheme : lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </SessionProvider>
  );
}
