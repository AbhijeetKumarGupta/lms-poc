'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ImageKitProvider } from 'imagekitio-next';

import { ThemeContext } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { THEME } from '@/constants/theme';
import { themesOptions } from '@/theme';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

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

  const authenticator = async () => {
    try {
      const res = await fetch('/api/auth/upload');
      if (!res.ok) throw new Error('Failed to authenticate');
      return res.json();
    } catch (error) {
      console.error('ImageKit authentication error:', error);
      throw error;
    }
  };

  const lightTheme = createTheme(themesOptions[THEME.LIGHT]);
  const darkTheme = createTheme(themesOptions[THEME.DARK]);

  return (
    <SessionProvider session={session}>
      <ThemeContext.Provider
        value={{ theme: currentTheme, changeTheme: theme => setConfig({ theme }) }}
      >
        <ThemeProvider theme={currentTheme === THEME.DARK ? darkTheme : lightTheme}>
          <CssBaseline />
          <ImageKitProvider
            authenticator={authenticator}
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
          >
            {children}
          </ImageKitProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </SessionProvider>
  );
}
