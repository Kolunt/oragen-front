import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import {
  fetchStartVisit,
  fetchStopVisit,
  IFetchVisitsRequest,
  ISetAcceptVisitPayload,
  ISetApprovalStatusVisitPayload,
  IUpdateVisitDatePayload,
  IUpdateVisitParticipantsPayload,
  IUpdateVisitPerformerPayload,
  VisitApprovalType,
  VisitStatusType,
} from 'api/visitsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { useModalsStore } from 'store/useModalsStore';
import {
  deleteVisitPharmacy,
  fetchAcceptVisitPharmacy,
  fetchCancelVisitPharmacy,
  fetchDeclineVisitPharmacy,
  fetchStartVisitPharmacy,
  fetchStopVisitPharmacy,
  fetchUpdateVisitPharmacyDate,
  fetchUpdateVisitPharmacyPerformer,
  fetchVisitsPharmacy,
  IVisitPharmacy,
  updateVisitPharmacyParticipants,
} from 'api/visitsPharmacyApi';
import { usePharmacyInfoStore } from 'pages';

interface IOrganizationInfoStore {
  visits: IVisitPharmacy[];
  performerId?: number;
  drugId?: number;
  status?: VisitStatusType;
  currentPage: number;
  pageSize: number;
  numberOfVisits: number;
  approvalStatus?: VisitApprovalType;
  getVisits: (id?: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setPerformerId: (newId: number) => void;
  setDrugId: (newId: number) => void;
  acceptVisit: (payload: ISetAcceptVisitPayload) => void;
  declineVisit: (payload: ISetApprovalStatusVisitPayload) => void;
  cancelVisit: (payload: ISetApprovalStatusVisitPayload) => void;
  updateVisitPerformer: (payload: IUpdateVisitPerformerPayload) => void;
  updateVisitDate: (payload: IUpdateVisitDatePayload) => void;
  changeAttendeesList: (payload: IUpdateVisitParticipantsPayload) => void;
  setApprovalStatus: (value?: VisitApprovalType) => void;
  removeVisit: (id: number) => void;
  setStatus: (value?: VisitStatusType) => void;
  startVisit: (id: number) => void;
  finishVisit: (id: number) => void;
}

export const useCurrentVisitsPharmacyStore = create<IOrganizationInfoStore>()(
  persist(
    immer((set, get) => ({
      visits: [],
      currentPage: 1,
      pageSize: 10,
      numberOfVisits: 0,
      getVisits: async () => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        const params = {
          organization_id: usePharmacyInfoStore.getState().monitoredId,
          performer_id: get().performerId,
          drug_id: get().drugId,
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
      setPerformerId: (id) => {
        set({ performerId: id });
      },
      setDrugId: (id) => {
        set({ drugId: id });
      },
      acceptVisit: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchAcceptVisitPharmacy(payload);
          if (data.success) {
            get().getVisits();
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
            get().getVisits();
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
            get().getVisits();
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
            useModalsStore.getState().handleChangeVisit(false);
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
            get().getVisits();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      changeAttendeesList: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await updateVisitPharmacyParticipants(payload);
          if (data.success) {
            get().getVisits();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setApprovalStatus: (value) => {
        set({ approvalStatus: value });
      },
      removeVisit: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await deleteVisitPharmacy(id);
          if (data.success) {
            get().getVisits();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setStatus: (value) => {
        set({ status: value });
      },
      startVisit: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchStartVisitPharmacy(id);
          if (data.success) {
            get().getVisits();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      finishVisit: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchStopVisitPharmacy(id);
          if (data.success) {
            get().getVisits();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    {
      name: 'current-visits-pharmacy',
      partialize: (state) => ({
        performerId: state.performerId,
        drugId: state.drugId,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }),
    }
  )
);
