import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { IOrganization } from 'store/useOrganizationsStore';
import { fetchMonitoredOrganization } from 'api/organizationApi';

interface IPharmacyInfoStore {
  organization: IOrganization;
  monitoredId?: number;
  setMonitoredId: (id: number) => void;
  getOrganization: () => void;
}

export const usePharmacyInfoStore = create<IPharmacyInfoStore>()(
  persist(
    immer((set, get) => ({
      organization: {} as IOrganization,
      setMonitoredId: (id: number) => set({ monitoredId: id }),
      getOrganization: async () => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredOrganization(
            get().monitoredId as number
          );

          if (data) {
            set({ organization: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    {
      name: 'pharmacy-info',
      partialize: (state) => ({
        monitoredId: state.monitoredId,
      }),
    }
  )
);
