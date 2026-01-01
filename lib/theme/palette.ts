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
    main: '#0d9488', // Teal (aligned with Automation/Cool theme)
  },
  warning: {
    main: '#f59e0b', // Standard Amber (warmth without being neon)
  },
  error: {
    main: '#ff3b30', // SF Red
  },
  info: {
    main: '#0ea5e9', // Sky Blue (aligned with Mobile/Cool theme)
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
    main: '#14b8a6', // Teal Light
  },
  warning: {
    main: '#fbbf24',
  },
  error: {
    main: '#ff453a',
  },
  info: {
    main: '#38bdf8', // Sky Light
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

// Accent colors aligned with Harmonious Cool Palette
export const accentColors = {
  purple: '#6366f1', // Indigo (was Purple) - keeping key name for compatibility but shifting hue
  pink: '#0ea5e9',   // Sky Blue (was Pink) - keeping key name for compatibility
  cyan: '#0d9488',   // Teal (was Cyan) - keeping key name for compatibility
};

// Category colors normalized to Cool Tones
export const categoryColors = {
  web: '#0071e3',    // Primary Blue
  mobile: '#0ea5e9', // Sky Blue
  ai: '#6366f1',     // Indigo
  automation: '#0d9488', // Teal
  other: '#64748b',  // Slate
};

// Gradient definitions for bold visual design
export const gradients = {
  // Hero text gradient
  heroText: 'linear-gradient(135deg, #0071e3 0%, #0d9488 100%)',
  heroTextDark: 'linear-gradient(135deg, #0a84ff 0%, #14b8a6 100%)',
  // Section background washes
  sectionWash: 'radial-gradient(ellipse at top, rgba(0,113,227,0.03) 0%, transparent 70%)',
  sectionWashDark: 'radial-gradient(ellipse at top, rgba(10,132,255,0.05) 0%, transparent 70%)',
  // Card border glow
  cardBorder: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
  cardBorderDark: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
  // Mesh gradient for backgrounds
  meshLight: 'radial-gradient(at 40% 20%, rgba(99,102,241,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14,165,233,0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(13,148,136,0.08) 0px, transparent 50%)',
  meshDark: 'radial-gradient(at 40% 20%, rgba(99,102,241,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14,165,233,0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(13,148,136,0.12) 0px, transparent 50%)',
  // Interactive glow
  glowPrimary: 'radial-gradient(circle, rgba(0,113,227,0.4) 0%, transparent 70%)',
  glowAccent: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
};

// Extend module for gradients
declare module '@mui/material/styles' {
  interface Theme {
    gradients: typeof gradients;
  }
  interface ThemeOptions {
    gradients?: typeof gradients;
  }
}
