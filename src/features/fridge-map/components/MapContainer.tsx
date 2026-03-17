'use client';

import React from 'react';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import { Box, IconButton, Tooltip } from '@mui/material';
import { MyLocation as MyLocationIcon } from '@mui/icons-material';
import { Fridge } from 'types/domain';
import { MarkerLayer } from './layers/MarkerLayer';
import { LegendDrawer } from './LegendDrawer';
import { useMapSync } from '../hooks/useMapSync';

interface MapProps {
  fridges: Fridge[];
  selectedFridgeId: string | null;
  onMarkerClick?: (id: string) => void;
}

const defaultMapCenter: [number, number] = [40.697759, -73.927282];
const defaultZoom = 13.2;

function LocateUserControl({
  onLocate,
}: {
  onLocate: () => void;
}): React.ReactElement {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 85, md: 24 }, // On mobile keep it above the floating toggle pill
        right: 16,
        zIndex: 1000,
      }}
    >
      <Tooltip title="Locate Me" placement="left">
        <IconButton
          onClick={onLocate}
          sx={{
            backgroundColor: 'background.paper',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            borderRadius: '50%',
            width: 44,
            height: 44,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          aria-label="Locate me"
        >
          <MyLocationIcon sx={{ color: 'text.primary', fontSize: 22 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

interface MapControllerProps {
  fridges: Fridge[];
  selectedFridgeId: string | null;
  setPanToUserAction: (fn: () => void) => void;
}

function MapController({
  fridges,
  selectedFridgeId,
  setPanToUserAction,
}: MapControllerProps): null {
  const { locateUser, panToUser } = useMapSync({ fridges, selectedFridgeId });

  React.useEffect(() => {
    locateUser();
    setPanToUserAction(() => panToUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function MapContainer({
  fridges,
  selectedFridgeId,
  onMarkerClick,
}: MapProps): React.ReactElement {
  const [panToUser, setPanToUser] = React.useState<(() => void) | null>(null);

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      <LeafletMapContainer
        style={{ height: '100%' }}
        center={defaultMapCenter}
        zoom={defaultZoom}
        minZoom={1}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <LocateUserControl onLocate={() => panToUser?.()} />
        <MapController
          fridges={fridges}
          selectedFridgeId={selectedFridgeId}
          setPanToUserAction={setPanToUser}
        />
        <TileLayer
          attribution="&copy; Fridge Finder"
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <MarkerLayer fridges={fridges} onMarkerClick={onMarkerClick} />
      </LeafletMapContainer>
      <LegendDrawer />
    </Box>
  );
}
