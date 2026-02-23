const typography = {
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
    fontSize: '2.5rem', // ~30pt
    fontWeight: 700,
    margin: '1.5rem 0',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem', // ~24pt
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem', // ~21pt
    fontWeight: 400,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem', // 18pt
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem', // 15pt
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1.125rem', // ~13.5pt
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontSize: '1rem',
    fontWeight: 700,
    textTransform: 'none' as const,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: '0.75rem',
    fontWeight: 600,
  },
};

export default typography;
