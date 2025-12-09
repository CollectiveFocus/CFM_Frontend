# Implement the DAG to get USA addresses

## reference

- [Stream Handbook](https://github.com/JasonGhent/stream-handbook-epub)
- [The Definitive Guide to Object Streams in Node.js](https://blog.risingstack.com/the-definitive-guide-to-object-streams-in-node-js/)

  - uses through2 to create transform

- [Parse data files using Node.js streams](https://nicolashery.com/parse-data-files-using-nodejs-streams/)

# commands

- get the first 10 records for testing purposes becuase the csv is very large
  dasel -f freedge.csv -r csv -w json | jq '.[0:10]' | dasel -r json -w csv | tee > test.csv

## todo

- [x] discard empty addresses (street)
- [x] save bad addresses into the file "db_bad_address.csv" and continue processing other address
- make the address compatible with FF
- [-] make address compatible with GeoAPI and write every batch to a different csv file

## GeoAPI

### input:

etlID,address
1,"19 Rue Houdon, Paris 75018, France"
street: '19 Rue Houdon',
city: 'Paris',
state: undefined,
zip: '75018',
country: 'France'

### output:

```
  "location": {
    "name": "Ralph and Nash Deli",
    "street": "352 West 116th Street",
    "city": "New York",
    "state": "NY",
    "zip": "10026"
  },
  "tags": [
    "harlem",
    "halal",
    "kashrut"
  ],
```
