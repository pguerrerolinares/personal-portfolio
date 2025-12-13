import { createTheme, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette, categoryColors } from './palette';
import { typography } from './typography';
import { shadows } from './shadows';

const commonThemeOptions: ThemeOptions = {
  typography,
  shadows,
  shape: {
    borderRadius: 6, // 0.375rem (radius-md)
  },
  spacing: 4, // 4px base spacing unit
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          fontSize: 16,
        },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        'code, pre, kbd, samp': {
          fontFamily:
            'var(--font-geist-mono, ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace)',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        '::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 9999,
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.3)',
          },
        },
        ':focus-visible': {
          outline: '2px solid',
          outlineOffset: 2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
};

export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    ...lightPalette,
    category: categoryColors,
  },
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    ...darkPalette,
    category: categoryColors,
  },
});

export { categoryColors };
