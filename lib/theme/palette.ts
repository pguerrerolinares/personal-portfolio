import { PaletteOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#2563eb',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: '#0a0a0a',
    secondary: '#737373',
  },
  divider: '#e5e5e5',
  success: {
    main: '#22c55e',
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
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#3b82f6',
    contrastText: '#ffffff',
  },
  background: {
    default: '#0a0a0a',
    paper: '#0a0a0a',
  },
  text: {
    primary: '#fafafa',
    secondary: '#a3a3a3',
  },
  divider: '#262626',
  success: {
    main: '#4ade80',
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
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

declare module '@mui/material/styles' {
  interface Palette {
    category: {
      web: string;
      mobile: string;
      ai: string;
      automation: string;
      other: string;
    };
  }
  interface PaletteOptions {
    category?: {
      web?: string;
      mobile?: string;
      ai?: string;
      automation?: string;
      other?: string;
    };
  }
}

export const categoryColors = {
  web: '#3b82f6',
  mobile: '#22c55e',
  ai: '#a855f7',
  automation: '#f97316',
  other: '#6b7280',
};
