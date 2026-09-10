import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import {
  deleteVisit,
  fetchAcceptVisit,
  fetchCancelVisit,
  fetchDeclineVisit,
  fetchStartVisit,
  fetchStopVisit,
  fetchUpdateVisitDate,
  fetchUpdateVisitPerformer,
  fetchVisits,
  IFetchVisitsRequest,
  ISetAcceptVisitPayload,
  ISetApprovalStatusVisitPayload,
  IUpdateVisitDatePayload,
  IUpdateVisitParticipantsPayload,
  IUpdateVisitPerformerPayload,
  IVisit,
  updateVisitParticipants,
  VisitApprovalType,
  VisitStatusType,
} from 'api/visitsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { useContactsStore } from 'store/useContactsStore';
import { useModalsStore } from 'store/useModalsStore';
import { fetchForceStart } from 'api';
import { ROUTES } from 'enums';
import { useVideoCallStore } from 'store/useVideoCallStore';

interface IContactInfoStore {
  visits: IVisit[];
  status?: VisitStatusType;
  performerId?: number;
  drugId?: number;
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
  startRemoteVisit: (
    contactId: number,
    videoCallId: number,
    redirect: (route: string) => void
  ) => void;
}

export const useCurrentVisitsStore = create<IContactInfoStore>()(
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
          contact_id: useContactsStore.getState().monitoredContactId,
          performer_id: get().performerId,
          drug_id: get().drugId,
          approval: get().approvalStatus,
          status: get().status,
        };

        try {
          const { data } = await fetchVisits(
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
          const { data } = await fetchAcceptVisit(payload);
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
          const { data } = await fetchDeclineVisit(payload);
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
          const { data } = await fetchCancelVisit(payload);
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
          const { data } = await fetchUpdateVisitPerformer(payload);
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
          const { data } = await fetchUpdateVisitDate(payload);
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
          const { data } = await updateVisitParticipants(payload);
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
          const { data } = await deleteVisit(id);
          if (data.success) {
            get().getVisits();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      startVisit: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchStartVisit(id);
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
          const { data } = await fetchStopVisit(id);
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
      startRemoteVisit: async (contactId, videoCallId, redirect) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchForceStart(videoCallId);
          if (data.success) {
            useVideoCallStore.getState().setTypeVideoCall('remoteVisit');
            redirect(`${ROUTES.VIDEO_CALL}/${videoCallId}`);
            await fetchStartVisit(contactId);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    {
      name: 'current-visits',
      partialize: (state) => ({
        performerId: state.performerId,
        drugId: state.drugId,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }),
    }
  )
);
