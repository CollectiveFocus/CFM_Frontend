import Link from 'next/link';
import { Marker, Popup } from 'react-leaflet';
import { Typography } from '@mui/material';

const LinkToFridge = (id, str) => <Link href={`/fridge/${id}`}>{str}</Link>;

export default function MapMarkerList({ markerDataList }) {
  return markerDataList.map(({ marker, popup }, index) => {
    const {
      id,
      name: fridgeName,
      location: { street, city, state, zip },
    } = popup;

    return (
      <Marker {...marker} key={index}>
        <Popup>
          <Typography variant="caption">
            {LinkToFridge(id, fridgeName)}
          </Typography>
          <br />
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: '1rem', margin: 0 }}
          >
            {street}
            <br />
            {city}, {state} {zip}
            <br />
            {LinkToFridge(id, 'more info...')}
          </Typography>
        </Popup>
      </Marker>
    );
  });
}
