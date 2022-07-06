import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Container } from '@mui/system';

const FridgeMap = () => {
  const fridgeData = require('./FridgeData.json');
  const defaultLocation = [40.70580857568261, -73.99646699561376]; // default location Brooklyn Bridge

  let basePin = require('../../../theme/icons/');
  let svgURL = 'data:image/svg+xml;base64,' + btoa(icon);

  const fridgePin = new Leaflet.Icon({
    iconUrl: svgURL,
    iconAnchor: [21, 43],
    popupAnchor: [10, -44],
    iconSize: [43, 43],
  });
  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <MapContainer
        style={{ height: '100vh' }}
        center={defaultLocation}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
      </MapContainer>
    </Container>
  );
};

export default FridgeMap;
