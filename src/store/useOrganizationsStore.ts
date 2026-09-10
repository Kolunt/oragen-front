import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchOrganizations } from 'api';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import {
  fetchMonitoredOrganization,
  IGetOrganizations,
  OrderByType,
  OrganizationOrderType,
} from 'api/organizationApi';
import { persist } from 'zustand/middleware';
import { OrganizationType } from 'TypeInterface';

export interface IOrganization {
  id: string;
  name: string;
  number_of_employees: string;
  organization_type: OrganizationType;
  address: string;
  created_at: Date;
  updated_at: Date;
  phone?: string;
}

interface ISorting {
  order: OrganizationOrderType;
  orderBy: OrderByType;
}

export interface IWhere {
  address?: string;
  organization_type?: OrganizationType;
}

interface IOrganizationsFiltration {
  where: IWhere;
}

interface IOrganizationsStore {
  organizations: IOrganization[];
  currentPage: number;
  numberOfOrganizations: number;
  nextPageUrl: string | null;
  pageSize: number;
  getOrganizations: () => void;
  addOrganization: (newOrganization: IOrganization) => void;
  changeOrganization: (id: string, newOrganization: IOrganization) => void;
  removeOrganization: (id: string) => void;
  sorting: ISorting;
  setSorting: (sorting: ISorting) => void;
  filtration: IOrganizationsFiltration;
  setFiltration: (filtration: IOrganizationsFiltration) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  monitoredOrganizationId?: number;
  monitoredOrganization: IOrganization;
  setMonitoredOrganizationId: (newId: number) => void;
  getMonitoredOrganization: (id: number) => void;
  searchName: string;
  searchAddress: string;
  setSearchName: (value: string) => void;
  setSearchAddress: (value: string) => void;
  reset: () => void;
}

export const useOrganizationsStore = create<IOrganizationsStore>()(
  persist(
    immer((set, get) => ({
      organizations: [],
      monitoredOrganizationId: undefined,
      monitoredOrganization: {} as IOrganization,
      currentPage: 1,
      numberOfOrganizations: 0,
      nextPageUrl: null,
      pageSize: 10,
      searchName: '',
      searchAddress: '',
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      filtration: {
        where: {} as IWhere,
      } as IOrganizationsFiltration,
      getOrganizations: async () => {
        useAuthStore.getState().setLoading(true);

        const where = JSON.stringify({
          address: get().filtration.where.address,
          organization_type: get().filtration.where.organization_type,
        });

        const like = JSON.stringify({
          name: get().searchName,
          address: get().searchAddress,
        });

        const params: IGetOrganizations = {
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
          where,
          like,
        };

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        try {
          const { data } = await fetchOrganizations(payload, params);
          if (data) {
            set({
              organizations: data.data,
              nextPageUrl: data.next_page_url,
              currentPage: data.current_page,
              numberOfOrganizations: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addOrganization: (newOrganization) =>
        set((state) => {
          state.organizations.push(newOrganization);
        }),
      changeOrganization: (id, newData) =>
        set((state) => {
          state.organizations = state.organizations.map((item) =>
            item.id === id ? newData : item
          );
        }),
      removeOrganization: (id) =>
        set((state) => {
          state.organizations = state.organizations.filter(
            (item) => item.id !== id
          );
        }),
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setFiltration: (filtration) =>
        set((state) => {
          state.filtration.where.organization_type =
            filtration.where.organization_type;
          state.filtration.where.address = filtration.where.address;
        }),
      setCurrentPage: (currentPage) =>
        set((state) => {
          state.currentPage = currentPage;
        }),
      setPageSize: (pageSize) =>
        set((state) => {
          state.pageSize = pageSize;
        }),
      setMonitoredOrganizationId: (id) => {
        set({ monitoredOrganizationId: id });
      },
      getMonitoredOrganization: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredOrganization(id);

          if (data) {
            set({ monitoredOrganization: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setSearchName: (value) => set({ searchName: value }),
      setSearchAddress: (value) => set({ searchAddress: value }),
      reset: () => set({ organizations: [] }),
    })),
    {
      name: 'organizations',
      partialize: (state) => ({
        sorting: state.sorting,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        // filtration: state.filtration,
      }),
    }
  )
);
