import fs from 'fs';
import csv from "csvtojson";
import { Transform, pipeline } from "stream";

// const { transformOnePlanet } = require("./transform");

const inputStream = fs.createReadStream("data.csv");
const outputStream = fs.createWriteStream("data.json");
const csvParser = csv();

const transformOneFridge = (fridgeObject) => {
  console.log("placeholder: transformOneFridge: ");
  console.log(fridgeObject);
}

const transformFridgeStream = new Transform({
  transform: function(fridge, encoding, callback) {
    try {
      const fridgeObject = JSON.parse(fridge);
      const transformedFridgeRecord = transformOneFridge(fridgeObject);

      callback(null, JSON.stringify(transformedFridgeRecord, null, 2));
    } catch (err) {
      callback(err);
    }
  }
});

pipeline(inputStream, csvParser, transformFridgeStream, outputStream, err => {
  if (err) {
    console.log("Fridge Pipeline encountered an error:", err);
  } else {
    console.log("Pipeline completed successfully");
  }
});