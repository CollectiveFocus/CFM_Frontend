import { useState, useMemo, useDeferredValue, useRef } from 'react';
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

  // We don't want the fridge list to aggressively reshuffle and re-render every time
  // the map is panned even 1 pixel. This establishes a "sticky" center that only updates
  // when the user moves the map by more than 1 kilometer, keeping the UI rock solid.
  const lastSortCenter = useRef<[number, number] | null>(center);

  const sortCenter = useMemo(() => {
    if (!center) return null;
    if (!lastSortCenter.current) {
      lastSortCenter.current = center;
      return center;
    }

    const dist = deltaInMeters(center, lastSortCenter.current);
    if (dist > 1000) {
      // 1 km threshold to trigger a list re-sort
      lastSortCenter.current = center;
      return center;
    }

    return lastSortCenter.current;
  }, [center]);

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

  return {
    searchQuery,
    setSearchQuery,
    filteredFridges,
    isSearching,
  };
}
