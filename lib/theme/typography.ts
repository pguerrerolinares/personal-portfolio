import { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
  fontFamily:
    'var(--font-geist-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
  fontWeightLight: 400,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: '4.5rem', // 72px
    lineHeight: 1,
    fontWeight: 700,
  },
  h2: {
    fontSize: '3.75rem', // 60px
    lineHeight: 1,
    fontWeight: 700,
  },
  h3: {
    fontSize: '3rem', // 48px
    lineHeight: 1.25,
    fontWeight: 700,
  },
  h4: {
    fontSize: '2.25rem', // 36px
    lineHeight: 1.25,
    fontWeight: 600,
  },
  h5: {
    fontSize: '1.875rem', // 30px
    lineHeight: 1.25,
    fontWeight: 600,
  },
  h6: {
    fontSize: '1.5rem', // 24px
    lineHeight: 1.25,
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: '1.25rem', // 20px
    lineHeight: 1.5,
    fontWeight: 500,
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
    fontSize: '0.875rem', // 14px
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
