import { Marker, Popup } from 'react-leaflet';
import { Stack, Typography } from '@mui/material';
import { ButtonLink } from 'components/atoms';

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
            {city}, {state} {zip}
          </Typography>
          <Stack direction="row" width="100" spacing={3} sx={{ mt: 3 }}>
            <ButtonLink
              variant="contained"
              to={`/fridge/${id}`}
              aria-label={'Details on ' + fridgeName}
              sx={{ fontSize: ['small'] }}
              style={{ color: 'white' }}
              title={'More Info'}
            />
            <ButtonLink
              variant="contained"
              to={`/user/fridge/report/${id}`}
              aria-label={'Details on ' + fridgeName}
              sx={{ fontSize: ['small'] }}
              style={{ color: 'white' }}
              title={'Update Status'}
            />
          </Stack>
        </Popup>
      </Marker>
    );
  });
}
