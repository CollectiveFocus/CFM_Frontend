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
          // Pass good addresses downstream
          etlAddress.etlID = counter++;
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

// TODO : since address is created in 2 places, create a function that does the work
/**
 * The output of the test run is as follows
 *     street,city,state,zip,country
 *     19 Rue Houdon, Paris, undefined, 75018, France
 *
 * The address fields should not be undefined, so there is a way of ensuring that does not happen. This should be fixed when the json is created. Undefined vars should be set to empty string.
 *
 */
function whatShouldYouNameTisFunctionSoItDocumentsThePurpose(record) {
  return { etlID, address };
}

// --- Transform Stage (batch into arrays of 50) ---
const batchTransformToCSV = new Transform({
  objectMode: true,
  transform(record, _, callback) {
    this.buffer = this.buffer || [];
    this.buffer.push(record);

    if (this.buffer.length === 2) {
      // TODO: this should create an address using the US format "123 street name, City, ST zip Country"
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
        // TODO: this should create an address using the US format "123 street name, City, ST zip Country"
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
  .pipe(
    new Transform({
      objectMode: true,
      // TODO: change this to a write stream. The pipe must terminate at a terminal stream. Writable is a terminal stream
      transform(chunk, encoding, done) {
        // TODO: Use writefile. It's more efficient for single chunks of data since it does not have to create all the stream buffers in memory

        fs.writeFile('output.txt', content, encoding, (err) => {
          if (err) {
            console.error('Error writing file:', err);
            return;
          }
          console.log('File written successfully');
        });

        // Create a new file for each incoming row
        const filename = `geoAPI_input_${csvFileCount++}.csv`;
        const fileStream = fs.createWriteStream(filename);

        fileStream.write('etlID, address\n');
        fileStream.write(chunk + '\n');
        fileStream.end();

        console.log(`Saved chunk to ${filename}`);
        done();
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
