import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createContact, fetchContacts } from 'api';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import {
  ContactOrderType,
  fetchMonitoredContact,
  IGetContact,
  OrderByType,
} from 'api/contactApi';
import { persist } from 'zustand/middleware';
import { OrganizationType } from 'TypeInterface';

export interface ICreateContactPayload {
  fullName: string;
  company: string;
  phone: string;
  position: string;
  organizationType: OrganizationType;
  address: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface IContact {
  id: string;
  full_name: string;
  company: string;
  phone: string;
  position: string;
  organization_type: OrganizationType;
  address: string;
  email: string;
  created_at: Date | string;
  updated_at: Date;
}

export interface ISorting {
  order: ContactOrderType;
  orderBy: OrderByType;
}

export interface IWhere {
  company?: string;
  organization_type?: OrganizationType;
  position?: string;
}

interface IContactFiltration {
  where: IWhere;
  drugId?: number;
}

interface IContactsStore {
  contacts: IContact[];
  currentPage: number;
  numberOfContacts: number;
  nextPageUrl: string | null;
  pageSize: number;
  getContacts: () => void;
  addContact: (newContact: ICreateContactPayload) => void;
  removeContact: (id: string) => void;
  changeContact: (id: string, newData: IContact) => void;
  sorting: ISorting;
  setSorting: (sorting: ISorting) => void;
  filtration: IContactFiltration;
  setFiltration: (filtration: IContactFiltration) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  monitoredContactId?: number;
  monitoredContact: IContact;
  setMonitoredContactId: (newId: number) => void;
  getMonitoredContact: (id: number) => void;
  searchName: string;
  searchAddress: string;
  setSearchName: (value: string) => void;
  setSearchAddress: (value: string) => void;
  reset: () => void;
}

export const useContactsStore = create<IContactsStore>()(
  persist(
    immer((set, get) => ({
      contacts: [],
      monitoredContactId: undefined,
      monitoredContact: {} as IContact,
      numberOfContacts: 0,
      currentPage: 1,
      nextPageUrl: null,
      pageSize: 10,
      searchName: '',
      searchAddress: '',
      sorting: {
        order: 'full_name',
        orderBy: 'asc',
      },
      filtration: {
        where: {} as IWhere,
      } as IContactFiltration,
      getContacts: async () => {
        useAuthStore.getState().setLoading(true);

        const where = JSON.stringify({
          company: get().filtration.where.company,
          organization_type: get().filtration.where.organization_type,
          position: get().filtration.where.position,
        });
        const like = JSON.stringify({
          full_name: get().searchName,
          address: get().searchAddress,
        });

        const params: IGetContact = {
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
          where,
          like,
          drug_id: get().filtration.drugId,
        };

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        try {
          const { data } = await fetchContacts(payload, params);

          if (data) {
            set({
              contacts: data.data,
              nextPageUrl: data.next_page_url,
              currentPage: data.current_page,
              numberOfContacts: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addContact: async (newContact) => {
        useAuthStore.getState().setLoading(true);
        try {
          await createContact(newContact);
          useContactsStore.getState().getContacts();
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      removeContact: (id) =>
        set((state) => {
          state.contacts = state.contacts.filter((item) => item.id !== id);
        }),
      changeContact: (id, newData) =>
        set((state) => {
          state.contacts = state.contacts.map((item) =>
            item.id === id ? newData : item
          );
        }),
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setFiltration: (filtration) =>
        set((state) => {
          state.filtration.where.company = filtration.where.company;
          state.filtration.where.organization_type =
            filtration.where.organization_type;
          state.filtration.where.position = filtration.where.position;
          state.filtration.drugId = filtration.drugId;
        }),
      setCurrentPage: (currentPage) =>
        set((state) => {
          state.currentPage = currentPage;
        }),
      setPageSize: (pageSize) =>
        set((state) => {
          state.pageSize = pageSize;
        }),
      setMonitoredContactId: (id) => {
        set({ monitoredContactId: id });
      },
      getMonitoredContact: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredContact(id);

          if (data) {
            set({ monitoredContact: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setSearchName: (value) => set({ searchName: value }),
      setSearchAddress: (value) => set({ searchAddress: value }),
      reset: () => set({ contacts: [] }),
    })),
    {
      name: 'contact',
      partialize: (state) => ({
        sorting: state.sorting,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        // filtration: state.filtration,
        monitoredContactId: state.monitoredContactId,
      }),
    }
  )
);
