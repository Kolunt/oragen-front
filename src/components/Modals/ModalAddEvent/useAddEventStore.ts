import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IContact } from 'store/useContactsStore';
import { fetchContactBySearch } from 'api/contactApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface IAddEventStore {
  contacts: IContact[];
  getContacts: (search: string) => void;
}

export const useAddEventStore = create<IAddEventStore>()(
  immer((set, get) => ({
    contacts: [],
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
