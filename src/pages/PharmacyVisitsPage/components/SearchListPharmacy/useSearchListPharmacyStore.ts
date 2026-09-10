import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchDrugsBySearch, IDrug } from 'api/drugsApi';
import { fetchPharmacyBySearch } from 'api/organizationApi';
import { IOrganization } from 'store/useOrganizationsStore';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface ISearchListPharmacyStore {
  drugs: IDrug[];
  pharmacies: IOrganization[];
  getDrugs: (search: string) => void;
  getPharmacies: (search: string) => void;
}

export const useSearchListPharmacyStore = create<ISearchListPharmacyStore>()(
  immer((set, get) => ({
    drugs: [],
    pharmacies: [],
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
    getPharmacies: async (search) => {
      useAuthStore.getState().setLoading(true);
      const like = JSON.stringify({ name: search });
      try {
        const { data } = await fetchPharmacyBySearch(like);
        if (data) {
          set({ pharmacies: data.data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
