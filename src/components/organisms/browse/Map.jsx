import * as ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import { MapPinIcon as PinIcon } from 'theme/icons';
import typesValidation from 'model/data/fridge/prop-types';

import ToggleButton from './components/ToggleButton';
import MapMarkerList from './components/MapMarkerList';

const MapPinIcon = Leaflet.divIcon({
  className: 'custom-icon',
  html: ReactDOMServer.renderToString(
    <PinIcon sx={{ height: 43, width: 43 }} />
  ),
  iconAnchor: [21, 43],
  popupAnchor: [10, -44],
  iconSize: [43, 43],
});

function markersFrom({ fridges }) {
  return fridges.map((fridge) => {
    const { id, name, location } = fridge;
    return {
      marker: {
        title: name,
        position: [location.geoLat, location.geoLng],
        icon: MapPinIcon,
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

export default function Map({ geoLat, geoLng, fridges }) {
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
        <MapMarkerList
          markerDataList={markersFrom({
            fridges,
          })}
        />
      </MapContainer>
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
