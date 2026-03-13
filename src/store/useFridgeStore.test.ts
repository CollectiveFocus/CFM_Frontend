import { useFridgeStore } from './useFridgeStore';
import { apiClient } from 'utils/api-client';
import { ApiFridge } from 'types/domain';

jest.mock('utils/api-client', () => ({
  apiClient: {
    getFridges: jest.fn(),
    getReports: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

const fridgeData: ApiFridge[] = [
  {
    id: 'b0e9c8a0',
    name: 'Zeta Fridge',
    verified: true,
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
  },
  {
    id: '86911522',
    name: 'Alpha Fridge',
    verified: false,
    location: {
      street: '352 West 116th Street',
      city: 'New York',
      state: 'NY',
      zip: '10026',
      geoLat: 40.8049571,
      geoLng: -73.9570766,
    },
    maintainer: {
      instagram: 'https://www.instagram.com/theharlemcommunityfridge',
    },
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
    verified: false,
    location: {
      street: '1094 Broadway',
      city: 'New York',
      state: 'NY',
      zip: '11221',
      geoLat: 40.694207,
      geoLng: -73.930599,
    },
    maintainer: {},
  },
];

describe('useFridgeStore', () => {
  beforeEach(() => {
    useFridgeStore.setState({
      fridges: [],
      status: 'idle',
      error: null,
      lastUpdated: null,
    });
    jest.clearAllMocks();
  });

  describe('fetchFridges', () => {
    it('sets status to loading then success on a successful fetch', async () => {
      mockApiClient.getFridges.mockResolvedValueOnce(fridgeData);

      const { fetchFridges } = useFridgeStore.getState();
      const fetchPromise = fetchFridges();

      expect(useFridgeStore.getState().status).toBe('loading');

      await fetchPromise;

      expect(useFridgeStore.getState().status).toBe('success');
      expect(useFridgeStore.getState().error).toBeNull();
    });

    it('transforms latestFridgeReport into report field', async () => {
      mockApiClient.getFridges.mockResolvedValueOnce(fridgeData);
      await useFridgeStore.getState().fetchFridges();

      const fridges = useFridgeStore.getState().fridges;
      const alpha = fridges.find((f) => f.id === '86911522');
      const zeta = fridges.find((f) => f.id === 'b0e9c8a0');

      expect(alpha?.report?.condition).toBe('good');
      expect(alpha?.report?.foodPercentage).toBe(1);
      expect(zeta?.report).toBeNull();
    });

    it('loads all fridges returned by the API', async () => {
      mockApiClient.getFridges.mockResolvedValueOnce(fridgeData);
      await useFridgeStore.getState().fetchFridges();

      const { fridges } = useFridgeStore.getState();
      expect(fridges.length).toBe(3);
    });

    it('sets status to empty when API returns no fridges', async () => {
      mockApiClient.getFridges.mockResolvedValueOnce([]);
      await useFridgeStore.getState().fetchFridges();

      expect(useFridgeStore.getState().status).toBe('empty');
      expect(useFridgeStore.getState().fridges).toEqual([]);
    });

    it('sets status to error and stores message when API throws', async () => {
      mockApiClient.getFridges.mockRejectedValueOnce(
        new Error('Network failure')
      );
      await useFridgeStore.getState().fetchFridges();

      expect(useFridgeStore.getState().status).toBe('error');
      expect(useFridgeStore.getState().error).toBe('Network failure');
    });

    it('sets a generic error message for non-Error throws', async () => {
      mockApiClient.getFridges.mockRejectedValueOnce('unexpected');
      await useFridgeStore.getState().fetchFridges();

      expect(useFridgeStore.getState().status).toBe('error');
      expect(useFridgeStore.getState().error).toBe('Failed to fetch fridges');
    });

    it('updates lastUpdated timestamp on success', async () => {
      mockApiClient.getFridges.mockResolvedValueOnce(fridgeData);
      const before = Date.now();
      await useFridgeStore.getState().fetchFridges();
      const after = Date.now();

      const lastUpdated = useFridgeStore.getState().lastUpdated;
      expect(lastUpdated).not.toBeNull();
      expect(lastUpdated!).toBeGreaterThanOrEqual(before);
      expect(lastUpdated!).toBeLessThanOrEqual(after);
    });
  });

  describe('getFridgeById', () => {
    it('returns the correct fridge by id', async () => {
      mockApiClient.getFridges.mockResolvedValueOnce(fridgeData);
      await useFridgeStore.getState().fetchFridges();

      const fridge = useFridgeStore.getState().getFridgeById('86911522');
      expect(fridge).toBeDefined();
      expect(fridge?.name).toBe('Alpha Fridge');
    });

    it('returns undefined for an unknown id', async () => {
      mockApiClient.getFridges.mockResolvedValueOnce(fridgeData);
      await useFridgeStore.getState().fetchFridges();

      const fridge = useFridgeStore.getState().getFridgeById('unknown-id');
      expect(fridge).toBeUndefined();
    });

    it('returns undefined when the store is empty', () => {
      const fridge = useFridgeStore.getState().getFridgeById('86911522');
      expect(fridge).toBeUndefined();
    });
  });
});
