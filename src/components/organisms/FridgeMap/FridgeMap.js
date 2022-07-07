import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Container } from '@mui/system';
import Leaflet from 'leaflet';
import { Button } from '@mui/material';
import { MapPinIcon } from 'theme/icons';

const FridgeMap = () => {
  const fridgeData = require('./FridgeData.json');
  const defaultLocation = [40.70580857568261, -73.99646699561376]; // default location Brooklyn Bridge

  let basePin = require('../../../theme/icons/mapPin.svg');
  let svgUrl = 'data:image/svg+xml;base64,' + btoa(basePin);

  const fridgePin = new Leaflet.Icon({
    iconUrl: require('../../../theme/icons/mapPin.svg'),
    iconRetinaUrl: require('../../../theme/icons/mapPin.svg'),
    shadowUrl: null,
    iconAnchor: [21, 43],
    popupAnchor: [10, -44],
    iconSize: [43, 43],
  });
  // If I place <MapPinIcon> Directly in return it will render. does not like being child of <Marker> probably because this is JSX?
  const fridgeDiv = Leaflet.divIcon({
    className: 'fridge-pin',
    html: `
    <MapPinIcon sx={{zIndex:999}}>
    Test
    </MapPinIcon>
    `,
  });

  // const fridgeDiv = Leaflet.divIcon({
  //   className: 'fridge-pin',
  //   html: `
  //   <div>
  //   {basePin}
  //   <MapPinIcon sx={{zIndex:999}}>
  //   Test
  // </MapPinIcon>
  //     </div>
  //   `,
  // });

  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      {/* <MapPinIcon sx={{}}>Test</MapPinIcon> //This will render */}
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
        <Marker icon={fridgeDiv} position={defaultLocation}></Marker>
      </MapContainer>
    </Container>
  );
};

export default FridgeMap;
