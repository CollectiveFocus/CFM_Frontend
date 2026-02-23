import { create } from 'zustand';

interface MapState {
  center: [number, number];
  zoom: number;
  selectedFridgeId: string | null;
  isLegendOpen: boolean;

  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  setSelectedFridgeId: (id: string | null) => void;
  setLegendOpen: (isOpen: boolean) => void;
  resetView: () => void;
}

const NY_CENTER: [number, number] = [40.7128, -74.006];
const DEFAULT_ZOOM = 12;

export const useMapStore = create<MapState>((set) => ({
  center: NY_CENTER,
  zoom: DEFAULT_ZOOM,
  selectedFridgeId: null,
  isLegendOpen: false,

  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setSelectedFridgeId: (selectedFridgeId) => set({ selectedFridgeId }),
  setLegendOpen: (isLegendOpen) => set({ isLegendOpen }),
  resetView: () =>
    set({ center: NY_CENTER, zoom: DEFAULT_ZOOM, selectedFridgeId: null }),
}));
