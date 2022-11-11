import { ValuesFridge, ValuesReport } from 'model/data/fridge/yup.mjs';

// in memory cache
const cacheViewFridgeList = [];
const viewFridgeFor = {};

export async function getFridgeList() {
  if (cacheViewFridgeList.length === 0) {
    await fetchAllData();
  }
  return cacheViewFridgeList;
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
  const report = apiFridge.latestFridgeReport ?? null;
  const viewFridge = ValuesFridge.cast(apiFridge, castOptions);
  viewFridge['report'] = ValuesReport.cast(report, castOptions);
  return viewFridge;
}

function loadIntoCache({ fridges }, fnConverter) {
  cacheViewFridgeList.length = fridges.length;

  for (let n = 0; n < fridges.length; n++) {
    const apiFridge = fridges[n];
    viewFridgeFor[apiFridge.id] = cacheViewFridgeList[n] =
      fnConverter(apiFridge);
  }
  cacheViewFridgeList.sort(sortByNameAsc);
}

function mergeIntoCache({ reports }) {
  for (const apiReport of reports) {
    viewFridgeFor[apiReport.fridgeId].report = Object.freeze(
      ValuesReport.cast(apiReport, castOptions)
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

function fetchAllServerData() {
  return fetch(apiFridges, apiHeader)
    .then((response) => {
      if (!response.ok) {
        throw `ERROR ${response.url} ${response.status}: ${response.statusText}`;
      }
      return response.json();
    })
    .then((fridges) => loadIntoCache({ fridges }, viewFridgeFromRemote))
    .catch((error) => console.error(error));
}

async function fetchAllLocalData() {
  const responses = await Promise.all([
    fetch(apiFridges, apiHeader),
    fetch(apiReports, apiHeader),
  ]);
  let fetchOK = true;
  for (const response of responses) {
    if (!response.ok) {
      fetchOK = false;
      console.error(
        `ERROR ${response.url} ${response.status}: ${response.statusText}`
      );
    }
  }
  if (fetchOK) {
    const [fridges, reports] = await Promise.all(
      responses.map((response) => response.json())
    );
    loadIntoCache({ fridges }, viewFridgeFromLocal);
    mergeIntoCache({ reports });
  }
}
