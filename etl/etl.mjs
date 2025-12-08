import fs from 'fs';
import csv from 'csv-parser';
import { Transform, Writable } from 'stream';

// --- Bad address sink ---
const badAddressStream = fs.createWriteStream('db_bad_address.csv');
badAddressStream.write('street,city,state,zip,country\n');

// --- Extract Stage ---
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
          // Do not push downstream
          callback();
        } else {
          // Pass good addresses downstream
          // callback(null, { etlAddress, original: row });
          callback(null, etlAddress);
        }
      },
    })
  )
  .pipe(
    new Transform({
      objectMode: true,
      transform(row, _, callback) {
        console.log(row);
        callback(null, row);
      },
    })
  )
  .on('finish', () => {
    console.log('Finished reading CSV ✅');
  });

// --- Transform Stage (batch into arrays of 50) ---
let batchNumber = 1;
const batchTransform = new Transform({
  objectMode: true,
  transform(record, _, callback) {
    this.buffer = this.buffer || [];
    this.buffer.push(record);

    if (this.buffer.length === 2) {
      // const bufferStream = fs.createWriteStream('bufferStream' + batchNumber + '.csv');
      // batchNumber += 1;

      // bufferStream.write(this.buffer);
      callback(null, this.buffer);
      this.buffer = [];
    } else {
      callback();
    }
  },
  flush(callback) {
    if (this.buffer && this.buffer.length > 0) {
      this.push(this.buffer);
    }
    callback();
  },
});

const output = fs.createWriteStream('output.csv'); // new file

extractStream
  .pipe(batchTransform)
  .pipe(
    new Transform({
      objectMode: true,
      transform(row, _, callback) {
        console.log(row);
        // callback(null, row);
        // Convert row (Array/Object) into a string before passing downstream
        let addressString = "";

        for (let i = 0; i < row.length; i++) {
          const r = row[i];
          // Concatenate the fields into one string
          addressString += `${r.street}, ${r.city}, ${r.zip}, ${r.country}`;
        }
        
        callback(null, addressString + '\n');
      },
    })
  )
  .pipe(
    output
  )
  .on('finish', () => {
    console.log('Finished transforming data ✅');
  });

// // --- Load Stage ---
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
