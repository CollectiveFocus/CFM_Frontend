import { create } from 'zustand';
import { enumFilter } from './enums';

/**
 * Zustand store for managing filter states
 * Each filter can be toggled on/off
 */
export const useFilterStore = create((set, get) => ({
  // State: Object mapping filter types to boolean (enabled/disabled)
  filters: {
    [enumFilter.NO_REPORT]: true,
    [enumFilter.ITEMS_FULL]: true,
    [enumFilter.ITEMS_MANY]: true,
    [enumFilter.ITEMS_FEW]: true,
    [enumFilter.ITEMS_EMPTY]: true,
    [enumFilter.NEEDS_CLEANING]: true,
    [enumFilter.NEEDS_REPAIRS]: true,
    [enumFilter.NOT_AT_LOCATION]: false, // Default disabled
    [enumFilter.PERMANENTLY_CLOSED]: false, // Default disabled
  },

  /**
   * Toggle a specific filter on/off
   * @param {number} filterType - The enumFilter value to toggle
   */
  toggleFilter: (filterType) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterType]: !state.filters[filterType],
      },
    })),

  /**
   * Set a specific filter to a boolean value
   * @param {number} filterType - The enumFilter value
   * @param {boolean} enabled - Whether the filter should be enabled
   */
  setFilter: (filterType, enabled) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterType]: enabled,
      },
    })),

  /**
   * Check if a specific filter is enabled
   * @param {number} filterType - The enumFilter value
   * @returns {boolean} - Whether the filter is enabled
   */
  isFilterEnabled: (filterType) => get().filters[filterType],

  /**
   * Get all enabled filters
   * @returns {number[]} - Array of enabled filter types (integers)
   */
  getEnabledFilters: () => {
    const { filters } = get();
    return Object.entries(filters)
      .filter(([_, enabled]) => enabled)
      .map(([filterType, _]) => filterType);
  },

  /**
   * Reset all filters to default state
   */
  resetFilters: () =>
    set({
      filters: {
        [enumFilter.NO_REPORT]: true,
        [enumFilter.ITEMS_FULL]: true,
        [enumFilter.ITEMS_MANY]: true,
        [enumFilter.ITEMS_FEW]: true,
        [enumFilter.ITEMS_EMPTY]: true,
        [enumFilter.NEEDS_CLEANING]: true,
        [enumFilter.NEEDS_REPAIRS]: true,
        [enumFilter.NOT_AT_LOCATION]: false,
        [enumFilter.PERMANENTLY_CLOSED]: false,
      },
    }),
}));
