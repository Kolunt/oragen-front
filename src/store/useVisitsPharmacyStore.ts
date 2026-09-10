import { create } from 'zustand';
import {
  IFetchVisitsRequest,
  ISetAcceptVisitPayload,
  ISetApprovalStatusVisitPayload,
  IUpdateVisitDatePayload,
  IUpdateVisitPerformerPayload,
  VisitApprovalType,
  VisitStatusType,
} from 'api/visitsApi';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { useUserStore } from 'store/useUserStore';
import { useModalsStore } from 'store/useModalsStore';
import {
  fetchAcceptVisitPharmacy,
  fetchCancelVisitPharmacy,
  fetchDeclineVisitPharmacy,
  fetchUpdateVisitPharmacyPerformer,
} from 'api';
import {
  createVisitPharmacy,
  fetchUpdateVisitPharmacyDate,
  fetchVisitPharmacy,
  fetchVisitsPharmacy,
  ICreateVisitPayloadPharmacy,
  IVisitPharmacy,
} from 'api/visitsPharmacyApi';
import { useOrganizationsStore } from 'store/useOrganizationsStore';

interface IVisitsPharmacyStore {
  visits: IVisitPharmacy[];
  visitsByOrganization: IVisitPharmacy[];
  monitoredVisit: IVisitPharmacy;
  monitoredVisitId?: number;
  approvalStatus?: VisitApprovalType;
  drugId?: number;
  currentPage: number;
  pageSize: number;
  numberOfVisits: number;
  address: string;
  contactId?: number;
  status?: VisitStatusType;
  setContactId: (value: number | undefined) => void;
  getVisits: (id?: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  // removeVisit: (id: number) => void;
  addVisit: (payload: ICreateVisitPayloadPharmacy) => void;
  acceptVisit: (payload: ISetAcceptVisitPayload) => void;
  declineVisit: (payload: ISetApprovalStatusVisitPayload) => void;
  cancelVisit: (payload: ISetApprovalStatusVisitPayload) => void;
  updateVisitPerformer: (payload: IUpdateVisitPerformerPayload) => void;
  updateVisitDate: (payload: IUpdateVisitDatePayload) => void;
  getMonitoredVisit: (id: number) => void;
  setMonitoredVisitId: (newId: number) => void;
  setDrugId: (newId: number | undefined) => void;
  setApprovalStatus: (value?: VisitApprovalType) => void;
  setAddress: (value: string) => void;
  setStatus: (value?: VisitStatusType) => void;
  getVisitsByOrganization: (id?: number) => void;
}

export const useVisitsPharmacyStore = create<IVisitsPharmacyStore>()(
  persist(
    immer((set, get) => ({
      visits: [],
      visitsByOrganization: [],
      monitoredVisit: {} as IVisitPharmacy,
      monitoredVisitId: undefined,
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
          approval: get().approvalStatus,
          performer_id: id,
          drug_id: get().drugId,
          contact_id: get().contactId,
          order: 'organization_id',
        };

        try {
          const { data } = await fetchVisitsPharmacy(
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
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
      /*   removeVisit: async (id) => {
                useAuthStore.getState().setLoading(true);
                try {
                    const { data } = await deleteVisit(id);
                    if (data.success) {
                        get().getVisits();
                    }
                } finally {
                    useAuthStore.getState().setLoading(false);
                }
            },*/
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
            useModalsStore.getState().handleVisit(false);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      acceptVisit: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchAcceptVisitPharmacy(payload);
          if (data.success) {
            get().getVisits(useUserStore.getState().me.id);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      declineVisit: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchDeclineVisitPharmacy(payload);
          if (data.success) {
            get().getVisits(useUserStore.getState().me.id);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      cancelVisit: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchCancelVisitPharmacy(payload);
          if (data.success) {
            get().getVisits(useUserStore.getState().me.id);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      updateVisitPerformer: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchUpdateVisitPharmacyPerformer(payload);
          if (data.success) {
            useModalsStore.getState().handleChangeVisitPharmacy(false);
            get().getVisits();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      updateVisitDate: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchUpdateVisitPharmacyDate(payload);
          if (data.success) {
            get().getVisits(useUserStore.getState().me.id);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getMonitoredVisit: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchVisitPharmacy(id);
          if (data) {
            set({ monitoredVisit: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setMonitoredVisitId: (id) => {
        set({ monitoredVisitId: id });
      },
      setDrugId: (id) => {
        set({ drugId: id });
      },
      setContactId: (id) => {
        set({ contactId: id });
      },
      setAddress: (value) => {
        set({ address: value });
      },
      setApprovalStatus: (value) => {
        set({ approvalStatus: value });
      },
      setStatus: (value) => {
        set({ status: value });
      },
      getVisitsByOrganization: async (id) => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        const params = {
          performer_id: id,
          organization_id:
            useOrganizationsStore.getState().monitoredOrganizationId,
          approval: get().approvalStatus,
          status: get().status,
        };

        try {
          const { data } = await fetchVisitsPharmacy(
            payload,
            params as IFetchVisitsRequest
          );
          if (data) {
            set({
              visitsByOrganization: data.data,
              currentPage: data.current_page,
              numberOfVisits: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    {
      name: 'visits-pharmacy',
      partialize: (state) => ({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        monitoredVisit: state.monitoredVisit,
        monitoredVisitId: state.monitoredVisitId,
        approvalStatus: state.approvalStatus,
      }),
    }
  )
);
