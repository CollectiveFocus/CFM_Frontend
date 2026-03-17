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
import { useMapStore } from 'store/useMapStore';

interface MapProps {
  fridges: Fridge[];
  selectedFridgeId: string | null;
  onMarkerClick?: (id: string) => void;
}

const defaultMapCenter: [number, number] = [40.697759, -73.927282];
const defaultZoom = 13.2;

function LocateUserControl(): React.ReactElement | null {
  const map = useMap();
  const userLocation = useMapStore((state) => state.userLocation);

  const handleLocate = () => {
    if (userLocation) {
      map.flyTo(userLocation, 15, { animate: true, duration: 1.0 });
    } else {
      const isSecureContext =
        window.location.protocol === 'https:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      if (!isSecureContext) {
        alert(
          'Location access is blocked by your browser on insecure networks. To test live location on a phone, use a secure HTTPS tunnel (like ngrok) or localhost.'
        );
        return;
      }
      map.locate({ setView: true, maxZoom: 15, enableHighAccuracy: false });
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 170, md: 100 }, // Cleanly stack exactly above the 70px tall Leaflet Zoom Controls
        right: 10,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Tooltip title="Locate Me" placement="left">
        <IconButton
          onClick={handleLocate}
          sx={{
            backgroundColor: 'background.paper',
            boxShadow: '0 1px 5px rgba(0,0,0,0.65)', // Match Leaflet exact shadow
            borderRadius: '4px',
            width: 34,
            height: 34,
            border: '2px solid rgba(0,0,0,0.2)',
            '&:hover': {
              backgroundColor: '#f4f4f4',
            },
          }}
          aria-label="Locate me"
        >
          <MyLocationIcon sx={{ color: 'text.primary', fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

interface MapControllerProps {
  fridges: Fridge[];
  selectedFridgeId: string | null;
}

function MapController({
  fridges,
  selectedFridgeId,
}: MapControllerProps): null {
  const { locateUser } = useMapSync({ fridges, selectedFridgeId });
  const setCenter = useMapStore((state) => state.setCenter);
  const setZoom = useMapStore((state) => state.setZoom);
  const map = useMap();

  React.useEffect(() => {
    locateUser();

    let moveTimeout: NodeJS.Timeout;
    const handleMoveEnd = () => {
      // Debounce writing map coordinates to Zustand so the map doesn't get flooded with state updates
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        const newCenter = map.getCenter();
        setCenter([newCenter.lat, newCenter.lng]);
        setZoom(map.getZoom());
      }, 500);
    };

    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('moveend', handleMoveEnd);
      clearTimeout(moveTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function MapContainer({
  fridges,
  selectedFridgeId,
  onMarkerClick,
}: MapProps): React.ReactElement | null {
  const [lng, setLng] = React.useState('en');
  const [isClient, setIsClient] = React.useState(false);
  const initialCenter = useMapStore((state) => state.center);
  const initialZoom = useMapStore((state) => state.zoom);

  React.useEffect(() => {
    setIsClient(true);
    // Only runs on the client. Extracts the ?lng= param from the URL if present.
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setLng(params.get('lng') || 'en');
    }
  }, []);

  if (!isClient) {
    return null; // Wait for hydration to ensure Zustand store loads persisted state correctly
  }

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      <LeafletMapContainer
        style={{ height: '100%' }}
        center={initialCenter || defaultMapCenter}
        zoom={initialZoom || defaultZoom}
        minZoom={1}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <LocateUserControl />
        <MapController fridges={fridges} selectedFridgeId={selectedFridgeId} />
        <TileLayer
          attribution="&copy; Fridge Finder"
          url={`https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=${lng}`}
          maxZoom={19}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <MarkerLayer fridges={fridges} onMarkerClick={onMarkerClick} />
      </LeafletMapContainer>
      <LegendDrawer />
    </Box>
  );
}
