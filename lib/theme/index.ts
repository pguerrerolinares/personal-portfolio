import { createTheme, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette, accentColors, categoryColors, gradients } from './palette';
import { typography } from './typography';
import { shadows } from './shadows';

const commonThemeOptions: ThemeOptions = {
  typography,
  shadows,
  shape: {
    borderRadius: 12, // kept as number for compatibility, or change to string if allowed? MUI shape.borderRadius is usually number or string. Let's use standard sizing in component overrides
  },
  spacing: (factor: number) => `${0.25 * factor}rem`, // 1 unit = 4px = 0.25rem
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
          fontSize: '100%', // Browser default (usually 16px)
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
          width: '0.5rem',
          height: '0.5rem',
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
          paddingLeft: '1.5rem', // 24px - Increased for better mobile breathing room
          paddingRight: '1.5rem',
          '@media (min-width: 640px)': {
            paddingLeft: '1.5rem', // 24px
            paddingRight: '1.5rem',
          },
          '@media (min-width: 1024px)': {
            paddingLeft: '2rem', // 32px
            paddingRight: '2rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem', // 8px
          textTransform: 'none',
          fontWeight: 600,
          padding: '0.625rem 1.5rem', // 10px 24px
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        sizeLarge: {
          padding: '0.75rem 2rem', // 12px 32px
          fontSize: '1rem',
        },
        sizeMedium: {
          padding: '0.625rem 1.5rem',
        },
        sizeSmall: {
          padding: '0.375rem 1rem', // 6px 16px
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1rem', // 16px
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
          borderRadius: '1rem', // 16px
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem', // 8px
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
  gradients,
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    ...darkPalette,
    accent: accentColors,
    category: categoryColors,
  },
  gradients,
});

export { accentColors, categoryColors, gradients };
