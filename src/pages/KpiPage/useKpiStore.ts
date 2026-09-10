import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ITargetListSorting } from 'store/useTargetsStore';
import {
  fetchTargetListLocal,
  IGetTargetList,
  ITarget,
} from 'api/targetListApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchVisits, IFetchVisitsRequest, IVisit } from 'api/visitsApi';
import {
  fetchMonitoredTargetLocal,
  ITargetLocal,
} from 'api/targetListApiLocal';
import { fetchCalculateKpi, ICalculateKpiRequest, IKpi } from 'api/kpiApi';
import { fetchVisitsGrouped } from '../../api';
import { IVisitGroup } from '../../api/visitsGroupApi';

interface IKpiStore {
  sorting: ITargetListSorting;
  setSorting: (sorting: ITargetListSorting) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  numberOfLocalTargets: number;
  targetsLocal: ITarget[];
  getTargetListLocal: (id: number) => void;
  visitsForKpi: IVisitGroup[];
  getVisitsForKpi: (id?: number, target_list_id?: number | string) => void;
  target_list_id: number;
  currentPage: number;
  pageSize: number;
  setTargetListId: (id: number) => void;
  monitoredTargetForKpi: ITargetLocal;
  getMonitoredTargetForKpi: (id: number) => void;
  monitoredTargetForKpiId?: number;
  kpiData?: IKpi;
}

export const useKpiStore = create<IKpiStore>()(
  persist(
    immer((set, get) => ({
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      pageSize: 10,
      numberOfLocalTargets: 0,
      targetsLocal: [],
      currentPage: 1,
      visitsForKpi: [],
      target_list_id: 0,
      monitoredTargetForKpi: {} as ITargetLocal,
      monitoredTargetForKpiId: undefined,
      // получаем по performer_id
      getTargetListLocal: async (id) => {
        useAuthStore.getState().setLoading(true);
        const params: IGetTargetList = {
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
          performer_id: id,
        };

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };
        try {
          const { data } = await fetchTargetListLocal(payload, params);
          if (data) {
            set({
              //@ts-ignore
              targetsLocal: data.data,
              currentPage: data.current_page,
              numberOfLocalTargets: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
      getVisitsForKpi: async (id, target_list_id) => {
        useAuthStore.getState().setLoading(true);
        const payload = {
          paginationMethod: 'full',
          page: 1,
          pageSize: 20,
        };

        const params = {
          performer_id: id,
          target_list_id: target_list_id,
        };

        try {
          const { data } = await fetchVisitsGrouped(
            payload,
            params as IFetchVisitsRequest
          );
          if (data) {
            set({
              visitsForKpi: data.data,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setTargetListId: (id) => {
        set({ target_list_id: id });
      },
      getMonitoredTargetForKpi: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredTargetLocal(id);
          if (data) {
            set({ monitoredTargetForKpi: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    { name: 'Kpi' }
  )
);
