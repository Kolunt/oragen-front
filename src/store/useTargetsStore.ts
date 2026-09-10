import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  createTargetList,
  deleteTargetList,
  fetchMonitoredTarget,
  fetchTargetList,
  fetchTargetListLocal,
  generateLocalLists,
  ICreateTargetListPayload,
  IGetTargetList,
  ITarget,
  resetLocalLists,
  TargetOrderType,
  updateTargetList,
  fetchTargetListLocalById,
} from 'api/targetListApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { OrderByType } from 'api/contactApi';
import { fetchDrugs, IDrug, IGetDrug } from '../api/drugsApi';
import { useMessageStore } from 'components';
import { ROUTES } from 'enums';
import { ITargetLocal } from 'api/targetListApiLocal';

export interface ITargetListSorting {
  order: TargetOrderType;
  orderBy: OrderByType;
}

interface ITargetsStore {
  targets: ITarget[];
  targetsLocal: ITargetLocal[];
  monitoredTarget: ITarget;
  monitoredTargetId?: number;
  getTargets: () => void;
  getTargetListLocalById: (target_list_id: number[]) => void;
  getTargetListLocal: (id: number) => void;
  addTargetList: (payload: ICreateTargetListPayload) => void;
  removeTargetList: (id: number) => void;
  currentPage: number;
  pageSize: number;
  numberOfTargets: number;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setMonitoredTargetId: (newId: number) => void;
  getMonitoredTarget: (id: number) => void;
  createLocalLists: (id: number, navigate: (route: string) => void) => void;
  clearLocalLists: (id: number, navigate: (route: string) => void) => void;
  changeTargetList: (id: number, payload: ICreateTargetListPayload) => void;
  sorting: ITargetListSorting;
  setSorting: (sorting: ITargetListSorting) => void;
  drugsForTarget: IDrug[];
  drugsSearchForTarget: string;
  getDrugsForTarget: () => void;
  setDrugsSearchForTarget: (value: string) => void;
}

export const useTargetsStore = create<ITargetsStore>()(
  persist(
    immer((set, get) => ({
      targets: [],
      targetsLocal: [],
      monitoredTarget: {} as ITarget,
      monitoredTargetId: undefined,
      currentPage: 1,
      pageSize: 10,
      numberOfTargets: 0,
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      drugsForTarget: [],
      drugsSearchForTarget: '',
      getTargets: async () => {
        useAuthStore.getState().setLoading(true);

        const params: IGetTargetList = {
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
        };

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        try {
          const { data } = await fetchTargetList(payload, params);
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
      // todo дубль из useTargetsLocalStore
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
              targetsLocal: data.data,
              currentPage: data.current_page,
              numberOfTargets: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      // получаем локальные таргеты по нескольким айди
      // где target_list_id это массив айди
      getTargetListLocalById: async (target_list_id) => {
        useAuthStore.getState().setLoading(true);
        try {
          Promise.all(
            target_list_id.map((id) => {
              return fetchTargetListLocalById(id);
            })
          ).then((result) => {
            return set({ targetsLocal: result.map(({ data }) => data) as [] });
          });
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getMonitoredTarget: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredTarget(id);
          if (data) {
            set({ monitoredTarget: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addTargetList: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createTargetList(payload);
          if (data.success) {
            get().getTargets();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      removeTargetList: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await deleteTargetList(id);
          if (data.success) {
            get().getTargets();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      createLocalLists: async (id, navigate) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await generateLocalLists(id);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Таргет-лист успешно сгенерирован!');
            navigate(ROUTES.TARGETS_MED_REP);
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      clearLocalLists: async (id, navigate) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await resetLocalLists(id);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Таргет-лист расформирован!');
            navigate(ROUTES.TARGETS);
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
      changeTargetList: async (id, payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          await updateTargetList(id, payload);
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      // todo дубль тз useVisitsStore
      getDrugsForTarget: async () => {
        const params: IGetDrug = {
          order: 'name',
          orderBy: get().sorting.orderBy,
          name: get().drugsSearchForTarget,
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
              drugsForTarget: data.data,
            });
          }
        } catch (e) {
          console.error(e);
        }
      },
      setDrugsSearchForTarget: (value) => set({ drugsSearchForTarget: value }),
    })),
    {
      name: 'targets',
      partialize: (state) => ({
        sorting: state.sorting,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        monitoredTarget: state.monitoredTarget,
        monitoredTargetId: state.monitoredTargetId,
      }),
    }
  )
);
