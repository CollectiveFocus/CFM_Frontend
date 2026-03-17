import React from 'react';
import { List, ListItem, Stack, Typography, Chip, Box } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarIcon,
  Instagram as InstagramIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material';
import { ButtonLink } from 'components/ui';
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
    <Stack direction="row" spacing={2} alignItems="center">
      <LocationOnOutlinedIcon
        sx={{ color: 'text.secondary', fontSize: '1.25rem' }}
      />
      <Typography
        sx={{ fontSize: ['0.95rem'], color: 'text.secondary', lineHeight: 1.4 }}
      >
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
    <Stack direction="row" spacing={2} alignItems="center">
      <InstagramIcon sx={{ color: 'text.secondary', fontSize: '1.25rem' }} />
      <Typography sx={{ fontSize: ['0.95rem'], color: 'text.secondary' }}>
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
    <Stack direction="row" spacing={2} alignItems="center">
      <CalendarIcon sx={{ color: 'text.secondary', fontSize: '1.25rem' }} />
      <Typography sx={{ fontSize: ['0.95rem'], color: 'text.secondary' }}>
        Last Update: {formatDate(date)}
      </Typography>
    </Stack>
  );
}

function FridgeStatus({
  report,
}: {
  report: Fridge['report'];
}): React.ReactElement | null {
  if (!report) return null;
  const foodLevels = ['Empty', 'Few Items', 'Many Items', 'Full'];
  const foodText = foodLevels[report.foodPercentage] || 'Unknown';
  const condition = report.condition === 'good' ? null : report.condition;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
      <Chip
        label={foodText}
        size="small"
        sx={{
          fontWeight: 600,
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
          borderRadius: 2,
        }}
      />
      {condition && (
        <Chip
          label={condition}
          size="small"
          color="error"
          variant="outlined"
          sx={{
            fontWeight: 600,
            textTransform: 'capitalize',
            borderRadius: 2,
          }}
        />
      )}
    </Box>
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
            paddingX: 0,
            borderColor: 'rgba(0,0,0,0.04)',
          }}
        >
          <Stack direction="column" spacing={3} width="100%">
            <Stack direction="row" spacing={3}>
              <Stack direction="column" spacing={2} flex={1}>
                <Typography
                  sx={{
                    fontSize: ['1.125rem'],
                    fontWeight: 800,
                    color: 'text.primary',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {fridge.name}
                </Typography>
                <FridgeStatus report={fridge.report} />
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
              spacing={2}
              sx={{ mt: 1 }}
            >
              <ButtonLink
                variant="outlined"
                to={`/fridge/${fridge.id}`}
                aria-label={`Details on ${fridge.name}`}
                sx={{ fontSize: ['0.95rem'], flex: 1 }}
                title={'More Info'}
              />
              <ButtonLink
                variant="contained"
                to={`/fridge/${fridge.id}/report`}
                aria-label={`Update Status on ${fridge.name}`}
                sx={{ fontSize: ['0.95rem'], flex: 1 }}
                title={'Update Status'}
              />
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
