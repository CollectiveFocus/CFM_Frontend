'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
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
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: 24,
        boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(0,0,0,0.05)',
        overflow: 'hidden',
        p: 0.5,
      }}
      role="group"
      aria-label="Map view toggle"
    >
      <Box
        onClick={() => setView('list')}
        role="button"
        aria-pressed={currentView === 'list'}
        tabIndex={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 3,
          py: 1,
          borderRadius: 20,
          cursor: 'pointer',
          backgroundColor:
            currentView === 'list' ? 'primary.main' : 'transparent',
          color: currentView === 'list' ? 'white' : 'text.primary',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor:
              currentView === 'list' ? 'primary.main' : 'rgba(0,0,0,0.05)',
          },
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setView('list');
          }
        }}
      >
        <ListIcon fontSize="small" />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mt: '2px',
          }}
        >
          List
        </Typography>
      </Box>

      <Box
        onClick={() => setView('map')}
        role="button"
        aria-pressed={currentView === 'map'}
        tabIndex={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 3,
          py: 1,
          borderRadius: 20,
          cursor: 'pointer',
          backgroundColor:
            currentView === 'map' ? 'primary.main' : 'transparent',
          color: currentView === 'map' ? 'white' : 'text.primary',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor:
              currentView === 'map' ? 'primary.main' : 'rgba(0,0,0,0.05)',
          },
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setView('map');
          }
        }}
      >
        <MapIcon fontSize="small" />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mt: '2px',
          }}
        >
          Map
        </Typography>
      </Box>
    </Box>
  );
}
