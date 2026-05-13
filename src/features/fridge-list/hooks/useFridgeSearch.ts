import {
  useState,
  useMemo,
  useDeferredValue,
  useRef,
  useEffect,
  startTransition,
} from 'react';
import Fuse from 'fuse.js';
import { Fridge } from 'types/domain';
import { useMapStore } from 'store/useMapStore';
import { deltaInMeters } from 'utils/geo';

export function useFridgeSearch(fridges: Fridge[]) {
  const [searchQuery, setSearchQuery] = useState('');

  // React 18 Deferred Value:
  // This tells React to keep the UI perfectly responsive (60fps) when typing,
  // and only calculate the heavy list filter sorting when the main thread is idle.
  // It completely eliminates the need for arbitrary `setTimeout` debounces.
  const deferredQuery = useDeferredValue(searchQuery);
  const isSearching = searchQuery !== deferredQuery;

  // Subscribe to center changes via vanilla Zustand subscribe instead of a React selector.
  // This avoids re-rendering BrowsePage on every setCenter call (which fires after every pan).
  // We only trigger a re-render when the user moves more than 1km, and mark it as
  // non-urgent via startTransition so it never blocks map painting.
  const initialCenter = useMapStore.getState().center;
  const lastSortCenter = useRef<[number, number] | null>(initialCenter);
  const [sortCenter, setSortCenter] = useState<[number, number] | null>(
    initialCenter
  );

  const fridgesRef = useRef(fridges);
  useEffect(() => {
    fridgesRef.current = fridges;
  }, [fridges]);

  useEffect(() => {
    let prevSelectedId: string | null = useMapStore.getState().selectedFridgeId;

    return useMapStore.subscribe((state) => {
      // Re-sort around clicked fridge — but deferred by one frame so setView paints first
      if (state.selectedFridgeId && state.selectedFridgeId !== prevSelectedId) {
        prevSelectedId = state.selectedFridgeId;
        const fridge = fridgesRef.current.find(
          (f) => f.id === state.selectedFridgeId
        );
        if (fridge) {
          const coords: [number, number] = [
            fridge.location.geoLat,
            fridge.location.geoLng,
          ];
          lastSortCenter.current = coords;
          setTimeout(() => startTransition(() => setSortCenter(coords)), 300);
        }
        return;
      }
      prevSelectedId = state.selectedFridgeId;

      // Re-sort around map center only when user pans more than 1km
      const newCenter = state.center;
      if (!lastSortCenter.current) {
        lastSortCenter.current = newCenter;
        startTransition(() => setSortCenter(newCenter));
        return;
      }
      const dist = deltaInMeters(newCenter, lastSortCenter.current);
      if (dist > 1000) {
        lastSortCenter.current = newCenter;
        startTransition(() => setSortCenter(newCenter));
      }
    });
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(fridges, {
      keys: [
        'name',
        'location.street',
        'location.city',
        'location.zip',
        'notes',
      ],
      threshold: 0.3,
      distance: 100,
    });
  }, [fridges]);

  const filteredFridges = useMemo(() => {
    let resultList = fridges;

    // 1. Spatial Sort (Distance from map center)
    // We sort the results dynamically based on whatever the user is looking at.
    // Done BEFORE text filter to ensure when user clears search, closest are at top.
    if (sortCenter && sortCenter.length === 2) {
      resultList = [...resultList].sort((a, b) => {
        const distA = deltaInMeters(sortCenter, [
          a.location.geoLat,
          a.location.geoLng,
        ]);
        const distB = deltaInMeters(sortCenter, [
          b.location.geoLat,
          b.location.geoLng,
        ]);
        return distA - distB;
      });
    }

    // 2. Text Filter (using deferred query)
    if (deferredQuery) {
      resultList = fuse.search(deferredQuery).map((result) => result.item);
    }

    return resultList;
  }, [deferredQuery, fuse, fridges, sortCenter]);

  // Filtered but NOT sorted — order is irrelevant for map markers.
  // Keeping this separate means sort-only reorders don't bust React.memo on the map.
  const mapFridges = useMemo(() => {
    if (!deferredQuery) return fridges;
    return fuse.search(deferredQuery).map((result) => result.item);
  }, [deferredQuery, fuse, fridges]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFridges,
    mapFridges,
    isSearching,
  };
}
