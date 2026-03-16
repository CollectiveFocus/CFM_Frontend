import {
  createTheme,
  responsiveFontSizes,
  Theme,
  TypographyVariantsOptions,
} from '@mui/material/styles';

import palette, { applyAlpha, designColor } from './palette';
import typography from './typography';

let theme: Theme = createTheme({
  palette,
  typography: {
    ...(typography as TypographyVariantsOptions),
    fontFamily: [
      'var(--font-inter)',
      'Inter',
      '"Helvetica Neue"',
      'HelveticaNeue',
      'Helvetica',
      '"TeX Gyre"',
      'TeXGyre',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 45,
          textTransform: 'none',
          boxShadow: 'none',
          padding: '8px 24px',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderColor: designColor.blue.dark,
          },
          '&.MuiButton-outlined': {
            color: designColor.neroGray,
            borderColor: designColor.blue.dark,
            backgroundColor: designColor.white,
          },
          '&.Mui-disabled': {
            color: designColor.white,
            backgroundColor: applyAlpha('cc', designColor.neroGray),
          },
        },
      },
      variants: [
        {
          props: { size: 'large' },
          style: { minWidth: 300 },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0,0,0,0.05)',
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
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: designColor.white,
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
