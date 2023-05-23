import PropTypes from 'prop-types';
import { List, ListItem, Stack, Typography } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarIcon,
  Instagram as InstagramIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material';
import { ButtonLink } from 'components/atoms';
import typesView from 'model/view/prop-types';

function Location({ location }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <LocationOnOutlinedIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        {location.street}
      </Typography>
    </Stack>
  );
}
Location.propTypes = {
  location: typesView.Location,
};

function Instagram({ instagramUrl }) {
  const instagramRegex =
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;
  const handle = instagramRegex.exec(instagramUrl);
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <InstagramIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        @{handle[1]}
      </Typography>
    </Stack>
  );
}
Instagram.propTypes = {
  instagramUrl: PropTypes.string.isRequired,
};

function LastUpdate({ date }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <CalendarIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        Last Update: {date.toLocaleDateString()}
      </Typography>
    </Stack>
  );
}
LastUpdate.propTypes = {
  date: PropTypes.object.isRequired,
};

export default function FridgeList({ fridges }) {
  return (
    <List>
      {fridges.map((fridge, fridgeIndex) => (
        <ListItem
          key={fridge.id}
          divider={fridgeIndex !== fridges.length - 1}
          sx={{ paddingY: 5.5, paddingX: 0 }}
        >
          <Stack direction="column" spacing={3} width="100%">
            <Stack direction="row" spacing={3}>
              <Stack direction="column" spacing={3} flex={1}>
                <Typography sx={{ fontSize: ['1rem'], fontWeight: 700 }}>
                  {fridge.name}
                </Typography>
                <Location location={fridge.location} />
                {fridge.maintainer?.instagram ? (
                  <Instagram instagramUrl={fridge.maintainer.instagram} />
                ) : null}
                {fridge.report ? (
                  <LastUpdate date={fridge.report.timestamp} />
                ) : null}
              </Stack>
            </Stack>
            <ButtonLink
              variant="contained"
              to={`/fridge/${fridge.id}`}
              aria-label={'Details on ' + fridge.name}
              sx={{ fontSize: ['1rem'] }}
            >
              More Info
            </ButtonLink>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
FridgeList.propTypes = {
  fridges: PropTypes.arrayOf(typesView.Fridge),
};
