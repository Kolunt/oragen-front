import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchDrugsBySearch, IDrug } from 'api/drugsApi';
import { IContact } from 'store/useContactsStore';
import { fetchContactBySearch } from 'api/contactApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface ISearchFormVisitsStore {
  drugs: IDrug[];
  contacts: IContact[];
  getDrugs: (search: string) => void;
  getContacts: (search: string) => void;
}

export const useSearchFormVisitsStore = create<ISearchFormVisitsStore>()(
  immer((set, get) => ({
    drugs: [],
    contacts: [],
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
    getContacts: async (search) => {
      useAuthStore.getState().setLoading(true);
      const like = JSON.stringify({ full_name: search });
      try {
        const { data } = await fetchContactBySearch(like);
        if (data) {
          set({ contacts: data.data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
