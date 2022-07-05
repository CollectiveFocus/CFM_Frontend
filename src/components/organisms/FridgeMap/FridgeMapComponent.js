import { Container } from '@mui/system';
import Leaflet from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from 'react-leaflet';
import { useEffect } from 'react';

const FridgeMapComponent = (props) => {
  const {
    fridgeData,
    fridgeDistanceFromUser,
    setUserLocation,
    utilizeUserLocation,
    userLocation,
    setUserInBounds,
    mapCenter,
    getFridgeDistance,
  } = props;

  const nycBoundBox = [
    [40.515174, -74.164426],
    [40.924218, -73.693387],
  ];

  //If using user location, determine distance between user and each fridge
  useEffect(() => {
    if (userLocation != null && fridgeDistanceFromUser.length == 0) {
      let userLat = userLocation[0];
      let userLng = userLocation[1];
      const fridgeDistances = fridgeData.map((fridge) => {
        let { lat, lng } = fridge;
        let userLocation = L.latLng(userLat, userLng);
        let fridgeLocation = L.latLng(lat, lng);
        let distance = userLocation.distanceTo(fridgeLocation);
        let miles = distance * 0.000621371;
        return miles;
      });
      getFridgeDistance(fridgeDistances);
    }
  }, []);

  // Fridge Markers

  // @TODO: Pull this into a seperate component and allow size and color as args
  const icon = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="43"
  height="43"
  viewBox="0 0 11.377 11.377"
>
  <path
    fill="#fff"
    stroke="#222"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="0.517"
    d="M10.084 4.701c0 3.456-4.395 6.418-4.395 6.418S1.293 8.157 1.293 4.7c0-1.178.463-2.308 1.287-3.141a4.372 4.372 0 013.11-1.3c1.165 0 2.283.468 3.108 1.3a4.467 4.467 0 011.287 3.142z"
  ></path>
  <circle cx="6.311" cy="4.231" r="0.362" fill="#222"></circle>
  <path
    fill="none"
    stroke="#222"
    strokeLinecap="round"
    strokeWidth="0.561"
    d="M3.879 4.654c1.254 1.097 2.544.97 3.62 0"
  ></path>
  <circle cx="4.953" cy="4.231" r="0.362" fill="#222"></circle>
  <circle cx="8.016" cy="4.396" r="0.776" fill="#ff6262"></circle>
  <circle cx="3.361" cy="4.396" r="0.776" fill="#ff6262"></circle>
</svg>`;

  let svgURL = 'data:image/svg+xml;base64,' + btoa(icon);

  const fridgePin = new Leaflet.Icon({
    iconUrl: svgURL,
    iconAnchor: [21, 43],
    popupAnchor: [10, -44],
    iconSize: [43, 43],
  });

  const fridgeMarkers =
    fridgeData.length > 0 &&
    fridgeData.map((fridge) => {
      let { lat, lng, id, name, streetAdress } = fridge;

      return (
        <Marker icon={fridgePin} position={[lat, lng]} key={id}>
          <Popup>{name}</Popup>
        </Marker>
      );
    });

  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <MapContainer
        style={{ height: '100vh' }}
        center={mapCenter}
        zoom={11}
        scrollWheelZoom={true}
        bounds={nycBoundBox}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        {fridgeMarkers}
        {utilizeUserLocation && (
          <CircleMarker center={userLocation} radius={40}></CircleMarker>
        )}
      </MapContainer>
    </Container>
  );
};

export default FridgeMapComponent;
