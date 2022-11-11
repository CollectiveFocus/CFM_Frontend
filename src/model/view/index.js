import { ValuesFridge, ValuesReport } from 'model/data/fridge/yup.mjs';

// in memory cache
let cacheViewFridgeList = [];

// sort by name
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

export async function getFridgeList() {
  if (cacheViewFridgeList.length === 0) {
    await fetchAllData();
  }
  return cacheViewFridgeList;
}

const castOptions = Object.freeze({ stripUnknown: true }); // yup configuration
function convertToViewFridgeList({ fridges }) {
  const fridgeList = [];
  for (const apiFridge of fridges) {
    const viewFridge = ValuesFridge.cast(apiFridge, castOptions);

    fridgeList.push(viewFridge);
  }
  return Object.seal(fridgeList.sort(sortByNameAsc));
}

function mergeIntoCache({ reports }) {
  for (const apiReport of reports) {
    const viewReport = ValuesReport.cast(apiReport, castOptions);
    cacheViewFridgeList[viewReport.fridgeId].report = Object.freeze(viewReport);
  }
}

const apiFridges = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`;
const apiReports = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/reports/`;
const apiHeader = { headers: { Accept: 'application/json' } };
async function fetchAllData() {
  const responses = await Promise.all([
    fetch(apiFridges, apiHeader),
    fetch(apiReports, apiHeader),
  ]);
  let hasError = false;
  for (const response of responses) {
    if (!response.ok) {
      hasError = true;
      console.error(
        `ERROR ${response.url} ${response.status}: ${response.statusText}`
      );
    }
  }
  if (hasError) {
    cacheViewFridgeList = [];
  } else {
    const [fridges, reports] = await Promise.all(
      responses.map((response) => response.json())
    );
    console.log('fetchAllData()', { fridges });
    cacheViewFridgeList = convertToViewFridgeList({ fridges });
    mergeIntoCache({ reports });
  }
} // fetchAllData()
