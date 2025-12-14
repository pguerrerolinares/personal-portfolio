import { PaletteOptions } from '@mui/material/styles';

// Apple Human Interface Guidelines inspired palette
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#0071e3', // Apple Blue
    light: '#409cff',
    dark: '#005bb7',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#86868b', // SF Gray for secondary elements
    light: '#a1a1a6',
    dark: '#6e6e73',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f5f5f7', // Apple light gray background
    paper: '#ffffff',
  },
  text: {
    primary: '#1d1d1f', // SF Near Black
    secondary: '#86868b', // SF Gray
  },
  divider: 'rgba(0, 0, 0, 0.1)',
  success: {
    main: '#34c759', // SF Green
  },
  warning: {
    main: '#ff9f0a', // SF Orange
  },
  error: {
    main: '#ff3b30', // SF Red
  },
  info: {
    main: '#0071e3', // SF Blue
  },
  grey: {
    50: '#fbfbfd',
    100: '#f5f5f7',
    200: '#e5e5e5',
    300: '#d2d2d7',
    400: '#aeaeb2',
    500: '#86868b',
    600: '#6e6e73',
    700: '#424245',
    800: '#1d1d1f',
    900: '#000000',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#0a84ff', // SF Dark Mode Blue (slightly lighter/more vibrant)
    light: '#64d2ff',
    dark: '#0071e3',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#98989d', // SF Gray Dark
    light: '#bebec2',
    dark: '#6e6e73',
    contrastText: '#000000',
  },
  background: {
    default: '#000000', // Apple pure black background
    paper: '#1c1c1e', // Apple dark gray card background
  },
  text: {
    primary: '#f5f5f7', // SF Near White
    secondary: '#86868b', // SF Gray
  },
  divider: 'rgba(255, 255, 255, 0.1)',
  success: {
    main: '#30d158',
  },
  warning: {
    main: '#ff9f0a',
  },
  error: {
    main: '#ff453a',
  },
  info: {
    main: '#0a84ff',
  },
  grey: {
    50: '#1c1c1e',
    100: '#2c2c2e',
    200: '#3a3a3c',
    300: '#48484a',
    400: '#636366',
    500: '#8e8e93',
    600: '#aeaeb2',
    700: '#d1d1d6',
    800: '#e5e5ea',
    900: '#f2f2f7',
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

// Accent colors aligned with Apple HIG
export const accentColors = {
  purple: '#bf5af2', // SF Purple
  pink: '#ff375f',   // SF Pink
  cyan: '#64d2ff',   // SF Cyan
};

// Category colors normalized
export const categoryColors = {
  web: '#0071e3',    // SF Blue
  mobile: '#34c759', // SF Green
  ai: '#bf5af2',     // SF Purple
  automation: '#ff9f0a', // SF Orange
  other: '#8e8e93',  // SF Gray
};
