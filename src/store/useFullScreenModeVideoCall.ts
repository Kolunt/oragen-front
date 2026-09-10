import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IUseFullScreenModeVideoCall {
  isFullScreen: boolean;
  fullScreenUserId?: number;
  isShowListChattererPanel: boolean;
  generalFullScreen: string;
  toggleFullScreen: (value: boolean) => void;
  changeFullScreenUserId: (id: number | undefined) => void;
  toggleShowListChattererPanel: (value: boolean) => void;
  toggleGeneralFullScreen: (id: string) => void;
}

export const useFullScreenModeVideoCall = create<IUseFullScreenModeVideoCall>()(
  immer((set) => ({
    isFullScreen: false,
    fullScreenUserId: undefined,
    isShowListChattererPanel: false,
    generalFullScreen: '',
    toggleFullScreen: (value) => set({ isFullScreen: value }),
    changeFullScreenUserId: (id) => set({ fullScreenUserId: id }),
    toggleShowListChattererPanel: (value) =>
      set({ isShowListChattererPanel: value }),
    toggleGeneralFullScreen: (id) => set({ generalFullScreen: id }),
  }))
);
