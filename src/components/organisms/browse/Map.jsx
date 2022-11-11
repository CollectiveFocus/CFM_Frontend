import PropTypes from 'prop-types';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import typesView from 'model/view/prop-types';

import { deltaInMeters } from 'lib/geo.mjs';

import LegendDrawer from './components/LegendDrawer';
import MapMarkerList from './components/MapMarkerList';
import markersFrom from './model/markersFrom';

const fridgePaperBoyLoveGallery = [40.697759, -73.927282];
const defaultZoom = 13.2;
const defaultMapCenter = fridgePaperBoyLoveGallery;

const lookupNearestFridge = (userLocation, fridgeList) => {
  fridgeList.map((fridge, index) => {
    const location = fridge.location;
    const { geoLat, geoLng } = location;
    const dist = deltaInMeters(
      [userLocation.lat, userLocation.lng],
      [geoLat, geoLng]
    );
    fridgeList[index].distFromUser = dist;
    fridgeList.sort((a, b) => {
      return a.distFromUser - b.distFromUser;
    });
  });
  return fridgeList[0];
};

function UpdateCenter({ fridgeList }) {
  const pixelRadius = 1000;

  const maxUserToDefaultCenterMeters = 200000;
  const map = useMap();
  map.locate().on('locationfound', (e) => {
    const userPosition = e.latlng;
    const userToDefaultCenterMeters = deltaInMeters(defaultMapCenter, [
      userPosition.lat,
      userPosition.lng,
    ]);

    if (userToDefaultCenterMeters <= maxUserToDefaultCenterMeters) {
      // Zoom level adjusted by 1/2 a level for each 50 KM
      const zoomAdjustment =
        Math.ceil(userToDefaultCenterMeters / 1000 / 50) * 0.5;
      map.flyTo(userPosition, defaultZoom - zoomAdjustment);
    } else {
      const nearestFridge = lookupNearestFridge(userPosition, fridgeList);
      const { geoLat, geoLng } = nearestFridge.location;
      const fridgeLatLng = {
        lat: geoLat,
        lng: geoLng,
      };
      const userFridgeBBox = L.latLngBounds(userPosition, fridgeLatLng);
      map.flyToBounds(userFridgeBBox);
    }
    L.circleMarker(userPosition, pixelRadius).addTo(map);
  });
}

export default function Map({ fridgeList }) {
  return (
    <>
      <MapContainer
        style={{ height: '100%' }}
        center={defaultMapCenter}
        zoom={defaultZoom}
        minZoom={1} //Limit display to whole globe
        scrollWheelZoom={true}
      >
        <UpdateCenter fridgeList={fridgeList} />
        <TileLayer
          attribution='&copy; <a href="https://collectivefocus.site/">Collective Focus</a>'
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <MapMarkerList markerDataList={markersFrom(fridgeList)} />
      </MapContainer>
      <LegendDrawer />
    </>
  );
}
Map.propTypes = {
  fridgeList: PropTypes.arrayOf(typesView.Fridge).isRequired,
};
