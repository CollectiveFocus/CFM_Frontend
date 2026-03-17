'use client';

import React from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AnchorLink from 'next/link';

import { Fridge, FridgeReport } from 'types/domain';
import { FridgeHeader } from './FridgeHeader';
import { FridgeHeroImage } from './FridgeHeroImage';
import { FridgeActions } from './FridgeActions';
import { FridgeDetails } from './FridgeDetails';
import { FridgeActivity } from './FridgeActivity';

export interface FridgeInformationProps {
  fridge: Fridge;
  report?: FridgeReport | null;
  allReports?: FridgeReport[];
}

export function FridgeInformation({
  fridge,
  allReports = [],
}: FridgeInformationProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: 12,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 5 } }}>
        {/* Universal Back Link */}
        <AnchorLink
          href="/browse"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            marginBottom: '32px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18, mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Back to Map
            </Typography>
          </Box>
        </AnchorLink>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 8 }}
          alignItems="flex-start"
        >
          {/* Left Column: Image, Header, Details */}
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              position: { md: 'sticky' },
              top: { md: 32 },
            }}
          >
            <FridgeHeroImage
              src={fridge.photoUrl}
              alt={`Photo of ${fridge.name}`}
            />
            <FridgeHeader fridge={fridge} />
            <FridgeActions name={fridge.name} location={fridge.location} />
            <FridgeDetails fridge={fridge} />
          </Box>

          {/* Right Column: Social Feed */}
          <Box
            sx={{
              width: { xs: '100%', md: '55%' },
              mt: { xs: 8, md: 0 },
              pl: { md: 4 },
            }}
          >
            <FridgeActivity reports={allReports} fridge={fridge} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
