import Link from 'next/link';
import { Marker, Popup } from 'react-leaflet';
import { Typography } from '@mui/material';

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
          <Typography variant="caption">{fridgeName}</Typography>
          <br />
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: '1rem', margin: 0 }}
          >
            {street}
            <br />
            {city}, {state} {zip}&nbsp;
            {MoreInfo(id)}
          </Typography>
        </Popup>
      </Marker>
    );
  });
}

const MoreInfo = (id) =>
  id ? <Link href={`/fridge/${id}`}>.&nbsp;.&nbsp;.</Link> : null;
