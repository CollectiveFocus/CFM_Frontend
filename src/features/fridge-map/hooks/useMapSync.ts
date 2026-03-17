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
  const userAccuracyRef = useRef<L.Circle | null>(null);
  const isFirstLocationFound = useRef(true);

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
      const radius = e.accuracy / 2;

      // Update marker and accuracy circle
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(userPosition);
      } else {
        userMarkerRef.current = L.circleMarker(userPosition, {
          radius: 8,
          color: '#ffffff',
          fillColor: '#1543D4',
          fillOpacity: 1,
          weight: 3,
        }).addTo(map);
      }

      if (userAccuracyRef.current) {
        userAccuracyRef.current.setLatLng(userPosition);
        userAccuracyRef.current.setRadius(radius);
      } else {
        userAccuracyRef.current = L.circle(userPosition, {
          radius: radius,
          color: '#1543D4',
          fillOpacity: 0.15,
          weight: 1,
        }).addTo(map);
      }

      // Only fly automatically on the very first location found
      if (isFirstLocationFound.current) {
        isFirstLocationFound.current = false;

        const defaultCenter: [number, number] = [40.697759, -73.927282];
        const maxDistMeters = 200000;

        const dist = deltaInMeters(defaultCenter, [
          userPosition.lat,
          userPosition.lng,
        ]);

        if (dist <= maxDistMeters) {
          map.flyTo(userPosition, 14, { animate: false }); // Start without heavy animation on load
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
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }
      }
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
      if (userAccuracyRef.current) {
        userAccuracyRef.current.remove();
        userAccuracyRef.current = null;
      }
    };
  }, [map, onLocationFound]);

  const locateUser = useCallback(() => {
    // Start watching user location continuously in the background
    map.locate({ watch: true, enableHighAccuracy: true, setView: false });
  }, [map]);

  const panToUser = useCallback(() => {
    if (userMarkerRef.current) {
      map.flyTo(userMarkerRef.current.getLatLng(), 15, { animate: true });
    } else {
      map.locate({ setView: true, maxZoom: 15 });
    }
  }, [map]);

  return { locateUser, panToUser };
}
