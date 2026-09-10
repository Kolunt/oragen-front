import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchDrugsBySearch, IDrug } from 'api/drugsApi';
import { fetchUsersBySearch, IUser } from 'api/userApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { IOrganization } from 'store/useOrganizationsStore';
import { fetchPharmacyBySearch } from 'api/organizationApi';
import { fetchFreePollsBySearch, IReport } from 'api/pollsApi';

interface IAddVisitPharmacyStore {
  pharmacies: IOrganization[];
  drugs: IDrug[];
  participants: IUser[];
  polls: IReport[];
  getPolls: (search: string) => void;
  getPharmacies: (search: string) => void;
  getDrugs: (search: string) => void;
  getParticipants: (search: string) => void;
}

export const useAddVisitPharmacyStore = create<IAddVisitPharmacyStore>()(
  immer((set, get) => ({
    pharmacies: [],
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
    getPharmacies: async (search) => {
      useAuthStore.getState().setLoading(true);
      const like = JSON.stringify({
        name: search,
        organization_type: 'pharmacy',
      });
      try {
        const { data } = await fetchPharmacyBySearch(like);
        if (data) {
          set({ pharmacies: data.data });
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
