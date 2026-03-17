'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Leaflet from 'leaflet';
import { Fridge } from 'types/domain';
import { pinColor } from 'theme/palette';
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
            <Popup className="custom-popup">
              <div style={{ fontFamily: 'inherit', padding: '4px' }}>
                <strong style={{ fontSize: '1rem', color: '#222' }}>
                  {name}
                </strong>
                <p
                  style={{
                    margin: '4px 0 12px 0',
                    color: '#666',
                    fontSize: '0.85rem',
                  }}
                >
                  {location.street}
                </p>
                <a
                  href={`/fridge/${id}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#1543D4',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    borderRadius: '24px',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                  }}
                >
                  View Details
                </a>
              </div>
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
      maxClusterRadius={20}
      disableClusteringAtZoom={16}
    >
      {markers}
    </MarkerClusterGroup>
  );
}
