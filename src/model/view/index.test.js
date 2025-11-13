const fridgeData = Object.freeze([
  // intentionally out-of-order by name to validate sort
  {
    id: 'b0e9c8a0',
    name: 'Zeta Fridge',
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
  },
  {
    id: 'b0e9c8a0',
    name: 'Zeta Fridge',
    location: {
      street: '1046 Broadway',
      city: 'New York',
      state: 'NY',
      zip: '11221',
      geoLat: 40.695189,
      geoLng: -73.932345,
    },
  },
  {
    id: '86911522',
    name: 'Alpha Fridge',
    location: {
      street: '352 West 116th Street',
      city: 'New York',
      state: 'NY',
      zip: '10026',
      geoLat: 40.8049571,
      geoLng: -73.9570766,
      name: 'Ralph & Nash Deli',
    },
    maintainer: {
      instagram: 'https://www.instagram.com/theharlemcommunityfridge',
    },
    verified: false,
    latestFridgeReport: {
      fridgeId: '86911522',
      epochTimestamp: '1761978283',
      foodPercentage: 1,
      condition: 'good',
      timestamp: '2025-11-01T06:24:43Z',
    },
  },
  {
    id: '35220099',
    name: 'Beta Fridge',
    location: {
      street: '1094 Broadway',
      city: 'New York',
      state: 'NY',
      zip: '11221',
      geoLat: 40.694207,
      geoLng: -73.930599,
    },
    latestFridgeReport: {
      fridgeId: '35220099',
      epochTimestamp: '1761978283',
      foodPercentage: 2,
      condition: 'dirty',
      timestamp: '2025-11-01T06:24:43Z',
    },
  },
]);
const reportData = Object.freeze([
  {
    id: 1,
    fridgeId: '35220099',
    epochTimestamp: '1761978283',
    foodPercentage: 2,
    condition: 'out of order',
    timestamp: '2025-11-01T06:24:43Z',
  },
  {
    id: 2,
    fridgeId: '86911522',
    epochTimestamp: '1761978283',
    foodPercentage: 1,
    condition: 'out of order',
    timestamp: '2025-11-01T06:24:43Z',
  },
]);

const ORIGINAL_ENV = process.env;

describe('getFridgeList', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
    console.error.mockRestore();
  });

  it('returns empty list if none of the API data is valid', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = false;

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'bad1' }, { id: 'bad2' }],
    });

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const fridges = await getFridgeListEncapsulated();
    expect(fridges).toEqual([]);
  });

  it('returns empty list when API data is empty', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = false;
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const fridges = await getFridgeListEncapsulated();
    expect(fridges).toEqual([]);
  });

  it('returns empty list when production API returns 404 or 5xx', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = false;
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      url: 'http://mock.api/v1/fridges/',
    });

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const fridges = await getFridgeListEncapsulated();
    expect(fridges).toEqual([]);
  });

  it('returns empty list when local API returns 404 or 5xx', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = true;
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      url: 'http://mock.api/v1/fridges/',
    });

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const fridges = await getFridgeListEncapsulated();
    expect(fridges).toEqual([]);
  });

  it('returns fridges when local API reports returns 404 or 5xx', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = true;
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => fridgeData,
      }) // first fetch (fridges)
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        url: 'http://mock.api/v1/reports/',
      }); // second fetch (reports)

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const fridges = await getFridgeListEncapsulated();
    expect(Array.isArray(fridges)).toBe(true);
    expect(fridges.length).toBe(4);
  });

  it('loads fridges from production db, and sorts by name', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = false;

    global.fetch.mockResolvedValueOnce({
      ok: true,
      url: `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`,
      status: 200,
      statusText: 'OK',
      json: async () => fridgeData,
    });

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const fridges = await getFridgeListEncapsulated();

    expect(Array.isArray(fridges)).toBe(true);
    expect(fridges.length).toBe(4);
    expect(fridges[0].name).toBe('Alpha Fridge');
    expect(fridges[1].name).toBe('Beta Fridge');
    expect(fridges[2].name).toBe('Zeta Fridge');

    expect(fridges[0].report.condition).toBe('good');
    expect(fridges[1].report.condition).toBe('dirty');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`,
      { headers: { Accept: 'application/json' } }
    );
  });

  it('loads fridges and reports from local db, attaches reports, and sorts by name', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = true;

    // First fetch returns fridges
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        url: `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`,
        status: 200,
        statusText: 'OK',
        json: async () => fridgeData,
      })
      // Second fetch returns reports
      .mockResolvedValueOnce({
        ok: true,
        url: `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/reports/`,
        status: 200,
        statusText: 'OK',
        json: async () => reportData,
      });

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const fridges = await getFridgeListEncapsulated();

    expect(Array.isArray(fridges)).toBe(true);
    expect(fridges.length).toBe(4);
    expect(fridges[0].name).toBe('Alpha Fridge');
    expect(fridges[1].name).toBe('Beta Fridge');
    expect(fridges[2].name).toBe('Zeta Fridge');

    expect(fridges[0].report.condition).toBe('out of order');
    expect(fridges[1].report.condition).toBe('out of order');

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toBe(
      `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`
    );
    expect(global.fetch.mock.calls[1][0]).toBe(
      `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/reports/`
    );
  });

  it('returns cached list without additional fetches', async () => {
    process.env.NEXT_PUBLIC_FLAG_useLocalDatabase = false;
    global.fetch.mockResolvedValueOnce({
      ok: true,
      url: `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/fridges/`,
      status: 200,
      statusText: 'OK',
      json: async () => fridgeData,
    });

    let getFridgeListEncapsulated;
    jest.isolateModules(() => {
      const mod = require('./index.js');
      getFridgeListEncapsulated = mod.getFridgeList;
    });

    const first = await getFridgeListEncapsulated();
    const second = await getFridgeListEncapsulated();

    expect(first).toBe(second);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
