'use client';

import React from 'react';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import { Box } from '@mui/material';
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

interface MapControllerProps {
  fridges: Fridge[];
  selectedFridgeId: string | null;
}

function MapController({
  fridges,
  selectedFridgeId,
}: MapControllerProps): null {
  const { locateUser } = useMapSync({ fridges, selectedFridgeId });

  React.useEffect(() => {
    locateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return null;
}

export function MapContainer({
  fridges,
  selectedFridgeId,
  onMarkerClick,
}: MapProps): React.ReactElement {
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
        <ZoomControl position="bottomright" />
        <MapController fridges={fridges} selectedFridgeId={selectedFridgeId} />
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
