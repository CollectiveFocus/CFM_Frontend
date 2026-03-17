'use client';

import React from 'react';
import { Button } from '@mui/material';
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
    <Button
      fullWidth
      startIcon={currentView === 'map' ? <ListIcon /> : <MapIcon />}
      sx={{
        position: 'fixed',
        bottom: 0,
        zIndex: 999,
        height: 60,
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: 3,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: '-2px 0px 4px rgb(0 0 0 / 20%)',
        justifyContent: 'left',
        padding: 5,
        fontWeight: 500,
        textTransform: 'none',
        ':hover': { backgroundColor: '#fff' },
      }}
      onClick={() => setView(currentView === 'map' ? 'list' : 'map')}
    >
      {currentView === 'map' ? 'List View' : 'Map View'}
    </Button>
  );
}
