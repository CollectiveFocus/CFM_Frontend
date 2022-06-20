import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';
import { blue } from '@mui/material/colors';

/**
 * Applies theme configuration to custom SVG icons. SVG elements should be scaled for a 24x24px viewport .
 * This is a requirement from MUI SvgIcon.
 * @see https://mui.com/material-ui/icons/#svgicon
 *
 * @param {Object} props
 */
function ThemeIcon({
  svgComponent,
  foregroundColor = blue[50],
  backgroundColor = 'primary.contrastText',
  ...props
}) {
  const { sx, ...iconProps } = props;
  const iconSX = {
    ...sx,
    fontSize: '43px',
    color: foregroundColor,
    backgroundColor: backgroundColor,
  };
  return (
    <SvgIcon
      inheritViewBox
      component={svgComponent}
      sx={iconSX}
      {...iconProps}
    />
  );
}

ThemeIcon.propTypes = {
  /**
   * The SVG file imported as a component.
   */
  svgComponent: PropTypes.elementType.isRequired,

  /**
   * Optional fill color for the icon.
   */
  foregroundColor: PropTypes.string,

  /**
   * Optional background color for the icon. 'inherit' makes the background transparent, ie: same as parent.
   */
  backgroundColor: PropTypes.string,

  /**
   * Optional props to be passed to SvgIcon.
   */
  props: PropTypes.object,
};

export default ThemeIcon;
