import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IContact } from 'store/useContactsStore';
import { fetchDrugsBySearch, IDrug } from 'api/drugsApi';
import { fetchUsersBySearch, IUser } from 'api/userApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchContactBySearch } from 'api/contactApi';
import { fetchFreePollsBySearch, IReport } from 'api/pollsApi';

interface IAddVisitRemoteStore {
  contacts: IContact[];
  drugs: IDrug[];
  participants: IUser[];
  polls: IReport[];
  getPolls: (search: string) => void;
  getContacts: (search: string) => void;
  getDrugs: (search: string) => void;
  getParticipants: (search: string) => void;
}

export const useAddVisitRemoteStore = create<IAddVisitRemoteStore>()(
  immer((set, get) => ({
    contacts: [],
    drugs: [],
    participants: [],
    polls: [],
    getPolls: async (search) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await fetchFreePollsBySearch(search);
        if (data) {
          set({ polls: data.data });
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
    getParticipants: async (search) => {
      useAuthStore.getState().setLoading(true);
      const like = JSON.stringify({ name: search });
      try {
        const { data } = await fetchUsersBySearch(like);
        if (data) {
          set({ participants: data.data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
