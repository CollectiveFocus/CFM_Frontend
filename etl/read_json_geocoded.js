const fs = require('fs');

// Read JSON file
const data = fs.readFileSync('./input/addressGeocoded_part1.json', 'utf8');

// Parse into an array of objects
const records = JSON.parse(data);

// Now `records` is an array
console.log(Array.isArray(records)); // true
console.log(records.length); // number of objects
console.log(records[0]); // first object
