import fs from 'fs';
import csv from 'csv-parser';
import { Transform, Writable } from 'stream';

// --- Bad address sink ---
const badAddressStream = fs.createWriteStream('db_bad_address.csv');
badAddressStream.write('street,city,state,zip,country\n');

// --- Extract Stage ---
let counter = 1;
const extractStream = fs
  .createReadStream('test.csv')
  .pipe(csv())
  .pipe(
    new Transform({
      objectMode: true,
      transform(row, _, callback) {
        const etlAddress = {
          street: row['Street address'],
          city: row['City'],
          state: row['State'],
          zip: row['Zip Code'],
          country: row['Country'],
        };

        if (etlAddress.street === '') {
          // Save directly to bad address CSV
          badAddressStream.write(
            `${etlAddress.street},${etlAddress.city},${etlAddress.state},${etlAddress.zip},${etlAddress.country}\n`
          );
          callback();
        } else {
          // Add the etlID to the etlAddress JSON
          // etlAddress.etlID = randomUUID();
          etlAddress.etlID = counter++;

          // Pass good addresses downstream
          callback(null, etlAddress);
        }
      },
    })
  )
  // .pipe(
  //   new Transform({
  //     objectMode: true,
  //     transform(row, _, callback) {
  //       console.log(row);
  //       callback(null, row);
  //     },
  //   })
  // )
  .on('finish', () => {
    console.log('Finished reading CSV ✅');
  });

// --- Transform Stage (batch into arrays of 50) ---
const batchTransformToCSV = new Transform({
  objectMode: true,
  transform(record, _, callback) {
    this.buffer = this.buffer || [];
    this.buffer.push(record);

    if (this.buffer.length === 2) {
      callback(
        null,
        this.buffer
          .map(
            (json) =>
              `${json.street}, ${json.city}, ${json.state}, ${json.zip}, ${json.country}`
          )
          .join('\n')
      );
      this.buffer = [];
    } else {
      callback();
    }
  },
  flush(callback) {
    if (this.buffer && this.buffer.length > 0) {
      this.push(
        this.buffer
          .map(
            (json) =>
              `${json.street}, ${json.city}, ${json.state}, ${json.zip}, ${json.country}`
          )
          .join('\n')
      );
    }
    callback();
  },
});

// --- Load Stage ---
let csvFileCount = 0;
extractStream
  .pipe(batchTransformToCSV)
  // .pipe(
  //   new Transform({
  //     objectMode: true,
  //     transform(row, _, callback) {
  //       console.log(row);

  //       callback(null, addressString + '\n');
  //     },
  //   })
  // )
  .pipe(
    new Transform({
      objectMode: true,
      transform(row, _, callback) {
        // Create a new file for each incoming row
        const filename = `output_${csvFileCount++}.csv`;
        const fileStream = fs.createWriteStream(filename);

        // Write header first
        fileStream.write('street,city,state,zip,country\n');

        // Then write the row itself
        fileStream.write(row + '\n');

        // Close the file stream
        fileStream.end();

        console.log(`Saved row to ${filename}`);
        callback();
      },
    })
  )
  .on('finish', () => {
    console.log('Finished transforming data ✅');
  });

// function fakeGeoAPI(batch) {
//   return batch.map((item, idx) => ({
//     etlID: idx,
//     confidence: Math.random() > 0.2 ? 1 : 0.5,
//     lat: 40.0 + Math.random(),
//     lon: -80.0 + Math.random(),
//     ...item.etlAddress,
//   }));
// }

// const goodAddressStream = fs.createWriteStream('db_good_address.json');
// const badAddressStream = fs.createWriteStream('db_bad_address.csv');

// const loadStream = new Writable({
//   objectMode: true,
//   write(batch, _, callback) {
//     const results = fakeGeoAPI(batch);

//     results.forEach((r) => {
//       if (r.confidence === 1) {
//         goodAddressStream.write(JSON.stringify(r) + '\n');
//       } else {
//         badAddressStream.write(
//           `${r.etlID},${r.street},${r.city},${r.state},${r.zip},${r.country}\n`
//         );
//       }
//     });

//     callback();
//   },
// });

// --- Pipeline Assembly ---
// extractStream
//   .pipe(batchTransform)
//   .pipe(loadStream)
//   .on('finish', () => {
//     console.log('ETL process completed ✅');
//   });
