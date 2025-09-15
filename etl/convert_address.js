// read the json file
const fs = require('fs');
const freedgeData = JSON.parse(fs.readFileSync('./input/freedge.json', 'utf8'));
// loop through the array, with key
let recId = 0;
output = freedgeData.map((rec) => {
  // concatenate address together to form a single line - raw address
  recId = recId + 1;
  rawAddress =
    rec['Street address'] +
    ', ' +
    rec['City'] +
    ', ' +
    rec['State / Province'] +
    ' ' +
    rec['Zip Code'] +
    ' ' +
    rec['Country'];
  return {
    recId: recId,
    rawAddress: rawAddress,
  };
});

// write output in chunks of 50
const chunkSize = 50;
for (let i = 0; i < output.length; i += chunkSize) {
  const chunk = output.slice(i, i + chunkSize);
  const fileIndex = Math.floor(i / chunkSize) + 1;
  const outFile = `./input/addressRaw_part${fileIndex}.json`;
  fs.writeFileSync(outFile, JSON.stringify(chunk, null, 2), 'utf8');
  console.log(`Wrote ${chunk.length} records to ${outFile}`);
}
