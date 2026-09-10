import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  BrickOrderType,
  createBlockSource,
  createBrick,
  deleteBlock,
  deleteBlockSource,
  fetchBricks,
  fetchFreeSource,
  fetchMonitoredBlock,
  IBrick,
  ICreateBrickPayload,
  IFreeBrick,
  IGetBrick,
  IGetFreeSourcePayload,
} from 'api/brickApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { IOrganization } from 'store/useOrganizationsStore';
import { OrderByType } from 'api/contactApi';
import { useMessageStore } from 'components';

export interface IBrickSorting {
  order: BrickOrderType;
  orderBy: OrderByType;
}

interface IBrickStore {
  blocks: IBrick[];
  freeSource: IOrganization[] | IFreeBrick[];
  currentPage: number;
  pageSize: number;
  numberOfBlocks: number;
  search: string;
  sorting: IBrickSorting;
  setSorting: (sorting: IBrickSorting) => void;
  getBlocks: () => void;
  getFreeSource: (payload: IGetFreeSourcePayload) => void;
  addBlock: (payload: ICreateBrickPayload, redirect: () => void) => void;
  monitoredBlockId?: number;
  monitoredBlock: IBrick;
  setMonitoredBlockId: (newId: number) => void;
  getMonitoredBlock: (id: number | string) => void;
  addBlockSource: (blockId: number | string, sourceId: number | string) => void;
  removeBlockSource: (blockId: number, sourceId: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (value: string) => void;
  removeBlock: (id: number | string, redirect?: () => void) => void;
  reset: () => void;
}

export const useBrickStore = create<IBrickStore>()(
  persist(
    immer((set, get) => ({
      blocks: [],
      freeSource: [],
      currentPage: 1,
      pageSize: 10,
      numberOfBlocks: 0,
      search: '',
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      monitoredBlockId: undefined,
      monitoredBlock: {} as IBrick,
      getBlocks: async () => {
        useAuthStore.getState().setLoading(true);

        const like = JSON.stringify({
          name: get().search,
        });

        const params: IGetBrick = {
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
          like,
        };

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        try {
          const { data } = await fetchBricks(payload, params);
          if (data) {
            set({
              blocks: data.data,
              currentPage: data.current_page,
              numberOfBlocks: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getFreeSource: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchFreeSource(payload);
          if (data) {
            set({ freeSource: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addBlock: async (payload, redirect) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createBrick(payload);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Новый брик успешно создан!');
            redirect();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setMonitoredBlockId: (id) => {
        set({ monitoredBlockId: id });
      },
      getMonitoredBlock: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredBlock(id);

          if (data) {
            set({ monitoredBlock: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addBlockSource: async (blockId, sourceId) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createBlockSource(+blockId, +sourceId);
          if (data.success && get().monitoredBlockId) {
            get().getMonitoredBlock(get().monitoredBlockId as number);
            useMessageStore
              .getState()
              .showMessage('success', 'Новый брик успешно создан!');
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      removeBlockSource: async (blockId, sourceId) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await deleteBlockSource(blockId, sourceId);
          if (data.success) {
            if (data.success) {
              useMessageStore.getState().showMessage('success', 'Брик удален!');
              get().getMonitoredBlock(blockId);
            }
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setSearch: (value) => set({ search: value }),
      removeBlock: async (id, redirect) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await deleteBlock(id);
          if (data.success) {
            useMessageStore.getState().showMessage('success', 'Брик удален!');
            redirect && redirect();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      reset: () => set({ blocks: [] }),
    })),
    {
      name: 'bricks',
      partialize: (state) => ({
        sorting: state.sorting,
        // search: state.search,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }),
    }
  )
);
