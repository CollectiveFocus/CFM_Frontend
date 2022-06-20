import AboutSVG from './about.svg';
import FridgeAddSVG from './fridgeAdd.svg';
import FridgeFindSVG from './fridgeFind.svg';
import GuidelineSVG from './guideline.svg';
import HomeSVG from './home.svg';
import LogoSVG from './logo.svg';
import MapPinSVG from './mapPin.svg';
import StatusSVG from './status.svg';
import LogoTitleSVG from './logoTitle.svg';
import VolunteerSVG from './volunteer.svg';

import { SvgIcon } from '@mui/material';
import { ThemeIcon } from 'components/atoms';

// logo with text
export const LogoText = (props) => (
  <SvgIcon
    inheritViewBox
    component={LogoTitleSVG}
    sx={{
      height: '43px',
      width: '115px',
      color: '#222',
      backgroundColor: 'inherit',
    }}
    {...props}
  />
);

// icons
export const AboutIcon = (props) =>
  ThemeIcon({ svgComponent: AboutSVG, ...props });
export const FridgeAddIcon = (props) =>
  ThemeIcon({ svgComponent: FridgeAddSVG, ...props });
export const FridgeFindIcon = (props) =>
  ThemeIcon({ svgComponent: FridgeFindSVG, ...props });
export const GuidelineIcon = (props) =>
  ThemeIcon({ svgComponent: GuidelineSVG, ...props });
export const HomeIcon = (props) =>
  ThemeIcon({ svgComponent: HomeSVG, ...props });
export const LogoIcon = (props) =>
  ThemeIcon({ svgComponent: LogoSVG, ...props });
export const MapPinIcon = (props) =>
  ThemeIcon({ svgComponent: MapPinSVG, ...props });
export const StatusIcon = (props) =>
  ThemeIcon({ svgComponent: StatusSVG, ...props });
export const VolunteerIcon = (props) =>
  ThemeIcon({ svgComponent: VolunteerSVG, ...props });
