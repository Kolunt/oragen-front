import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchSpecialties, ISpecialty } from 'api/commonApi';

interface ICommonStore {
  specialties: ISpecialty[];
  getSpecialties: (name: string) => void;
  setSpecialties: (newValue: ISpecialty[]) => void;
  reset: () => void;
}

export const useCommonStore = create<ICommonStore>()(
  immer((set) => ({
    specialties: [],
    getSpecialties: async (name) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await fetchSpecialties(name);
        if (data) {
          set({ specialties: data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    setSpecialties: async (newValue) => {
      set({ specialties: newValue });
    },
    reset: () => set({ specialties: [] }),
  }))
);
