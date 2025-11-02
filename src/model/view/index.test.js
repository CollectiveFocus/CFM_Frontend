import { ValuesFridge, ValuesReport } from 'model/data/fridge/yup/index.js';
import { viewFridgeFromRemote } from './index.js';

describe('viewFridgeFromRemote', () => {
  const apiFridge = Object.freeze({
    id: 'collectivefocusresourcehub',
    name: 'Collective Focus Resource Hub',
    location: {
      street: '1046 Broadway',
      city: 'New York',
      state: 'NY',
      zip: '11221',
      geoLat: 40.695189,
      geoLng: -73.932345,
    },
    maintainer: {
      instagram: 'https://www.instagram.com/collectivefocushub',
    },
    verified: true,
    latestFridgeReport: {
      fridgeId: 'collectivefocusresourcehub',
      epochTimestamp: '1761978283',
      foodPercentage: 3,
      condition: 'good',
      timestamp: '2025-11-01T06:24:43Z',
    },
  });
  const viewFridge = Object.freeze({
    id: 'collectivefocusresourcehub',
    name: 'Collective Focus Resource Hub',
    location: {
      street: '1046 Broadway',
      city: 'New York',
      state: 'NY',
      zip: '11221',
      geoLat: 40.695189,
      geoLng: -73.932345,
    },
    maintainer: { instagram: 'https://www.instagram.com/collectivefocushub' },
    verified: true,
    report: {
      foodPercentage: 3,
      condition: 'good',
      timestamp: new Date('2025-11-01T06:24:43.000Z'),
    },
  });
  const apiFridgeNoReport = Object.freeze({
    ...apiFridge,
    latestFridgeReport: null,
  });
  const viewFridgeNoReport = Object.freeze({
    ...viewFridge,
    report: null,
  });

  it('converts API fridge data with report to view model', () => {
    const result = viewFridgeFromRemote(apiFridge);
    expect(result).toMatchObject(viewFridge);
    expect(Object.isFrozen(result.report)).toBe(true);
  });

  it('converts API fridge data without report to view model', () => {
    const result = viewFridgeFromRemote(apiFridgeNoReport);
    expect(result).toMatchObject(viewFridgeNoReport);
  });
});
