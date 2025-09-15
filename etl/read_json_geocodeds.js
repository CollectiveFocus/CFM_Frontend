const fs = require('fs');
const path = require('path');

// Folder where your JSON files are
const inputFolder = './input';

// Number of parts (in your case 12)
const numFiles = 12;

// Array to hold all records
let allRecords = [];

for (let i = 1; i <= numFiles; i++) {
  const filePath = path.join(inputFolder, `addressGeocoded_part${i}.json`);
  const data = fs.readFileSync(filePath, 'utf8');
  const records = JSON.parse(data); // parse each JSON file into an array
  allRecords = allRecords.concat(records); // merge into the main array
}

console.log(`Total records: ${allRecords.length}`);
console.log(allRecords[0]); // first object as a sanity check
