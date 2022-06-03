import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const designColor = {
  blue: {
    dark: '#4467D7',
    light: '#88B3FF',
  },
  grayscale: {
    gradient: [
      '#FFFFFF', //0]
      '#F6F6F6', //1]
      '#D8D8D8', //2]
      '#B4B4B4', //3]
      'rgba(34,34,34,0.8)', //4] #222222 80%
      '#222222', //5]
    ],
  },
};

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: designColor.blue.dark,
    },
    secondary: {
      main: designColor.blue.light,
    },
    background: {
      default: designColor.grayscale.gradient[0],
      paper: designColor.grayscale.gradient[0],
    },
    text: {
      primary: designColor.grayscale.gradient[5],
      secondary: designColor.grayscale.gradient[4],
      disabled: designColor.grayscale.gradient[3],
      hint: designColor.grayscale.gradient[4],
    },
    divider: designColor.grayscale.gradient[5],
  },
  typography: {
    fontFamily: [
      'Inter',
      '"Helvetica Neue"',
      'HelveticaNeue',
      'Helvetica',
      '"TeX Gyre"',
      'TeXGyre',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '36pt', fontWeight: 700 },
    h2: { fontSize: '28pt', fontWeight: 700 },
    h3: { fontSize: '28pt', fontWeight: 400 },
    h4: { fontSize: '18pt', fontWeight: 700 },
    h5: { fontSize: '18pt', fontWeight: 500 },
    h6: { fontSize: '16pt', fontWeight: 500 },
    body1: { fontSize: '18pt', fontWeight: 400 },
    body2: { fontSize: '16pt', fontWeight: 400 },
    button: { fontSize: '18pt', fontWeight: 700 },
    caption: { fontSize: '15pt', fontWeight: 700, letterSpacing: 0.5 },
  },
  spacing: 4,
  props: {
    MuiAppBar: {
      color: designColor.blue.light,
    },
    MuiButton: {
      variant: 'outlined',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: designColor.grayscale.gradient[5],
          border: '2px solid',
          borderColor: designColor.blue.dark,
          borderRadius: 45,
          '&:hover': {
            border: '2px solid',
            borderColor: designColor.blue.dark,
          },
        },
      },
    },
  },
};

const lightTheme = responsiveFontSizes(createTheme(themeOptions));

export default lightTheme;
