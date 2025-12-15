'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { h } from "@/lib/react-helpers";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return h(IconButton, {
      size: "small",
      disabled: true
    }, h(LightModeIcon));
  }

  return h(IconButton, {
    'data-component': "ThemeToggle",
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    'aria-label': "Toggle theme",
    size: "small",
    sx: {
      color: 'text.primary',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'rotate(15deg)',
      },
    }
  }, theme === 'dark' ? h(LightModeIcon) : h(DarkModeIcon));
}
