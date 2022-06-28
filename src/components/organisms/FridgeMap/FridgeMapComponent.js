import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
  CircleMarker,
} from 'react-leaflet';

export default function FridgeMapComponent() {
  const defaultLocation = [40.70580857568261, -73.99646699561376]; // Brooklyn Bridge
  const mapStyles = {
    width: '100%',
    height: '100vh',
  };

  const nycBoundBox = [-74.122221, 40.569088, -73.73564, 40.953952];

  const radius = 25;
  const fridgeData = require('./FridgeData.json');
  const fridgeMarkers = fridgeData.fridges.map((fridge) => {
    let { lat, lng, id, name } = fridge;
    return (
      <CircleMarker center={[lat, lng]} key={id}>
        <Popup>{name}</Popup>
      </CircleMarker>
    );
  });
  console.table(fridgeData);
  return (
    <MapContainer
      style={{ height: '100vh' }}
      center={defaultLocation}
      zoom={13}
      scrollWheelZoom={false}
    >
      {/* <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  /> */}
      {/* <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
    maxZoom={20} 
  /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={19}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <Marker position={defaultLocation}></Marker>
      {fridgeMarkers}
    </MapContainer>
  );
}
