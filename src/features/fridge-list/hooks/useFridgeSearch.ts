import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Fridge } from 'types/domain';

export function useFridgeSearch(fridges: Fridge[]) {
  const [searchQuery, setSearchQuery] = useState('');

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
    if (!searchQuery) return fridges;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, fridges]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFridges,
  };
}
