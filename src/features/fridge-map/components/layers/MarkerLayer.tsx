'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Leaflet from 'leaflet';
import { Stack, Typography } from '@mui/material';
import { Fridge } from 'types/domain';
import { pinColor } from 'theme/palette';
import { ButtonLink } from 'components/atoms';
import {
  svgDecorationDirty,
  svgDecorationOutOfOrder,
  svgUrlPinGhost,
  svgUrlPinLocation,
  svgUrlPinNoReport,
  svgUrlPinNotAtLocation,
} from 'theme/icons';

interface MarkerLayerProps {
  fridges: Fridge[];
  onMarkerClick?: (id: string) => void;
}

const colorFrom: Record<number, string> = Object.freeze({
  0: pinColor.itemsEmpty,
  1: pinColor.itemsFew,
  2: pinColor.itemsMany,
  3: pinColor.itemsFull,
});

const decorationFrom: Record<string, string> = Object.freeze({
  good: '',
  dirty: svgDecorationDirty,
  'out of order': svgDecorationOutOfOrder,
});

const iconCache: Record<string, Leaflet.Icon> = {};

function getLeafletIcon(hash: string, svgUrl: string): Leaflet.Icon {
  if (hash in iconCache) {
    return iconCache[hash];
  }
  const icon = new Leaflet.Icon({
    iconUrl: svgUrl,
    popupAnchor: [0, -40],
    iconAnchor: [20, 40],
    iconSize: [40, 40],
  });
  iconCache[hash] = icon;
  return icon;
}

function iconFrom(condition: string, foodPercentage: number): Leaflet.Icon {
  switch (condition) {
    case 'not at location':
      return getLeafletIcon(condition, svgUrlPinNotAtLocation());
    case 'no report':
      return getLeafletIcon(condition, svgUrlPinNoReport());
    case 'ghost':
      return getLeafletIcon(condition, svgUrlPinGhost());
    default:
      return getLeafletIcon(
        condition + foodPercentage,
        svgUrlPinLocation(
          colorFrom[foodPercentage] || colorFrom[0],
          decorationFrom[condition] || ''
        )
      );
  }
}

export function MarkerLayer({
  fridges,
  onMarkerClick,
}: MarkerLayerProps): React.ReactElement {
  const markers = React.useMemo(() => {
    return fridges
      .filter((fridge) => fridge.location.geoLat && fridge.location.geoLng)
      .map((fridge) => {
        const { id, name, location, report } = fridge;
        const condition = report?.condition || 'no report';
        const foodPercentage = report?.foodPercentage || 0;

        return (
          <Marker
            key={id}
            position={[location.geoLat, location.geoLng]}
            icon={iconFrom(condition, foodPercentage)}
            eventHandlers={{
              click: () => onMarkerClick?.(id),
            }}
          >
            <Popup>
              <Typography variant="caption">{name}</Typography>
              <br />
              <Typography
                variant="body2"
                component="span"
                sx={{ fontSize: '1rem', margin: 0 }}
              >
                {location.street}
                <br />
                {location.city}, {location.state} {location.zip}
              </Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
                {/* style prop needed: Leaflet's popup CSS targets <a> elements and overrides MUI button text color */}
                <ButtonLink
                  variant="contained"
                  to={`/fridge/${id}`}
                  aria-label={`Details of ${name}`}
                  sx={{ fontSize: ['0.85rem'] }}
                  style={{ color: 'white' }}
                  title="More Info"
                />
                <ButtonLink
                  variant="contained"
                  to={`/user/fridge/report/${id}`}
                  aria-label={`Update status of ${name}`}
                  sx={{ fontSize: ['0.85rem'] }}
                  style={{ color: 'white' }}
                  title="Update Status"
                />
              </Stack>
            </Popup>
          </Marker>
        );
      });
  }, [fridges, onMarkerClick]);

  return (
    <MarkerClusterGroup
      chunkedLoading
      spiderfyOnMaxZoom={true}
      showCoverageOnHover={false}
      maxClusterRadius={15}
      disableClusteringAtZoom={15}
    >
      {markers}
    </MarkerClusterGroup>
  );
}
