import { ValuesFridge, ValuesReport } from 'model/data/fridge/yup';

import { filterByReport } from './reportFilter';

/**
 * An in-memory cache array that stores the list of fridge records.
 * This array is used to maintain a cached collection of fridge data to avoid unnecessary API calls.
 * The array elements are sorted by fridge name in ascending order.
 * @private
 */
const cacheViewFridgeList = [];

/**
 * Lookup dictionary mapping fridge id to the cached fridge record stored in cacheViewFridgeList
 * @private
 */
const viewFridgeFor = {};

export async function getFridgeList() {
  if (cacheViewFridgeList.length === 0) {
    await fetchAllData();
  }
  const filteredList = cacheViewFridgeList.filter((fridge) =>
    filterByReport(fridge)
  );

  console.log('dbg>> index.js:21 - filteredList:', filteredList);
  return filteredList;
}

const sortByNameAsc = (a, b) => {
  const nameA = a.name;
  const nameB = b.name;
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const castOptions = Object.freeze({ stripUnknown: true }); // yup configuration

function viewFridgeFromLocal(apiFridge) {
  const viewFridge = ValuesFridge.cast(apiFridge, castOptions);
  viewFridge['report'] = null;
  return viewFridge;
}

function viewFridgeFromRemote(apiFridge) {
  const viewFridge = ValuesFridge.cast(apiFridge, castOptions);
  if (apiFridge.latestFridgeReport) {
    viewFridge['report'] = Object.freeze(
      ValuesReport.cast(apiFridge.latestFridgeReport, castOptions)
    );
  } else {
    viewFridge['report'] = null;
  }
  return viewFridge;
}

function loadIntoCache(fridges, fnConverter) {
  cacheViewFridgeList.length = fridges.length;

  for (let n = 0; n < fridges.length; n++) {
    const currentFridge = fridges[n];

    viewFridgeFor[currentFridge.id] = cacheViewFridgeList[n] =
      fnConverter(currentFridge);
  }

  cacheViewFridgeList.sort(sortByNameAsc);
}

function mergeIntoCache(reports) {
  for (const currentReport of reports) {
    viewFridgeFor[currentReport.fridgeId].report = Object.freeze(
      ValuesReport.cast(currentReport, castOptions)
    );
  }
}

const apiFridges = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`;
const apiReports = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/reports/`;
const apiHeader = { headers: { Accept: 'application/json' } };

async function fetchAllData() {
  if (process.env.NEXT_PUBLIC_FLAG_useLocalDatabase) {
    await fetchAllLocalData();
  } else {
    await fetchAllServerData();
  }
}

async function fetchAllServerData() {
  try {
    const response = await fetch(apiFridges, apiHeader);
    const fridges = await response.json();
    return loadIntoCache(fridges, viewFridgeFromRemote);
  } catch (error) {
    return console.error(error);
  }
}

async function fetchAllLocalData() {
  try {
    const fridgesResponse = await fetch(apiFridges, apiHeader);
    const fridges = await fridgesResponse.json();
    loadIntoCache(fridges, viewFridgeFromLocal);
  } catch (error) {
    console.error('Failed to fetch fridges:', error);
    return;
  }

  try {
    const reportsResponse = await fetch(apiReports, apiHeader);
    const reports = await reportsResponse.json();
    mergeIntoCache(reports);
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return;
  }
}
