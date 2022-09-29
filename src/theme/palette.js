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
  white: '#FFFFFF',
  black: '#000000',
  blue: {
    dark: '#1543D4',
    darkShade: ['#040B25'],
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
      '#22222240', //6]
    ],
  },
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
    default: designColor.grayscale.gradient[0],
    paper: designColor.grayscale.gradient[1],
  },
  text: {
    primary: designColor.grayscale.gradient[5],
    secondary: designColor.grayscale.gradient[4],
    disabled: designColor.grayscale.gradient[3],
    hint: designColor.grayscale.gradient[4],
  },
  icon: designColor.grayscale.gradient[4],
  divider: designColor.grayscale.gradient[5],
};

export default palette;
