import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { fetchVisits, IFetchVisitsRequest, IVisit } from 'api/visitsApi';
import { useUserStore } from 'store/useUserStore';

interface IFreeVisitsStore {
  visits: IVisit[];
  currentPage: number;
  pageSize: number;
  numberOfVisits: number;
  getVisits: () => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useFreeVisitsStore = create<IFreeVisitsStore>()(
  persist(
    immer((set, get) => ({
      visits: [],
      currentPage: 1,
      pageSize: 10,
      numberOfVisits: 0,
      getVisits: async () => {
        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        const params = {
          order: 'contact_id',
          orderBy: 'asc',
          target_list_id: 'null',
          performer_id: useUserStore.getState().me.id,
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
        } catch (e) {
          console.error(e);
        }
      },
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
    })),
    {
      name: 'free-visits',
    }
  )
);
