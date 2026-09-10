import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchDrugsBySearch, IDrug } from 'api/drugsApi';
import { fetchSpecialties, ISpecialty } from 'api/commonApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface ISearchFormContactsStore {
  drugs: IDrug[];
  specialties: ISpecialty[];
  getDrugs: (search: string) => void;
  getSpecialties: (search: string) => void;
}

export const useSearchFormContactsStore = create<ISearchFormContactsStore>()(
  immer((set, get) => ({
    drugs: [],
    specialties: [],
    getDrugs: async (search) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await fetchDrugsBySearch(search);
        if (data) {
          set({ drugs: data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    getSpecialties: async (search) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await fetchSpecialties(search);
        if (data) {
          set({ specialties: data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
