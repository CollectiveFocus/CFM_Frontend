import React from 'react';
import { List, ListItem, Stack, Typography, Chip, Box } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarIcon,
  Instagram as InstagramIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material';
import {
  MapLegendPinLocationIcon,
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinGhostIcon,
  MapLegendPinNoReportIcon,
} from 'theme/icons';
import { pinColor } from 'theme/palette';
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
  const addressString = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;

  const [mapsUrl, setMapsUrl] = React.useState(
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressString)}`
  );

  React.useEffect(() => {
    const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    if (isApple) {
      setMapsUrl(
        `http://maps.apple.com/?daddr=${encodeURIComponent(addressString)}`
      );
    }
  }, [addressString]);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <LocationOnOutlinedIcon
        sx={{ color: 'text.secondary', fontSize: '1.5rem' }}
      />
      <Box component="address" sx={{ fontStyle: 'normal', m: 0 }}>
        <Typography
          component="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontSize: ['1rem'],
            color: 'text.primary',
            lineHeight: 1.4,
            textDecoration: 'none',
            display: 'block',
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
          }}
        >
          {addressString}
        </Typography>
      </Box>
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
      <InstagramIcon sx={{ color: 'text.secondary', fontSize: '1.5rem' }} />
      <Typography
        component="a"
        href={`https://instagram.com/${handle}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          fontSize: ['1rem'],
          color: 'text.primary',
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.main',
            textDecoration: 'underline',
          },
        }}
      >
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
      <CalendarIcon sx={{ color: 'text.secondary', fontSize: '1.5rem' }} />
      <Typography sx={{ fontSize: ['1rem'], color: 'text.primary' }}>
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
  if (!report) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
        <MapLegendPinNoReportIcon
          sx={{ width: 28, height: 28, color: pinColor.reportUnavailable }}
        />
        <Typography
          sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.secondary' }}
        >
          No status
        </Typography>
      </Box>
    );
  }

  const { condition, foodPercentage } = report;

  if (condition === 'not at location') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
        <MapLegendPinNotAtLocationIcon
          sx={{ width: 28, height: 28, color: pinColor.fridgeNotAtLocation }}
        />
        <Typography
          sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.secondary' }}
        >
          Not at location
        </Typography>
      </Box>
    );
  }

  if (condition === 'ghost') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
        <MapLegendPinGhostIcon
          sx={{ width: 28, height: 28, color: pinColor.fridgeGhost }}
        />
        <Typography
          sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.secondary' }}
        >
          Ghost Fridge
        </Typography>
      </Box>
    );
  }

  const foodLevels = ['Empty', 'Few Items', 'Many Items', 'Full'];
  const foodColors = [
    pinColor.itemsEmpty,
    pinColor.itemsFew,
    pinColor.itemsMany,
    pinColor.itemsFull,
  ];

  const foodText = foodLevels[foodPercentage] || 'Unknown';
  const foodColor = foodColors[foodPercentage] || foodColors[0];

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        mt: 0.5,
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MapLegendPinLocationIcon
          sx={{ width: 28, height: 28, color: foodColor }}
        />
        <Typography
          sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.secondary' }}
        >
          {foodText}
        </Typography>
      </Box>

      {condition === 'dirty' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MapLegendConditionDirtyIcon
            sx={{ width: 28, height: 28, color: pinColor.fridgeOperation }}
          />
          <Typography
            sx={{ fontSize: '1rem', fontWeight: 600, color: 'error.main' }}
          >
            Needs cleaning
          </Typography>
        </Box>
      )}
      {condition === 'out of order' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MapLegendConditionOutOfOrderIcon
            sx={{ width: 28, height: 28, color: pinColor.fridgeOperation }}
          />
          <Typography
            sx={{ fontSize: '1rem', fontWeight: 600, color: 'error.main' }}
          >
            Needs repairs
          </Typography>
        </Box>
      )}
    </Box>
  );
}

interface FridgeListProps {
  fridges: Fridge[];
}

export function FridgeList({ fridges }: FridgeListProps): React.ReactElement {
  return (
    <List disablePadding>
      {fridges.map((fridge, fridgeIndex) => (
        <ListItem
          key={fridge.id}
          divider={fridgeIndex !== fridges.length - 1}
          sx={{
            paddingY: 4,
            paddingX: { xs: 2, md: 0 },
            borderColor: 'rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Stack direction="column" spacing={2} width="100%">
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.125rem' },
                fontWeight: 800,
                color: 'text.primary',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {fridge.name}
            </Typography>
            <FridgeStatus report={fridge.report} />

            <Box sx={{ mt: 1 }}>
              <LocationInfo location={fridge.location} />
              {fridge.maintainer?.instagram ? (
                <Box sx={{ mt: 1 }}>
                  <InstagramInfo instagramUrl={fridge.maintainer.instagram} />
                </Box>
              ) : null}
              {fridge.report ? (
                <Box sx={{ mt: 1 }}>
                  <LastUpdateInfo date={fridge.report.timestamp} />
                </Box>
              ) : null}
            </Box>

            <Stack
              direction="row"
              width="100%"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <ButtonLink
                variant="outlined"
                to={`/fridge/${fridge.id}`}
                aria-label={`Details on ${fridge.name}`}
                sx={{
                  fontSize: '0.85rem',
                  px: 3,
                  py: 0.75,
                  flex: 'none',
                  borderRadius: 20,
                  minWidth: 'auto',
                }}
                title={'More Info'}
              />
              <ButtonLink
                variant="contained"
                to={`/fridge/${fridge.id}/report`}
                aria-label={`Update Status on ${fridge.name}`}
                sx={{
                  fontSize: '0.85rem',
                  px: 3,
                  py: 0.75,
                  flex: 'none',
                  borderRadius: 20,
                  minWidth: 'auto',
                }}
                title={'Update Status'}
              />
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
