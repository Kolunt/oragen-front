import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ISideBarStore {
  isShow: boolean;
  handleShow: (value: boolean) => void;
}

export const useSideBarStore = create<ISideBarStore>()(
  persist(
    immer((set) => ({
      isShow: false,
      handleShow: (value: boolean) => set({ isShow: value }),
    })),
    { name: 'sideBar' }
  )
);
