import { ValuesFridge, ValuesReport } from 'model/data/fridge/yup.mjs';

const fridgeCache = {};

export async function getFridgeList() {
  let fridgeList = Object.values(fridgeCache);
  if (fridgeList.length == 0) {
    await fetchAllData();
    fridgeList = Object.values(fridgeCache);
  }
  return fridgeList;
}

export async function getGhostFridgeList() {
  return fetch('data/ghostFridges.json').then((response) => response.json());
}

async function fetchAllData() {
  const fridgeUrl = `https://api-prod.communityfridgefinder.com/v1/fridges/`;
  // const reportsUrl = `https://api-prod.communityfridgefinder.com/v1/reports/`;
  const responses = await Promise.all([
    fetch(fridgeUrl, {
      headers: { Accept: 'application/json' },
    }),
    // fetch(reportsUrl, {
    //   headers: { Accept: 'application/json' },
    // }),
  ]);
  for (const response of responses) {
    if (!response.ok) {
      console.error(
        `ERROR ${response.url} ${response.status}: ${response.statusText}`
      );
    }
  }
  const [fridges] = await Promise.all(
    responses.map((response) => response.json())
  );
  cacheAllData({ fridges });
}

const castOptions = { stripUnknown: true };
function cacheAllData({ fridges }) {
  for (const fridge of fridges) {
    const id = fridge.id;
    fridgeCache[id] = ValuesFridge.cast(fridge, castOptions);
    fridgeCache[id]['report'] = null;
  }
  for (const report of reports) {
    fridgeCache[report.fridgeId].report = ValuesReport.cast(
      report,
      castOptions
    );
  }
}
