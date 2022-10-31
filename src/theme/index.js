import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { applyAlpha, designColor, default as palette } from './palette';
import typography from './typography';

const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
    spacing: 4,
    props: {
      MuiAppBar: {
        color: designColor.blue.light,
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: 'secondary',
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 45,
            '&:hover': {
              borderColor: designColor.blue.dark,
            },
            '&.MuiButton-outlined': {
              color: designColor.neroGray,
              borderColor: designColor.blue.dark,
            },
            '&.Mui-disabled': {
              color: designColor.white,
              backgroundColor: applyAlpha('cc', designColor.neroGray),
            },
          },
        },
        variants: [
          {
            props: { size: 'wide' },
            style: { minWidth: 300 },
          },
        ],
      },
    },
  })
);

export default theme;
