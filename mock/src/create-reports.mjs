import { faker } from '@faker-js/faker';
import http from 'http';
const { randomInt } = await import('crypto');

const apiHost = '127.0.0.1';
const apiPort = 3000;

const httpGetOptions = {
  hostname: apiHost,
  port: apiPort,
  path: '/v1/fridges',
  method: 'GET',
};

const httpPostOptions = {
  hostname: apiHost,
  port: apiPort,
  method: 'POST',
};

main();

function main() {
  const req = http.request(httpGetOptions, (res) => {
    let body = '';

    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      try {
        let json = JSON.parse(body);
        for (let fridge of json) {
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
  const data = JSON.stringify({
    timestamp: faker.date.recent(),
    condition: oneIn(50)
      ? 'not at location'
      : faker.helpers.arrayElement(['good', 'dirty', 'out of order']),
    foodPercentage: faker.helpers.arrayElement([0, 1, 2, 3]),
    photoUrl: 'http://placekitten.com/200/300',
    notes: faker.lorem.lines(1),
  });

  httpPostOptions.path = `/v1/fridges/${id}/reports`;
  httpPostOptions.headers = {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  };

  const postReq = http.request(httpPostOptions, (res) => {
    if (res.statusCode != 201) {
      console.log(`statusCode: ${res.statusCode}`);
    }
  });

  postReq.on('error', (error) => {
    console.error(error);
  });

  postReq.write(data);
  postReq.end();
}

const oneIn = (n) => randomInt(n) === 0;
