// api/fridgeService.js

import { useFilterStore } from './filterStore';
import { enumFilter } from './enums';

let cacheViewFridgeList = [];

/**
 * Determine which item quantity category a fridge falls into
 * @param {number} foodPercentage - Percentage of food (0-100)
 * @returns {number} - The enumFridgeStatus value for quantity
 */
function getItemsCategory(foodPercentage) {
  if (foodPercentage === 0) {
    return enumFilter.ITEMS_EMPTY;
  }
  if (foodPercentage <= 33) {
    return enumFilter.ITEMS_FEW;
  }
  if (foodPercentage <= 66) {
    return enumFilter.ITEMS_MANY;
  }
  return enumFilter.ITEMS_FULL;
}

/**
 * Determine report status category for a fridge
 * @param {Object} report - The fridge report object
 * @returns {number} - The enumFridgeStatus value for report status
 */
export function getReportStatus(report) {
  if (!report) {
    return enumFilter.NO_REPORT;
  }
  return null; // Has a report, no special status
}

/**
 * Determine condition category for a fridge
 * @param {string} condition - The condition string from API
 * @returns {number} - The enumFridgeStatus value for condition
 */
function getConditionCategory(condition) {
  switch (condition?.toLowerCase().trim()) {
    case 'dirty':
      return enumFilter.NEEDS_CLEANING;
    case 'out of order':
      return enumFilter.NEEDS_REPAIRS;
    case 'not at location':
      return enumFilter.NOT_AT_LOCATION;
    case 'ghost':
      return enumFilter.PERMANENTLY_CLOSED;
    case 'good':
    default:
      return null; // No special condition category
  }
}

/**
 * Check if a fridge should be displayed based on enabled filters
 * @param {Object} fridge - The fridge object
 * @param {Object} filters - The filters object from Zustand store
 * @returns {boolean} - True if fridge passes all active filters
 */
function shouldDisplayFridge(fridge, filters) {
  const report = fridge.report;

  // Check report status filters
  const reportStatus = getReportStatus(report);
  if (reportStatus !== null && !filters[reportStatus]) {
    return false;
  }

  // If no report, only show if NO_REPORT filter is enabled
  if (!report && !filters[enumFilter.NO_REPORT]) {
    return false;
  }

  // If there is a report, check condition and items filters
  if (report) {
    // Check condition filters
    const conditionCategory = getConditionCategory(report.condition);
    if (conditionCategory !== null && !filters[conditionCategory]) {
      return false;
    }

    // Check items quantity filters
    const itemsCategory = getItemsCategory(report.foodPercentage);
    if (!filters[itemsCategory]) {
      return false;
    }
  }

  return true;
}

/**
 * Get filtered fridge list based on enabled filters
 * @returns {Promise<Array>} - Filtered array of fridges
 */
export async function getFridgeList() {
  if (cacheViewFridgeList.length === 0) {
    await fetchAllData();
  }

  // Get current filters from Zustand store
  const filters = useFilterStore.getState().filters;

  // Filter the list based on enabled filters
  const filteredList = cacheViewFridgeList.filter((fridge) =>
    shouldDisplayFridge(fridge, filters)
  );

  return filteredList;
}

/**
 * Get filtered fridge list with details for debugging
 * Returns which filters each fridge matched/failed
 * @returns {Promise<Array>} - Array with fridge data and filter results
 */
export async function getFridgeListWithDebug() {
  if (cacheViewFridgeList.length === 0) {
    await fetchAllData();
  }

  const filters = useFilterStore.getState().filters;

  return cacheViewFridgeList.map((fridge) => ({
    id: fridge.id,
    name: fridge.name,
    passed: shouldDisplayFridge(fridge, filters),
    reportStatus: getReportStatus(fridge.report),
    itemsCategory: fridge.report
      ? getItemsCategory(fridge.report.foodPercentage)
      : null,
    conditionCategory: fridge.report
      ? getConditionCategory(fridge.report.condition)
      : null,
  }));
}
