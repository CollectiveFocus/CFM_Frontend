import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import { pinColor } from 'theme/palette';

import typesValidation from 'model/data/fridge/prop-types';

import LegendDrawer from './components/LegendDrawer';
import MapMarkerList from './components/MapMarkerList';
import ToggleButton from './components/ToggleButton';

const decoratorBroken =
  "%3Ccircle cx='17.75' cy='16.75' r='4.75' style='fill:rgb(34,34,34);'/%3E%3Cpath d='M18.25,15.569C18.165,15.657 18.165,15.799 18.25,15.887L18.613,16.25C18.7,16.337 18.843,16.337 18.931,16.25L19.788,15.394C19.868,15.57 19.909,15.762 19.909,15.955C19.905,16.702 19.292,17.315 18.546,17.318C18.352,17.318 18.161,17.277 17.984,17.198L16.413,18.768C16.324,18.848 16.209,18.893 16.089,18.893C15.825,18.892 15.608,18.675 15.607,18.411C15.607,18.291 15.651,18.176 15.732,18.087L17.302,16.516C17.222,16.339 17.181,16.148 17.181,15.954C17.181,15.953 17.181,15.953 17.181,15.952C17.181,15.205 17.795,14.59 18.542,14.59C18.737,14.59 18.929,14.632 19.106,14.712L18.252,15.567L18.25,15.569Z' style='fill:white;fill-rule:nonzero;'/%3E";
const decoratorDirty =
  "%3Ccircle cx='17.75' cy='16.75' r='4.75' style='fill:rgb(34,34,34);'/%3E%3Cpath d='M16.726,20.205C16.575,20.207 16.428,20.152 16.314,20.052C16.197,19.954 16.122,19.814 16.105,19.663L15.593,15.847C15.581,15.757 15.61,15.666 15.672,15.6C15.731,15.532 15.818,15.493 15.908,15.494L19.592,15.494C19.687,15.494 19.766,15.529 19.829,15.601C19.89,15.667 19.918,15.758 19.906,15.848L19.395,19.663C19.377,19.814 19.303,19.953 19.187,20.052C19.073,20.152 18.926,20.207 18.774,20.205L16.726,20.205ZM16.726,19.577L18.774,19.577L19.23,16.122L16.262,16.122L16.726,19.577ZM17.75,18.007C18.002,18.011 18.244,17.911 18.42,17.732C18.599,17.557 18.699,17.315 18.695,17.064L18.695,16.75C18.695,16.748 18.695,16.746 18.695,16.744C18.695,16.575 18.556,16.436 18.387,16.436C18.385,16.436 18.383,16.436 18.38,16.436C18.297,16.434 18.216,16.467 18.157,16.526C18.096,16.585 18.063,16.666 18.065,16.75L18.065,17.064C18.068,17.148 18.035,17.229 17.976,17.288C17.917,17.348 17.835,17.381 17.751,17.379C17.667,17.381 17.586,17.348 17.527,17.288C17.467,17.229 17.434,17.148 17.437,17.064L17.437,16.75C17.438,16.666 17.405,16.586 17.345,16.527C17.286,16.467 17.205,16.434 17.121,16.436C17.037,16.434 16.956,16.466 16.897,16.526C16.837,16.585 16.804,16.666 16.806,16.75L16.806,17.064C16.806,17.326 16.898,17.548 17.081,17.732C17.257,17.911 17.499,18.011 17.751,18.006L17.75,18.007ZM18.695,15.181C18.569,15.183 18.448,15.132 18.36,15.042C18.27,14.955 18.22,14.834 18.223,14.709C18.22,14.583 18.27,14.462 18.36,14.375C18.448,14.285 18.569,14.235 18.694,14.238C18.82,14.235 18.942,14.285 19.029,14.375C19.12,14.462 19.169,14.583 19.167,14.709C19.169,14.834 19.12,14.955 19.029,15.042C18.942,15.133 18.82,15.182 18.694,15.18L18.695,15.181ZM17.12,14.866C16.911,14.869 16.709,14.787 16.562,14.638C16.411,14.492 16.328,14.29 16.333,14.081C16.333,13.86 16.41,13.674 16.562,13.524C16.708,13.374 16.91,13.291 17.12,13.295C17.341,13.295 17.527,13.371 17.68,13.523C17.829,13.669 17.912,13.871 17.908,14.081C17.912,14.29 17.829,14.492 17.68,14.639C17.532,14.788 17.33,14.87 17.12,14.866ZM18.774,19.576L16.727,19.576L18.774,19.576Z' style='fill:white;fill-rule:nonzero;'/%3E";
function iconsFrom(report) {
  const { condition, foodPercentage } = report;
  const percentageDictionary = {
    0: encodeURIComponent(pinColor.itemsEmpty),
    33: encodeURIComponent(pinColor.itemsFew),
    67: encodeURIComponent(pinColor.itemsMany),
    100: encodeURIComponent(pinColor.itemsFull),
  };
  let color = percentageDictionary[foodPercentage];
  let decorator = '';
  switch (condition) {
    case 'dirty':
      decorator = decoratorDirty;
      break;
    case 'out of order':
      decorator = decoratorBroken;
      break;
    default:
      decorator = '';
  }
  const iconString = `data:image/svg+xml,%3Csvg%20fill='${color}' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23222' d='M12 3.27c-3.528 0-6.735 2.824-6.735 6.966 0 2.927 2.183 5.98 6.18 9.437l.555.481.557-.481c3.997-3.455 6.178-6.51 6.178-9.436 0-4.143-3.207-6.966-6.735-6.966z'/%3E%3Cpath fill='%23222' d='m9.167 9.432-.655.754c1.17 1.016 2.412 1.502 3.625 1.47 1.214-.03 2.365-.572 3.372-1.474l-.668-.744c-.876.784-1.794 1.195-2.729 1.22-.935.023-1.92-.334-2.945-1.226zm2.187-.357a.637.637 0 0 1-.637.638.637.637 0 0 1-.637-.637.637.637 0 0 1 .637-.638.637.637 0 0 1 .637.637Zm2.38 0a.637.637 0 0 1-.637.638.637.637 0 0 1-.637-.637.637.637 0 0 1 .637-.638.637.637 0 0 1 .637.637Z'/%3E%3Ccircle cx='7.927' cy='9.406' r='1.357' fill='%23f53636'/%3E%3Ccircle cx='16.077' cy='9.406' r='1.357' fill='%23f53636'/%3E${decorator}%3C/svg%3E`;
  const MapPinIcon = Leaflet.icon({
    iconUrl: iconString,
    popupAnchor: [0, -24],
    iconSize: [48, 48],
  });
  return MapPinIcon;
}

function markersFrom({ fridges }) {
  return fridges.map((fridge) => {
    const { id, name, location } = fridge;
    return {
      marker: {
        title: name,
        position: [location.geoLat, location.geoLng],
        icon: iconsDictionary[id],
        riseOnHover: true,
        riseOffset: 50,
      },
      popup: {
        name: name,
        link: id,
      },
    };
  });
}
const iconsDictionary = {};

export default function Map({ geoLat, geoLng, fridges, reports }) {
  reports.forEach((report) => {
    iconsDictionary[report.fridgeId] = iconsFrom(report);
  });

  return (
    <>
      <MapContainer
        style={{ height: '90vh' }}
        center={[geoLat, geoLng]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://collectivefocus.site/">Collective Focus</a>'
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <MapMarkerList markerDataList={markersFrom({ fridges })} />
      </MapContainer>
      <LegendDrawer />
      <ToggleButton currentPage={ToggleButton.page.map} />
    </>
  );
}
Map.propTypes = PropTypes.exact({
  geoLat: PropTypes.number,
  geoLng: PropTypes.number,
  fridges: PropTypes.arrayOf(typesValidation.Fridge),
  reports: PropTypes.arrayOf(typesValidation.Report),
}).isRequired;
