import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IUseDaDataStore {
  currentAddress: string;
  setCurrentAddress: (address: string) => void;
}

export const useDaDataStore = create<IUseDaDataStore>()(
  immer((set) => ({
    currentAddress: '',
    setCurrentAddress: (address) => set({ currentAddress: address }),
  }))
);
