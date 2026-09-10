import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import {
  createDrug,
  fetchDrugs,
  IDrug,
  IDrugSorting,
  IGetDrug,
  IUpdateDrugStatusPayload,
  updateDrugStatus,
} from 'api/drugsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface IDrugsStore {
  drugs: IDrug[];
  getDrugs: () => void;
  currentPage: number;
  pageSize: number;
  numberOfDrugs: number;
  search: string;
  sorting: IDrugSorting;
  setSorting: (sorting: IDrugSorting) => void;
  addDrug: (newDrug: string) => void;
  changeDrugStatus: (payload: IUpdateDrugStatusPayload) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (value: string) => void;
  reset: () => void;
}

export const useDrugsStore = create<IDrugsStore>()(
  persist(
    immer((set, get) => ({
      drugs: [],
      currentPage: 1,
      pageSize: 10,
      numberOfDrugs: 0,
      search: '',
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      getDrugs: async () => {
        useAuthStore.getState().setLoading(true);

        const params: IGetDrug = {
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
          name: get().search,
          mode: 'paginate',
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
              drugs: data.data,
              currentPage: data.current_page,
              numberOfDrugs: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addDrug: async (newDrug) => {
        const { data } = await createDrug(newDrug);
        if (data.success) {
          get().getDrugs();
        }
      },
      changeDrugStatus: async (payload) => {
        const { data } = await updateDrugStatus(payload);
        if (data.success) {
          get().getDrugs();
        }
      },
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
      setSearch: (value) => set({ search: value }),
      reset: () => set({ drugs: [], search: '' }),
    })),
    {
      name: 'drugs',
      partialize: (state) => ({
        sorting: state.sorting,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        // search: state.search,
      }),
    }
  )
);
