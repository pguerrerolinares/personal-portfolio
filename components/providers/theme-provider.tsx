'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '@/lib/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

function MuiThemeWrapper({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
