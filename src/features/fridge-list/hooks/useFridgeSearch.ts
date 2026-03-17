import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Fridge } from 'types/domain';
import { useMapStore } from 'store/useMapStore';
import { deltaInMeters } from 'utils/geo';

export function useFridgeSearch(fridges: Fridge[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const center = useMapStore((state) => state.center);

  // Debounce the search query for performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

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

    // 1. Text Filter (using debounced query)
    if (debouncedQuery) {
      resultList = fuse.search(debouncedQuery).map((result) => result.item);
    }

    // 2. Spatial Sort (Distance from map center)
    // We sort the results dynamically based on whatever the user is looking at.
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

    return resultList;
  }, [debouncedQuery, fuse, fridges, center]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFridges,
  };
}
