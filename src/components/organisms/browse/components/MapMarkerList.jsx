import Link from 'next/link';
import { Marker, Popup } from 'react-leaflet';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { ButtonLink } from 'components/atoms';
import { Stack } from '@mui/material';

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
          <Typography variant="caption">{MoreInfo(id, fridgeName)}</Typography>
          <br />
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: '1rem', margin: 0 }}
          >
            {street}
            <br />
            {city}, {state} {zip}&nbsp;
            <br />
          </Typography>
          <Stack direction="row" width="100" spacing={3}>
            <ButtonLink
              variant="contained"
              to={`/fridge/${id}`}
              aria-label={'Details on ' + fridgeName}
              sx={{ fontSize: ['small'] }}
              style={{ color: 'white' }}
            >
              More Info
            </ButtonLink>
            <ButtonLink
              variant="contained"
              to={`/user/fridge/report/${id}`}
              aria-label={'Details on ' + fridgeName}
              sx={{ fontSize: ['small'] }}
              style={{ color: 'white' }}
            >
              Update Status
            </ButtonLink>
          </Stack>
        </Popup>
      </Marker>
    );
  });
}

const MoreInfo = (id, words) =>
  id ? <Link href={`/fridge/${id}`}>{words}</Link> : null;
