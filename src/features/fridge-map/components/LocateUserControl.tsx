import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { createPortal } from 'react-dom';
import { IconButton, Tooltip } from '@mui/material';
import { MyLocation as MyLocationIcon } from '@mui/icons-material';
import { useMapStore } from 'store/useMapStore';

interface LocateUserControlProps {
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
}

export function LocateUserControl({
  position = 'bottomright',
}: LocateUserControlProps): React.ReactElement | null {
  const map = useMap();
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const userLocation = useMapStore((state) => state.userLocation);

  React.useEffect(() => {
    const div = L.DomUtil.create('div');
    // We add 'leaflet-control' and 'leaflet-bar' so it looks like a standard Leaflet control
    div.className = 'leaflet-control leaflet-bar';
    div.style.border = 'none'; // We override the border to use MUI's

    const LocateControl = L.Control.extend({
      onAdd: () => div,
      onRemove: () => {},
    });

    const control = new LocateControl({ position });
    control.addTo(map);

    setContainer(div);

    return () => {
      control.remove();
    };
  }, [map, position]);

  const handleLocate = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

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
    },
    [map, userLocation]
  );

  if (!container) return null;

  return createPortal(
    <Tooltip title="Locate Me" placement="left">
      <IconButton
        onClick={handleLocate}
        onDoubleClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: '0 1px 5px rgba(0,0,0,0.65)',
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
    </Tooltip>,
    container
  );
}
