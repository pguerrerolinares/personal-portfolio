import { PaletteOptions } from '@mui/material/styles';

// Complementary color scheme: Blue (primary) + Orange (secondary) + Purple (accent)
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#2563eb', // Blue
    light: '#60a5fa',
    dark: '#1e40af',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#f97316', // Orange (complementary to blue)
    light: '#fb923c',
    dark: '#c2410c',
    contrastText: '#ffffff',
  },
  background: {
    default: '#fafafa', // Soft white
    paper: '#ffffff',
  },
  text: {
    primary: '#0f172a', // Darker for better contrast
    secondary: '#64748b', // Better readability
  },
  divider: 'rgba(0, 0, 0, 0.08)',
  success: {
    main: '#10b981',
  },
  warning: {
    main: '#f59e0b',
  },
  error: {
    main: '#ef4444',
  },
  info: {
    main: '#3b82f6',
  },
  grey: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#3b82f6', // Blue
    light: '#60a5fa',
    dark: '#2563eb',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#fb923c', // Orange (complementary to blue)
    light: '#fdba74',
    dark: '#f97316',
    contrastText: '#0f172a',
  },
  background: {
    default: '#0f172a', // Deep blue-gray
    paper: '#1e293b', // Slightly lighter for cards
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#94a3b8',
  },
  divider: 'rgba(255, 255, 255, 0.08)',
  success: {
    main: '#34d399',
  },
  warning: {
    main: '#fbbf24',
  },
  error: {
    main: '#f87171',
  },
  info: {
    main: '#60a5fa',
  },
  grey: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      purple: string;
      pink: string;
      cyan: string;
    };
    category: {
      web: string;
      mobile: string;
      ai: string;
      automation: string;
      other: string;
    };
  }
  interface PaletteOptions {
    accent?: {
      purple?: string;
      pink?: string;
      cyan?: string;
    };
    category?: {
      web?: string;
      mobile?: string;
      ai?: string;
      automation?: string;
      other?: string;
    };
  }
}

// Accent colors for variety
export const accentColors = {
  purple: '#a855f7',
  pink: '#ec4899',
  cyan: '#06b6d4',
};

// Category colors using the complementary palette
export const categoryColors = {
  web: '#3b82f6', // Primary blue
  mobile: '#10b981', // Green
  ai: '#a855f7', // Purple accent
  automation: '#f97316', // Secondary orange
  other: '#64748b', // Neutral gray
};
