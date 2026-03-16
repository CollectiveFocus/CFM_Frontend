import React from 'react';
import { List, ListItem, Stack, Typography } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarIcon,
  Instagram as InstagramIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material';
import { ButtonLink } from 'components/atoms';
import { Fridge, Location as LocationType } from 'types/domain';

function formatDate(isoString: string): string {
  const msSinceEpoch = Date.parse(isoString);
  return new Date(msSinceEpoch).toLocaleDateString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface LocationInfoProps {
  location: LocationType;
}

function LocationInfo({ location }: LocationInfoProps): React.ReactElement {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <LocationOnOutlinedIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        {location.street}
        <br />
        {location.city}, {location.state} {location.zip}
      </Typography>
    </Stack>
  );
}

interface InstagramInfoProps {
  instagramUrl: string;
}

function InstagramInfo({
  instagramUrl,
}: InstagramInfoProps): React.ReactElement {
  const instagramRegex =
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/([\w.]+)/gim;
  const match = instagramRegex.exec(instagramUrl);
  const handle = match ? match[1] : instagramUrl;

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <InstagramIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        @{handle}
      </Typography>
    </Stack>
  );
}

interface LastUpdateInfoProps {
  date: string;
}

function LastUpdateInfo({ date }: LastUpdateInfoProps): React.ReactElement {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <CalendarIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        Last Update: {formatDate(date)}
      </Typography>
    </Stack>
  );
}

interface FridgeListProps {
  fridges: Fridge[];
}

export function FridgeList({ fridges }: FridgeListProps): React.ReactElement {
  return (
    <List>
      {fridges.map((fridge, fridgeIndex) => (
        <ListItem
          key={fridge.id}
          divider={fridgeIndex !== fridges.length - 1}
          sx={{
            paddingY: 4,
            paddingX: 3,
            transition: 'background-color 0.2s',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.02)',
            },
          }}
        >
          <Stack direction="column" spacing={3} width="100%">
            <Stack direction="row" spacing={3}>
              <Stack direction="column" spacing={3} flex={1}>
                <Typography sx={{ fontSize: ['1rem'], fontWeight: 700 }}>
                  {fridge.name}
                </Typography>
                <LocationInfo location={fridge.location} />
                {fridge.maintainer?.instagram ? (
                  <InstagramInfo instagramUrl={fridge.maintainer.instagram} />
                ) : null}
                {fridge.report ? (
                  <LastUpdateInfo date={fridge.report.timestamp} />
                ) : null}
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              width="100%"
              spacing={3}
              sx={{ mt: 2 }}
            >
              <ButtonLink
                variant="contained"
                to={`/fridge/${fridge.id}`}
                aria-label={'Details on ' + fridge.name}
                sx={{ fontSize: ['1rem'], flex: 1 }}
                title={'More Info'}
              />
              <ButtonLink
                variant="contained"
                to={`/user/fridge/report/${fridge.id}`}
                aria-label={'Update Status on ' + fridge.name}
                sx={{ fontSize: ['1rem'], flex: 1 }}
                title={'Update Status'}
              />
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
