import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { ICreateVisitPayload, IFetchVisitsRequest } from 'api/visitsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import {
  fetchVisitsGroupedPharmacy,
  IVisitGroupPharmacy,
} from 'api/visitsPharmacyGroupApi';
import {
  createVisitPharmacy,
  ICreateVisitPayloadPharmacy,
} from 'api/visitsPharmacyApi';
import { useUserStore } from 'store/useUserStore';
import { useModalsStore } from 'store/useModalsStore';

interface IVisitsGroupPharmacyStore {
  visits: IVisitGroupPharmacy[];
  drugId?: number;
  currentPage: number;
  pageSize: number;
  numberOfVisits: number;
  address: string;
  setAddress: (value: string) => void;
  organizationId?: number;
  setOrganizationId: (value: number | undefined) => void;
  getVisits: (id?: number) => void;
  addVisit: (payload: ICreateVisitPayloadPharmacy) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setDrugId: (newId: number | undefined) => void;
}

export const useVisitsGroupPharmacyStore = create<IVisitsGroupPharmacyStore>()(
  persist(
    immer((set, get) => ({
      visits: [],
      currentPage: 1,
      pageSize: 10,
      numberOfVisits: 0,
      address: '',
      getVisits: async (id) => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        const params = {
          address: get().address,
          drug_id: get().drugId,
          organization_id: get().organizationId,
          performer_id: id,
        };

        try {
          const { data } = await fetchVisitsGroupedPharmacy(
            payload,
            params as IFetchVisitsRequest
          );
          if (data) {
            set({
              visits: data.data,
              currentPage: data.current_page,
              numberOfVisits: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addVisit: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createVisitPharmacy(payload);
          if (data.success) {
            const me = useUserStore.getState().me;
            if (me.roles[0].id === 8) {
              get().getVisits(me.id);
            } else {
              get().getVisits();
            }
            useModalsStore.getState().handleVisitPharmacy(false);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
      setDrugId: (id) => {
        set({ drugId: id });
      },
      setOrganizationId: (id) => {
        set({ organizationId: id });
      },
      setAddress: (value) => {
        set({ address: value });
      },
    })),
    {
      name: 'visit-group-pharmacy',
      partialize: (state) => ({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }),
    }
  )
);
