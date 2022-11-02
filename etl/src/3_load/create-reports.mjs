import { faker } from '@faker-js/faker';
import http from 'http';
const { randomInt } = await import('crypto');

const apiHost = '127.0.0.1';
const apiPort = 3050;

main();

function main() {
  const httpGetOptions = {
    hostname: apiHost,
    port: apiPort,
    path: '/v1/fridges',
    method: 'GET',
  };

  const req = http.request(httpGetOptions, (res) => {
    let body = '';

    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      try {
        let json = JSON.parse(body);
        for (let fridge of json) {
          updatePhotoFor(fridge);
          createReportFor(fridge);
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
}

function createReportFor({ id }) {
  // 1/10 chance of no report
  if (oneIn(10)) {
    return;
  }

  const data = {
    timestamp: faker.date.recent(),
    condition: oneIn(50)
      ? 'not at location'
      : faker.helpers.arrayElement(['good', 'dirty', 'out of order', 'ghost']),
    foodPercentage: faker.helpers.arrayElement([0, 33, 67, 100]),
    photoUrl: 'http://placekitten.com/150/100',
    notes: faker.lorem.lines(1),
  };

  httpRequest('POST', `/v1/fridges/${id}/reports`, data)
}

function updatePhotoFor(fridge) {
  fridge.photoUrl = 'http://placekitten.com/300/345';
  httpRequest('PATCH', `/v1/fridges/${fridge.id}`, fridge);
}

const oneIn = (n) => randomInt(n) === 0;

function httpRequest(method, path, dataJson) {
  const dataStr = JSON.stringify(dataJson);

  const options = {
    hostname: apiHost,
    port: apiPort,
    method,
    path,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataStr.length,
    },
  };

  const request = http.request(options, (res) => {
    const statusBad = res.statusCode < 200 || res.statusCode > 299
    if (statusBad) {
      console.log(`statusCode: ${res.statusCode}`, res.req.path);
    }
  });

  request.on('error', (error) => {
    console.error(error);
  });

  request.write(dataStr);
  request.end();
}
