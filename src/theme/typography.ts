import type { TypographyVariantsOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    footer: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    footer?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    footer: true;
  }
}

const typography: TypographyVariantsOptions = {
  fontFamily: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '2.25rem', // ~30pt
    fontWeight: 700,
    margin: '1.5rem 0',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '1.75rem', // ~21pt
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem', // ~21pt
    fontWeight: 400,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.2rem', // 18pt
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.2rem', // 15pt
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1.125rem', // ~13.5pt
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1.1rem', // ~17.6px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontSize: '1.15rem',
    fontWeight: 700,
  },
  caption: {
    fontSize: '1.35rem',
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: '0.70rem',
    fontWeight: 600,
  },
};

export default typography;
