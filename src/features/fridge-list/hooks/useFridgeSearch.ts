import { useState, useMemo, useDeferredValue } from 'react';
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

  const center = useMapStore((state) => state.center);

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
    if (center && center.length === 2) {
      resultList = [...resultList].sort((a, b) => {
        const distA = deltaInMeters(center, [
          a.location.geoLat,
          a.location.geoLng,
        ]);
        const distB = deltaInMeters(center, [
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
  }, [deferredQuery, fuse, fridges, center]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFridges,
    isSearching,
  };
}
