import { useEffect, useCallback, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { Fridge } from 'types/domain';
import { deltaInMeters } from 'utils/geo';

interface UseMapSyncProps {
  fridges: Fridge[];
  selectedFridgeId: string | null;
}

export function useMapSync({ fridges, selectedFridgeId }: UseMapSyncProps) {
  const map = useMap();
  const userMarkerRef = useRef<L.CircleMarker | null>(null);

  useEffect(() => {
    if (selectedFridgeId) {
      const fridge = fridges.find((f) => f.id === selectedFridgeId);
      if (fridge) {
        map.flyTo([fridge.location.geoLat, fridge.location.geoLng], 15);
      }
    }
  }, [selectedFridgeId, fridges, map]);

  const onLocationFound = useCallback(
    (e: L.LocationEvent) => {
      const userPosition = e.latlng;
      const defaultCenter: [number, number] = [40.697759, -73.927282];
      const maxDistMeters = 200000;

      const dist = deltaInMeters(defaultCenter, [
        userPosition.lat,
        userPosition.lng,
      ]);

      if (dist <= maxDistMeters) {
        map.flyTo(userPosition, 14);
      } else {
        // Find nearest fridge if user is too far from NYC
        let nearest: Fridge | null = null;
        let minDist = Infinity;

        fridges.forEach((f) => {
          const d = deltaInMeters(
            [userPosition.lat, userPosition.lng],
            [f.location.geoLat, f.location.geoLng]
          );
          if (d < minDist) {
            minDist = d;
            nearest = f;
          }
        });

        if (nearest) {
          const bounds = L.latLngBounds(userPosition, [
            (nearest as Fridge).location.geoLat,
            (nearest as Fridge).location.geoLng,
          ]);
          map.flyToBounds(bounds, { padding: [50, 50] });
        }
      }

      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      userMarkerRef.current = L.circleMarker(userPosition, {
        radius: 10,
        color: '#3388ff',
      }).addTo(map);
    },
    [fridges, map]
  );

  useEffect(() => {
    map.on('locationfound', onLocationFound);
    return () => {
      map.off('locationfound', onLocationFound);
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
    };
  }, [map, onLocationFound]);

  const locateUser = useCallback(() => {
    map.locate();
  }, [map]);

  return { locateUser };
}
