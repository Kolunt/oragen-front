import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import {
  createVisit,
  createVisitRemote,
  ICreateVisitPayload,
  ICreateVisitRemotePayload,
  IFetchVisitsRequest,
} from 'api/visitsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchVisitsGrouped, IVisitGroup } from 'api/visitsGroupApi';
import { useUserStore } from 'store/useUserStore';
import { useModalsStore } from 'store/useModalsStore';

interface IVisitsGroupStore {
  visits: IVisitGroup[];
  drugId?: number;
  currentPage: number;
  pageSize: number;
  numberOfVisits: number;
  address: string;
  setAddress: (value: string) => void;
  contactId?: number;
  setContactId: (value: number | undefined) => void;
  getVisits: (id?: number) => void;
  addVisit: (payload: ICreateVisitPayload) => void;
  addRemoteVisit: (payload: ICreateVisitRemotePayload) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setDrugId: (newId: number | undefined) => void;
}

export const useVisitsGroupStore = create<IVisitsGroupStore>()(
  persist(
    immer((set, get) => ({
      visits: [],
      currentPage: 1,
      pageSize: 10,
      numberOfVisits: 0,
      address: '',
      contactId: undefined,
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
          contact_id: get().contactId,
          performer_id: id,
        };

        try {
          const { data } = await fetchVisitsGrouped(
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
          const { data } = await createVisit(payload);
          if (data.success) {
            const me = useUserStore.getState().me;
            if (me.roles[0].id === 8) {
              get().getVisits(me.id);
            } else {
              get().getVisits();
            }
            useModalsStore.getState().handleVisit(false);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addRemoteVisit: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createVisitRemote(payload);
          if (data.success) {
            const me = useUserStore.getState().me;
            if (me.roles[0].id === 8) {
              get().getVisits(me.id);
            } else {
              get().getVisits();
            }
            useModalsStore.getState().handleVisitRemote(false);
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
      setContactId: (id) => {
        set({ contactId: id });
      },
      setAddress: (value) => {
        set({ address: value });
      },
    })),
    {
      name: 'visit-group',
      partialize: (state) => ({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }),
    }
  )
);
