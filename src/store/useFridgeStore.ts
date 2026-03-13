import { create } from 'zustand';
import { Fridge, ApiFridge, AppStatus } from 'types/domain';
import { apiClient } from 'utils/api-client';

interface FridgeState {
  fridges: Fridge[];
  status: AppStatus;
  error: string | null;
  lastUpdated: number | null;

  fetchFridges: () => Promise<void>;
  getFridgeById: (id: string) => Fridge | undefined;
}

const transformFridge = (apiFridge: ApiFridge): Fridge => {
  const { latestFridgeReport, ...rest } = apiFridge;
  return {
    ...rest,
    report: latestFridgeReport || null,
  };
};

export const useFridgeStore = create<FridgeState>((set, get) => ({
  fridges: [],
  status: 'idle',
  error: null,
  lastUpdated: null,

  fetchFridges: async () => {
    set({ status: 'loading', error: null });
    try {
      const apiFridges = await apiClient.getFridges();
      const fridges = apiFridges
        .map(transformFridge)
        .filter((f) => f.report?.condition !== 'ghost')
        .sort((a, b) => a.name.localeCompare(b.name));

      set({
        fridges,
        status: fridges.length > 0 ? 'success' : 'empty',
        lastUpdated: Date.now(),
      });
    } catch (error) {
      set({
        status: 'error',
        error:
          error instanceof Error ? error.message : 'Failed to fetch fridges',
      });
    }
  },

  getFridgeById: (id: string) => {
    return get().fridges.find((f) => f.id === id);
  },
}));
