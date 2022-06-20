import AboutSVG from './about.svg';
import FridgeAddSVG from './fridgeAdd.svg';
import FridgeFindSVG from './fridgeFind.svg';
import GuidelineSVG from './guideline.svg';
import HomeSVG from './home.svg';
import LogoSVG from './logo.svg';
import MapPinSVG from './mapPin.svg';
import StatusSVG from './status.svg';
import VolunteerSVG from './volunteer.svg';

import ThemeIcon from 'components/atoms/ThemeIcon';

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
  ThemeIcon({ svgComponent: LogoSVG, backgroundColor: 'inherit', ...props });
export const MapPinIcon = (props) =>
  ThemeIcon({ svgComponent: MapPinSVG, ...props });
export const StatusIcon = (props) =>
  ThemeIcon({ svgComponent: StatusSVG, ...props });
export const VolunteerIcon = (props) =>
  ThemeIcon({ svgComponent: VolunteerSVG, ...props });
