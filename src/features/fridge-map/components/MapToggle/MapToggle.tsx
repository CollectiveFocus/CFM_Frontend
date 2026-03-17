'use client';

import React from 'react';
import { Box, Typography, Fab } from '@mui/material';
import {
  MapOutlined as MapIcon,
  FormatListBulletedOutlined as ListIcon,
} from '@mui/icons-material';

export type MapView = 'map' | 'list';

interface MapToggleProps {
  currentView: MapView;
  setView: (view: MapView) => void;
}

export function MapToggle({
  currentView,
  setView,
}: MapToggleProps): React.ReactElement {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
      }}
      role="group"
      aria-label="Map view toggle"
    >
      <Fab
        variant="extended"
        color="primary"
        onClick={() => setView(currentView === 'map' ? 'list' : 'map')}
        sx={{
          textTransform: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          px: 4,
          height: 48,
          borderRadius: 24,
        }}
      >
        {currentView === 'map' ? (
          <>
            <ListIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Show List
            </Typography>
          </>
        ) : (
          <>
            <MapIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Show Map
            </Typography>
          </>
        )}
      </Fab>
    </Box>
  );
}
