export const applyAlpha = (alpha, color) => color + alpha;

export const pinColor = {
  itemsFull: '#97ed7d',
  itemsMany: '#ffe55c',
  itemsFew: '#ffd4ff',
  itemsEmpty: '#ffffff',
  fridgeNotAtLocation: '#d3d3d3',
  fridgeOperation: '#222',
  fridgeGhost: '#e3f2fd',
  reportUnavailable: '#d3d3d3',
};

export const designColor = {
  white: grayscale[0],
  whiteSmoke: grayscale[1],
  lightSilver: grayscale[2],
  magneticGray: grayscale[3],
  neroGray: grayscale[4],
  black: '#000000',
  blue: {
    dark: '#1543D4',
    darkShade: ['#040B25'],
    light: '#88B3FF',
  },
};

const grayscale = {
  gradient: [
    '#FFFFFF', //0] white
    '#F6F6F6', //1] whiteSmoke
    '#D8D8D8', //2] lightSilver - veryLightGray
    '#B4B4B4', //3] magneticGray
    '#222222', //4] neroGray
  ],
};

const palette = {
  type: 'light',
  white: designColor.white,
  black: designColor.black,
  primary: {
    main: designColor.blue.dark,
  },
  secondary: {
    main: designColor.blue.light,
  },
  background: {
    default: designColor.white,
    paper: designColor.whiteSmoke,
  },
  text: {
    primary: designColor.neroGray,
    secondary: applyAlpha('cc', designColor.neroGray),
    disabled: designColor.magneticGray,
    hint: applyAlpha('cc', designColor.neroGray),
  },
  icon: applyAlpha('cc', designColor.neroGray),
  divider: designColor.neroGray,
};

export default palette;
