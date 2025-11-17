/**
 * Enum of the fridge filter options stored as integers for memory efficiency
 */
export const enumFilter = Object.freeze({
  // Report status
  NO_REPORT: 0,

  // Quantity of food items in the fridge
  ITEMS_FULL: 1,
  ITEMS_MANY: 2,
  ITEMS_FEW: 3,
  ITEMS_EMPTY: 4,

  // Operating condition
  NEEDS_CLEANING: 5,
  NEEDS_REPAIRS: 6,

  // Fridge location
  NOT_AT_LOCATION: 7,
  PERMANENTLY_CLOSED: 8,
});
