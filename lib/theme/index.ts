import { createTheme, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette, accentColors, categoryColors } from './palette';
import { typography } from './typography';
import { shadows } from './shadows';

const commonThemeOptions: ThemeOptions = {
  typography,
  shadows,
  shape: {
    borderRadius: 12, // Larger, more modern radius
  },
  spacing: 8, // 8px base spacing unit (mobile-first)
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
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
      styleOverrides: {
        root: {
          paddingLeft: 16, // Mobile-first: 16px on mobile
          paddingRight: 16,
          '@media (min-width: 640px)': {
            paddingLeft: 24, // 24px on tablet
            paddingRight: 24,
          },
          '@media (min-width: 1024px)': {
            paddingLeft: 32, // 32px on desktop
            paddingRight: 32,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1rem',
        },
        sizeMedium: {
          padding: '10px 24px',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
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
    accent: accentColors,
    category: categoryColors,
  },
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    ...darkPalette,
    accent: accentColors,
    category: categoryColors,
  },
});

export { accentColors, categoryColors };
