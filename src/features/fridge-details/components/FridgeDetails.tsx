import React from 'react';
import { Box, Typography, Stack, Link, Divider } from '@mui/material';
import { Fridge } from 'types/domain';

interface DetailRowProps {
  label: string;
  content: React.ReactNode;
}

function DetailRow({ label, content }: DetailRowProps) {
  if (!content) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        pb: 4,
        mb: 4,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          color: 'text.primary',
          fontSize: '1rem',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        {content}
      </Box>
    </Box>
  );
}

export function FridgeDetails({
  fridge,
}: {
  fridge: Fridge;
}): React.ReactElement {
  const address = `${fridge.location.street}\n${fridge.location.city}, ${fridge.location.state} ${fridge.location.zip}`;

  const renderInstagram = () => {
    if (!fridge.maintainer?.instagram) return null;
    const match =
      /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/([\w.]+)/gim.exec(
        fridge.maintainer.instagram
      );
    const handle = match ? match[1] : fridge.maintainer.instagram;
    return (
      <Link
        href={`https://instagram.com/${handle}`}
        target="_blank"
        rel="noopener"
        underline="hover"
        sx={{ color: 'primary.main', fontWeight: 600 }}
      >
        @{handle}
      </Link>
    );
  };

  const renderWebsite = () => {
    if (!fridge.maintainer?.website) return null;
    return (
      <Link
        href={fridge.maintainer.website}
        target="_blank"
        rel="noopener"
        underline="hover"
        sx={{ color: 'primary.main', fontWeight: 600, wordBreak: 'break-all' }}
      >
        {fridge.maintainer.website.replace(/^https?:\/\//, '')}
      </Link>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Description */}
      {fridge.notes && (
        <Box
          sx={{
            pb: 4,
            mb: 4,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}
          >
            About this fridge
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, color: 'text.secondary' }}
          >
            {fridge.notes}
          </Typography>
        </Box>
      )}

      {/* Address */}
      <DetailRow
        label="Location"
        content={<Box sx={{ whiteSpace: 'pre-line' }}>{address}</Box>}
      />

      {/* Links */}
      {(fridge.maintainer?.instagram || fridge.maintainer?.website) && (
        <DetailRow
          label="Maintainer Info"
          content={
            <Stack spacing={1.5}>
              {renderInstagram()}
              {renderWebsite()}
            </Stack>
          }
        />
      )}

      {/* Coordinates (For mapping/tech details) */}
      <DetailRow
        label="Coordinates"
        content={
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
          >
            {fridge.location.geoLat.toFixed(5)},{' '}
            {fridge.location.geoLng.toFixed(5)}
          </Typography>
        }
      />
    </Box>
  );
}
