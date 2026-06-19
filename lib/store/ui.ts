import { create } from 'zustand';

interface UIStore {
  // Cart drawer
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  // Filter sheet
  filterSheetOpen: boolean;
  openFilterSheet: () => void;
  closeFilterSheet: () => void;

  // Location picker
  locationPickerOpen: boolean;
  openLocationPicker: () => void;
  closeLocationPicker: () => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cartDrawerOpen: false,
  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),

  filterSheetOpen: false,
  openFilterSheet: () => set({ filterSheetOpen: true }),
  closeFilterSheet: () => set({ filterSheetOpen: false }),

  locationPickerOpen: false,
  openLocationPicker: () => set({ locationPickerOpen: true }),
  closeLocationPicker: () => set({ locationPickerOpen: false }),
  selectedLocation: 'Lahore',
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),
}));
