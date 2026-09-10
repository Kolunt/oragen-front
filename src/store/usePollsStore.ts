import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  fetchDeletePoll,
  fetchFreePolls,
  fetchPollById,
  fetchPollByVisit,
  IReport,
} from 'api/pollsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface IPollsStore {
  freePolls: IReport[];
  monitoredReport: IReport;
  monitoredReportId?: number;
  currentPageFreePolls: number;
  pageSizeFreePolls: number;
  numberOfFreePolls: number;
  getFreePolls: () => void;
  setCurrentPageFreePolls: (currentPage: number) => void;
  setPageSizePageFreePolls: (pageSize: number) => void;
  setMonitoredReportId: (value: number) => void;
  getPollById: (id: number) => void;
  getPollByVisit: (id: number) => void;
  removePoll: (id: number) => void;
}

export const usePollsStore = create<IPollsStore>()(
  persist(
    immer((set, get) => ({
      freePolls: [],
      currentPageFreePolls: 1,
      pageSizeFreePolls: 10,
      numberOfFreePolls: 0,
      monitoredReport: {} as IReport,
      getFreePolls: async () => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: get().currentPageFreePolls,
          pageSize: get().pageSizeFreePolls,
        };

        try {
          const { data } = await fetchFreePolls(payload);
          if (data) {
            set({
              freePolls: data.data,
              currentPageFreePolls: data.current_page,
              numberOfFreePolls: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setCurrentPageFreePolls: (currentPage) =>
        set({ currentPageFreePolls: currentPage }),
      setPageSizePageFreePolls: (pageSize) =>
        set({ pageSizeFreePolls: pageSize }),
      setMonitoredReportId: (value) => set({ monitoredReportId: value }),
      getPollById: async (id) => {
        useAuthStore.getState().setLoading(true);

        try {
          const { data } = await fetchPollById(id);
          if (data) {
            set({ monitoredReport: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getPollByVisit: async (id) => {
        useAuthStore.getState().setLoading(true);

        try {
          const { data } = await fetchPollByVisit(id);
          if (data) {
            set({ monitoredReport: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      removePoll: async (id) => {
        useAuthStore.getState().setLoading(true);

        try {
          const { data } = await fetchDeletePoll(id);
          if (data.success) {
            get().getFreePolls();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    {
      name: 'polls',
      partialize: (state) => ({
        monitoredReport: state.monitoredReport,
        monitoredReportId: state.monitoredReportId,
      }),
    }
  )
);
