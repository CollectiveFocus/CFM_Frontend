import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import typesView from 'model/view/prop-types';

import LegendDrawer from './components/LegendDrawer';
import MapMarkerList from './components/MapMarkerList';
import markersFrom from './model/markersFrom';

export default function Map({ centerMap, fridgeList, ghostList }) {
  return (
    <>
      <MapContainer
        style={{ height: '100%' }}
        center={[centerMap.geoLat, centerMap.geoLng]}
        zoom={13.2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://collectivefocus.site/">Collective Focus</a>'
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <MapMarkerList markerDataList={markersFrom(fridgeList)} />
        <MapMarkerList markerDataList={markersFrom(ghostList)} />
      </MapContainer>
      <LegendDrawer />
    </>
  );
}
Map.propTypes = {
  centerMap: typesView.Geolocation.isRequired,
  fridgeList: PropTypes.arrayOf(typesView.Fridge).isRequired,
  ghostList: PropTypes.arrayOf(typesView.Fridge).isRequired,
};
