import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchTargetListLocal } from 'api';
import {
  fetchMonitoredTargetLocal,
  ITargetLocal,
  IUpdateContactStatusPayload,
  IUpdateStatusPayload,
  updateTargetListContactComment,
  updateTargetListContactStatus,
  updateTargetListContactVisits,
  updateTargetListOrganizationStatus,
  updateTargetListOrganizationVisits,
  updateTargetListStatus,
  updateTargetListVisits,
} from 'api/targetListApiLocal';

interface ITargetsLocalStore {
  targets: ITargetLocal[];
  planedVisits: number;
  setPlanedVisits: (value: number) => void;
  planedContactsVisits: number;
  setPlanedContactsVisits: (value: number) => void;
  monitoredTarget: ITargetLocal;
  monitoredTargetId?: number;
  parentTargetListId?: number;
  getTargets: () => void;
  getMonitoredTarget: (id: number) => void;
  currentPage: number;
  pageSize: number;
  numberOfTargets: number;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setMonitoredTargetId: (newId: number) => void;
  changeComment: (targetId: number, contactId: string, comment: string) => void;
  changeVisitsCount: (id: number, visitsCount: number) => void;
  changeContactVisitsCount: (
    targetId: number,
    contactId: number,
    visitsCount: number
  ) => void;
  changeOrganizationVisitsCount: (
    targetId: number,
    contactId: number,
    visitsCount: number
  ) => void;
  setVisits: (id: number, visitsCount: number) => void;
  setParentTargetListId: (id: number) => void;
  changeContactStatus: (payload: IUpdateContactStatusPayload) => void;
  changeOrganizationStatus: (payload: IUpdateContactStatusPayload) => void;
  changeStatus: (payload: IUpdateStatusPayload) => void;
}

export const useTargetsLocalStore = create<ITargetsLocalStore>()(
  persist(
    immer((set, get) => ({
      targets: [],
      planedVisits: 0,
      planedContactsVisits: 0,
      parentTargetListId: undefined,
      monitoredTarget: {} as ITargetLocal,
      monitoredTargetId: undefined,
      currentPage: 1,
      pageSize: 10,
      numberOfTargets: 0,
      getTargets: async () => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        try {
          const { data } = await fetchTargetListLocal(
            payload,
            get().parentTargetListId
          );
          if (data) {
            set({
              targets: data.data,
              currentPage: data.current_page,
              numberOfTargets: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getMonitoredTarget: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredTargetLocal(id);
          if (data) {
            set({ monitoredTarget: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
      setMonitoredTargetId: (id) => {
        set({ monitoredTargetId: id });
      },
      changeComment: async (targetId, contactId, comment) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await updateTargetListContactComment(
            targetId,
            contactId,
            comment
          );
          if (data.success) {
            get().getMonitoredTarget(get().monitoredTargetId as number);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      changeVisitsCount: async (id, visitsCount) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await updateTargetListVisits(id, visitsCount);
          if (data.success) {
            get().getTargets();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      changeContactVisitsCount: async (targetId, contactId, visitsCount) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await updateTargetListContactVisits(
            targetId,
            contactId,
            visitsCount
          );
          if (data.success) {
            get().getMonitoredTarget(get().monitoredTargetId as number);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      changeOrganizationVisitsCount: async (
        targetId,
        contactId,
        visitsCount
      ) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await updateTargetListOrganizationVisits(
            targetId,
            contactId,
            visitsCount
          );
          if (data.success) {
            get().getMonitoredTarget(get().monitoredTargetId as number);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setVisits: async (id, visitsCount) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await updateTargetListVisits(id, visitsCount);
          if (data) {
            get().getMonitoredTarget(get().monitoredTargetId as number);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setParentTargetListId: (id) => set({ parentTargetListId: id }),
      setPlanedVisits: (value) => set({ planedVisits: value }),
      setPlanedContactsVisits: (value) => set({ planedContactsVisits: value }),
      changeContactStatus: async (payload) => {
        const { data } = await updateTargetListContactStatus(payload);
        if (data.success) {
          get().getMonitoredTarget(get().monitoredTargetId as number);
        }
      },
      changeOrganizationStatus: async (payload) => {
        const { data } = await updateTargetListOrganizationStatus(payload);
        if (data.success) {
          get().getMonitoredTarget(get().monitoredTargetId as number);
        }
      },
      changeStatus: async (payload) => {
        const { data } = await updateTargetListStatus(payload);
        if (data.success) {
          get().getTargets();
        }
      },
    })),
    {
      name: 'targets-local',
      partialize: (state) => ({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        monitoredTarget: state.monitoredTarget,
        monitoredTargetId: state.monitoredTargetId,
        parentTargetListId: state.parentTargetListId,
      }),
    }
  )
);
