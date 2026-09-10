import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { VisitTypes } from 'enums';
import { persist } from 'zustand/middleware';
import {
  createVisit,
  createVisitRemote,
  deleteVisit,
  fetchAcceptVisit,
  fetchCancelVisit,
  fetchDeclineVisit,
  fetchGenerateVisits,
  fetchUpdateVisitDate,
  fetchUpdateVisitPerformer,
  fetchVisit,
  fetchVisits,
  ICommentsVisit,
  ICreateVisitPayload,
  ICreateVisitRemotePayload,
  IFetchVisitsRequest,
  IGenerateVisitsPayload,
  ISetAcceptVisitPayload,
  ISetApprovalStatusVisitPayload,
  IUpdateVisitDatePayload,
  IUpdateVisitModePayload,
  IUpdateVisitPerformerPayload,
  IVisit,
  updateVisitMode,
  VisitApprovalType,
  VisitModeType,
  VisitOrderType,
  VisitStatusType,
} from 'api/visitsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { useUserStore } from 'store/useUserStore';
import { useModalsStore } from 'store/useModalsStore';
import { OrderByType } from '../api/contactApi';
import { useContactsStore } from 'store/useContactsStore';
import { fetchDrugs, IDrug, IGetDrug } from '../api/drugsApi';
import { useMessageStore } from 'components';

export type VisitType =
  | VisitTypes.REMOTE_VISIT
  | VisitTypes.DOCTOR_VISIT
  | VisitTypes.PHARMACY_VISIT;

export interface IVisitListSorting {
  order: VisitOrderType;
  orderBy: OrderByType;
}

interface IVisitsStore {
  visits: IVisit[];
  visitsByContact: IVisit[];
  monitoredVisit: IVisit;
  monitoredVisitId?: number;
  approvalStatus?: VisitApprovalType;
  status?: VisitStatusType;
  drugId?: number;
  drugsForVisit: IDrug[];
  getDrugsForVisit: () => void;
  drugsSearchForVisit: string;
  setDrugsSearchForVisit: (value: string) => void;
  currentPage: number;
  pageSize: number;
  numberOfVisits: number;
  address: string;
  target_list_id: number;
  modeType?: VisitModeType;
  setAddress: (value: string) => void;
  setTargetListId: (id: number) => void;
  contactId?: number;
  comments: ICommentsVisit[];
  setContactId: (value: number | undefined) => void;
  getVisits: (id?: number) => void;
  generateVisits: (payload: IGenerateVisitsPayload) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  removeVisit: (id: number) => void;
  addVisit: (payload: ICreateVisitPayload) => void;
  addRemoteVisit: (payload: ICreateVisitRemotePayload) => void;
  acceptVisit: (payload: ISetAcceptVisitPayload) => void;
  declineVisit: (payload: ISetApprovalStatusVisitPayload) => void;
  cancelVisit: (payload: ISetApprovalStatusVisitPayload) => void;
  updateVisitPerformer: (payload: IUpdateVisitPerformerPayload) => void;
  updateVisitDate: (payload: IUpdateVisitDatePayload) => void;
  getMonitoredVisit: (id: number) => void;
  setMonitoredVisitId: (newId: number) => void;
  setDrugId: (newId: number | undefined) => void;
  setApprovalStatus: (value?: VisitApprovalType) => void;
  updateVisitType: (payload: IUpdateVisitModePayload) => void;
  setModeType: (value: VisitModeType | undefined) => void;
  sorting: IVisitListSorting;
  setSorting: (sorting: IVisitListSorting) => void;
  getVisitsByContact: (id?: number) => void;
  setStatus: (value?: VisitStatusType) => void;
  setComments: (value: ICommentsVisit[]) => void;
}

export const useVisitsStore = create<IVisitsStore>()(
  persist(
    immer((set, get) => ({
      visits: [],
      visitsByContact: [],
      comments: [],
      monitoredVisit: {} as IVisit,
      monitoredVisitId: undefined,
      approvalStatus: undefined,
      currentPage: 1,
      pageSize: 10,
      numberOfVisits: 0,
      address: '',
      contactId: undefined,
      modeType: undefined,
      target_list_id: 0,
      sorting: {
        order: 'full_name',
        orderBy: 'asc',
      },
      drugsForVisit: [],
      drugsSearchForVisit: '',
      isPharmacyMode: false,
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
          mode: get().modeType,
          order: 'contact_id',
          target_list_id: get().target_list_id,
          orderBy: 'asc',
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
      getVisitsByContact: async (id) => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        const params = {
          performer_id: id,
          contact_id: useContactsStore.getState().monitoredContactId,
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
              visitsByContact: data.data,
              currentPage: data.current_page,
              numberOfVisits: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      generateVisits: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchGenerateVisits(payload);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Визиты успешно сгенерированы!');
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
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
      acceptVisit: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchAcceptVisit(payload);
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
          const { data } = await fetchDeclineVisit(payload);
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
          const { data } = await fetchCancelVisit(payload);
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
            get().getVisits(useUserStore.getState().me.id);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      updateVisitType: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await updateVisitMode(payload);
          if (data.success) {
            get().getMonitoredVisit(get().monitoredVisitId as number);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getMonitoredVisit: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchVisit(id);
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
      setModeType: (value) => {
        set({ modeType: value });
      },
      setTargetListId: (id) => {
        set({ target_list_id: id });
      },
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setStatus: (value) => {
        set({ status: value });
      },
      setComments: (value) => {
        set({ comments: value });
      },
      setDrugsSearchForVisit: (value) => set({ drugsSearchForVisit: value }),
      getDrugsForVisit: async () => {
        useAuthStore.getState().setLoading(true);

        const params: IGetDrug = {
          order: 'name',
          orderBy: get().sorting.orderBy,
          name: get().drugsSearchForVisit,
          mode: 'paginate',
          status: 1,
        };

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        try {
          const { data } = await fetchDrugs(payload, params);

          if (data) {
            set({
              drugsForVisit: data.data,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    {
      name: 'visits',
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
