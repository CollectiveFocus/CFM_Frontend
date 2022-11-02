import { readFileSync, writeFileSync } from 'node:fs';
import { deltaInMeters } from '../../../src/lib/geo.mjs';

const tableMainFileName = 'table/main.json';
const tableInputFileName = 'table/excel.json';
const tableOutputFileName = 'temp/out.json';
const boundInMeters = 90;

let errorCount = 0;
function LogError(error) {
  if (error) {
    errorCount++;
    console.log(error);
  }
}

async function main() {
  const mainTable = JSON.parse(readFileSync(tableMainFileName)).map((e) => ({
    mainId: e.mainId,
    destination: [e.locationGeoLat, e.locationGeoLng],
  }));
  const inputTable = JSON.parse(readFileSync(tableInputFileName));

  for (const input of inputTable) {
    const origin = [input.locationGeoLat, input.locationGeoLng];
    for (const main of mainTable) {
      if (deltaInMeters(origin, main.destination) < boundInMeters) {
        input.id = main.mainId;
        delete input.locationName;
        delete input.locationStreet;
        delete input.locationCity;
        delete input.locationState;
        delete input.locationZip;
        delete input.locationGeoLat;
        delete input.locationGeoLng;

        delete input.fridgeName;
        delete input.address;
        break;
      }
    }
    if (input.id >= 1000) {
      LogError({
        id: input.id,
        errors: ['key could not be found in main table'],
      });
    }
  }

  if (errorCount === 0) {
    const recordCount = inputTable.length;
    for (let id = 0; id < mainTable.length; ++id) {
      inputTable.push({ id });
    }
    writeFileSync(tableOutputFileName, JSON.stringify(inputTable));
    console.log(
      `successfully wrote ${recordCount} records to ${tableOutputFileName}`
    );
  }
  return errorCount;
}
process.exit(await main());
