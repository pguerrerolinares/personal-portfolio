'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';
import { ReactNode, useSyncExternalStore } from 'react';
import { lightTheme, darkTheme } from '@/lib/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

// Hydration-safe mounted state using useSyncExternalStore
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useMounted() {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}

function MuiThemeWrapper({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <MuiThemeProvider theme={lightTheme}>{children}</MuiThemeProvider>;
  }

  const currentTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function MuiNextThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </NextThemesProvider>
  );
}
