'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Hydration-safe mounted state using useSyncExternalStore
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useMounted() {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <IconButton size="small" disabled>
        <LightModeIcon />
      </IconButton>
    );
  }

  return (
    <IconButton
      data-component="ThemeToggle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      size="small"
      sx={{
        color: 'text.primary',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'rotate(15deg)',
        },
      }}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
