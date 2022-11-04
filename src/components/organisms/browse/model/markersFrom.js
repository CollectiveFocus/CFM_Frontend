import Leaflet from 'leaflet';
import { pinColor } from 'theme/palette';
import {
  svgDecorationDirty,
  svgDecorationOutOfOrder,
  svgUrlPinGhost,
  svgUrlPinLocation,
  svgUrlPinNoReport,
  svgUrlPinNotAtLocation,
} from 'theme/icons';

export default function markersFrom(fridgeList) {
  return fridgeList.map((fridge) => {
    const { id, name, location, report } = fridge;
    const { condition, foodPercentage } = report ?? {
      condition: 'no report',
      foodPercentage: 0,
    };

    return {
      marker: {
        title: name,
        position: [location.geoLat, location.geoLng],
        icon: iconFrom(condition, foodPercentage),
        riseOnHover: true,
        riseOffset: 50,
      },
      popup: { id, name, location },
    };
  });
}

const colorFrom = Object.freeze({
  0: pinColor.itemsEmpty,
  1: pinColor.itemsFew,
  2: pinColor.itemsMany,
  3: pinColor.itemsFull,
});
const decorationFrom = Object.freeze({
  'good': '',
  'dirty': svgDecorationDirty,
  'out of order': svgDecorationOutOfOrder,
  'ghost': svgUrlPinGhost
});

const iconCache = {};
function getLeafletIcon(hash, svgUrl) {
  let icon;
  if (hash in iconCache) {
    icon = iconCache[hash];
  } else {
    icon = new Leaflet.Icon({
      iconUrl: svgUrl,
      popupAnchor: [0, -24],
      iconSize: [40, 40],
    });
    iconCache[hash] = icon;
  }
  return icon;
}

function iconFrom(condition, foodPercentage) {
  switch (condition) {
    case 'not at location':
      return getLeafletIcon(condition, svgUrlPinNotAtLocation());
    case 'no report':
      return getLeafletIcon(condition, svgUrlPinNoReport());
    case 'ghost':
      return getLeafletIcon(condition, svgUrlPinGhost());
    default:
      return getLeafletIcon(
        condition + foodPercentage,
        svgUrlPinLocation(colorFrom[foodPercentage], decorationFrom[condition])
      );
  }
}
