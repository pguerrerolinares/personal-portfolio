'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '@/lib/theme';
import { h, Fragment } from "@/lib/react-helpers";

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
    return h(MuiThemeProvider, { theme: lightTheme }, children);
  }

  const currentTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return h(MuiThemeProvider, {
    theme: currentTheme,
    children: [
      h(CssBaseline, { key: 'css-baseline' }),
      h(Fragment, { key: 'content' }, children)
    ]
  });
}

export function MuiNextThemeProvider({ children }: ThemeProviderProps) {
  return h(NextThemesProvider, {
    attribute: "class",
    defaultTheme: "system",
    enableSystem: true,
    children: h(MuiThemeWrapper, {}, children)
  });
}
