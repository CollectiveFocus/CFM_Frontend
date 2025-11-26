import { create } from 'zustand';

// Simple Zustand store for fetch lifecycle and data
const useDataStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async (url) => {
    // prevent duplicate concurrent fetches
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const json = await res.json();
      set({ data: json, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  reset: () => set({ data: null, loading: false, error: null }),
}));

export default useDataStore;
