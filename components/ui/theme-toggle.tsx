'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('common');

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
      aria-label={t('toggleTheme')}
      size="small"
      sx={{
        color: 'text.primary',
        transition: 'color 0.2s ease',
        '&:hover': {
          color: 'primary.main',
        },
      }}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
