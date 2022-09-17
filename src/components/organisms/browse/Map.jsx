import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import ToggleButton from './components/ToggleButton';

export default function LeafletMap({ geoLat, geoLng }) {
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
      </MapContainer>
      <ToggleButton currentPage={ToggleButton.page.map} />
    </>
  );
}
LeafletMap.propTypes = PropTypes.exact({
  geoLat: PropTypes.number,
  geoLng: PropTypes.number,
}).isRequired;
