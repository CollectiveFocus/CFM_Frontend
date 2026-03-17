'use client';

import React from 'react';
import { Stack, IconButton, Button, Box } from '@mui/material';
import {
  NotificationsOutlined as BellIcon,
  NotificationsActive as BellFilledIcon,
  Map as DirectionsIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { Location } from 'types/domain';

interface FridgeActionsProps {
  name: string;
  location: Location;
}

export function FridgeActions({
  name,
  location,
}: FridgeActionsProps): React.ReactElement {
  const [following, setFollowing] = React.useState(false);

  const address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;

  const shareResponse = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: `Fridge Finder: ${name}`,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  const handleFollow = () => {
    setFollowing((prev) => !prev);
  };

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ mb: 5, width: '100%', alignItems: 'stretch' }}
    >
      {/* Primary Action */}
      <Button
        variant="contained"
        color="primary"
        target="_blank"
        href={encodeURI(`https://www.google.com/maps/place/${address}`)}
        startIcon={<DirectionsIcon />}
        sx={{
          flex: 1, // Share available width equally
          borderRadius: 3,
          py: 1.5,
          fontWeight: 700,
          fontSize: '0.95rem',
          textTransform: 'none',
          boxShadow: 'none', // Flat shadowless aesthetic
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
        }}
      >
        Directions
      </Button>

      {/* Secondary Action */}
      <Button
        variant={following ? 'contained' : 'outlined'}
        color={following ? 'secondary' : 'inherit'}
        onClick={handleFollow}
        startIcon={following ? <BellFilledIcon /> : <BellIcon />}
        sx={{
          flex: 1, // Share available width equally
          borderRadius: 3,
          py: 1.5,
          fontWeight: 600,
          fontSize: '0.95rem',
          textTransform: 'none',
          color: following ? 'white' : 'text.primary',
          borderColor: following ? 'transparent' : 'divider',
          '&:hover': {
            borderColor: 'text.primary',
            backgroundColor: following ? 'secondary.dark' : 'rgba(0,0,0,0.02)',
          },
        }}
      >
        {following ? 'Following' : 'Follow'}
      </Button>

      {/* Tertiary Action (Icon Square) */}
      <Box>
        <IconButton
          onClick={shareResponse}
          aria-label="Share"
          sx={{
            width: 48,
            height: '100%', // Match button height
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderColor: 'text.primary',
              color: 'text.primary',
            },
          }}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
      </Box>
    </Stack>
  );
}
