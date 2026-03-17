import React from 'react';
import { Box, Typography, Stack, Skeleton } from '@mui/material';
import {
  Verified as VerifiedIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { Fridge } from 'types/domain';
import { useNeighborhood } from '../hooks/useNeighborhood';

export function FridgeHeader({ fridge }: { fridge: Fridge }) {
  const { neighborhood, loading } = useNeighborhood(
    fridge.location.geoLat,
    fridge.location.geoLng,
    fridge.location.city
  );

  return (
    <Box sx={{ mb: 4 }}>
      {/* Title */}
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.04em',
          fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
          lineHeight: 1.1,
          color: 'text.primary',
          mb: 2,
        }}
      >
        {fridge.name}
      </Typography>

      {/* Meta Row: Clean typography, no colored chips, just elegant icons and text */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2.5}
        flexWrap="wrap"
        useFlexGap
        sx={{ rowGap: 1 }}
      >
        {/* Verification Status */}
        {fridge.verified && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <VerifiedIcon sx={{ color: 'primary.main', fontSize: 18 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              Verified Fridge
            </Typography>
          </Box>
        )}

        {/* Neighborhood / Location */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'text.secondary',
          }}
        >
          <LocationIcon sx={{ fontSize: 18 }} />
          {loading ? (
            <Skeleton width={100} height={20} />
          ) : (
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {neighborhood || fridge.location.city}, {fridge.location.state}
            </Typography>
          )}
        </Box>

        {/* ID */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'text.disabled',
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontWeight: 500 }}
          >
            #{fridge.id.substring(0, 6).toUpperCase()}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
