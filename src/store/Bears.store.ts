import { create } from "zustand";

interface IBearStore {
  bears: string[];
  addBear: () => void;
  removeAllBears: () => void;
}

export const useBearStore = create<IBearStore>((set) => ({
  bears: [],
  addBear: () =>
    set((state) => ({
      bears: [...state.bears, "🐻"],
    })),
  removeAllBears: () => set({ bears: [] }),
}));
