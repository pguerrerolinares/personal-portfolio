import { ThemeOptions } from '@mui/material/styles';

// Extend MUI Typography variants
declare module '@mui/material/styles' {
  interface TypographyVariants {
    display1: React.CSSProperties;
    display2: React.CSSProperties;
    eyebrow: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    display1?: React.CSSProperties;
    display2?: React.CSSProperties;
    eyebrow?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true;
    display2: true;
    eyebrow: true;
  }
}

export const typography: ThemeOptions['typography'] = {
  fontFamily:
    'var(--font-geist-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  // NEW: Ultra-large display variants for bold typography
  display1: {
    fontSize: 'clamp(4rem, 15vw, 10rem)', // Responsive: 64px to 160px
    lineHeight: 0.9,
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
  display2: {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)', // Responsive: 40px to 80px
    lineHeight: 0.95,
    fontWeight: 600,
    letterSpacing: '-0.015em',
  },
  eyebrow: {
    fontSize: '0.75rem', // 12px
    lineHeight: 1.5,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
  },
  h1: {
    fontSize: '4.5rem', // 72px
    lineHeight: 1,
    fontWeight: 600,
    letterSpacing: '-0.025em',
  },
  h2: {
    fontSize: '3.75rem', // 60px
    lineHeight: 1,
    fontWeight: 600, // Reduced from 700
    letterSpacing: '-0.025em',
  },
  h3: {
    fontSize: '3rem', // 48px
    lineHeight: 1.25,
    fontWeight: 600, // Reduced from 700
    letterSpacing: '-0.025em',
  },
  h4: {
    fontSize: '2.25rem', // 36px
    lineHeight: 1.25,
    fontWeight: 600,
    letterSpacing: '-0.02em',
  },
  h5: {
    fontSize: '1.875rem', // 30px
    lineHeight: 1.25,
    fontWeight: 600,
    letterSpacing: '-0.015em',
  },
  h6: {
    fontSize: '1.5rem', // 24px
    lineHeight: 1.25,
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: '1.25rem', // 20px
    lineHeight: 1.5,
    fontWeight: 400, // Reduced from 500 for a cleaner look
  },
  subtitle2: {
    fontSize: '1.125rem', // 18px
    lineHeight: 1.5,
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem', // 16px
    lineHeight: 1.5,
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem', // 14px
    lineHeight: 1.5,
    fontWeight: 400,
  },
  button: {
    fontSize: '0.9375rem', // 15px
    lineHeight: 1.5,
    fontWeight: 500,
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem', // 12px
    lineHeight: 1.5,
    fontWeight: 400,
  },
  overline: {
    fontSize: '0.75rem', // 12px
    lineHeight: 1.5,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};
