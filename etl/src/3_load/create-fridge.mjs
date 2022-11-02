import { faker } from '@faker-js/faker';
import http from 'http';
import https from 'https';
const { randomInt } = await import('crypto');

const localHost = '127.0.0.1';
const localPort = 3000;

const awsHost = 'api-dev.communityfridgefinder.com';
const awsPort = 443;

const localGetOptions = {
  hostname: localHost,
  port: localPort,
  path: '/v1/fridges',
  method: 'GET',
};

const awsPostOptions = {
  hostname: awsHost,
  port: awsPort,
  method: 'POST',
};

main();

function main() {
  const req = http.request(localGetOptions, (res) => {
    let body = '';

    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      try {
        let json = JSON.parse(body);
        createFridge(json[5]);
        // for (let fridge of json) {
        //   createReportFor(fridge);
        // }
      } catch (error) {
        console.error(error);
      }
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
}

function createFridge(fridge) {
  const postReq = awsPostTo('/v1/fridges', fridge, 'name');
  postReq.on('close', () => createReportFor(fridge));
  postReq.end();
}

function createReportFor({ id }) {
  // 1/10 chance of no report
  if (oneIn(10)) {
    return;
  }
  const report = {
    // timestamp: faker.date.recent(),
    condition: oneIn(50)
      ? 'not at location'
      : faker.helpers.arrayElement(['good', 'dirty', 'out of order']),
    foodPercentage: faker.helpers.arrayElement([0, 33, 67, 100]),
    // photoUrl: 'http://placekitten.com/200/300',
    // notes: faker.lorem.lines(1),
  };

  const postReq = awsPostTo(`/v1/fridges/${id}/reports`, report);
  postReq.end();
}

const oneIn = (n) => randomInt(n) === 0;

function awsPostTo(path, json, displayKey = null) {
  const postData = JSON.stringify(json);
  awsPostOptions.path = path;
  awsPostOptions.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  };

  const responseClosure = (response) => {
    const displayText = displayKey ? ' -- ' + json[displayKey] : '';
    console.log(
      `${response.statusCode} POST ${response.req.path}${displayText}`
    );

    let body = '';
    response.on('data', (chunk) => (body += chunk));
    response.on('end', () => {
      if (response.statusCode != 999) {
        console.log(response.statusMessage, JSON.parse(body), json, '\n---');
      }
    });
  };

  const req = https.request(awsPostOptions, responseClosure);
  req.on('error', (error) => {
    console.error('Request error ' + error.message);
  });

  req.write(postData);
  return req;
}
