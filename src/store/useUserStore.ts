import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchMe } from 'api';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import {
  createUser,
  fetchRoleUser,
  fetchUser,
  fetchUsers,
  ICreateUserPayload,
  IGetUser,
  ISortingUser,
  IUpdateUserPayload,
  IUser,
  updateUser,
} from 'api/userApi';
import { persist } from 'zustand/middleware';
import { RoleTypeId } from 'api/rolesApi';

interface IUserStore {
  me: IUser;
  users: IUser[];
  roleUsers: IUser[];
  setMe: (user: IUser) => void;
  getMe: () => void;
  getUsers: (search?: string) => void;
  currentPage: number;
  numberOfUsers: number;
  pageSize: number;
  sorting: ISortingUser;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setSorting: (sorting: ISortingUser) => void;
  search: string;
  setSearch: (value: string) => void;
  addUser: (newUser: ICreateUserPayload) => void;
  changeUser: (id: number, payload: IUpdateUserPayload) => void;
  monitoredUser: IUser;
  monitoredUserId?: number;
  getMonitoredUser: (id: number) => void;
  setMonitoredUserId: (newId: number) => void;
  getRoleUsers: (roleId: RoleTypeId) => void;
  reset: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    immer((set, get) => ({
      me: {} as IUser,
      users: [],
      roleUsers: [],
      monitoredUser: {} as IUser,
      monitoredUserId: undefined,
      numberOfUsers: 0,
      currentPage: 1,
      pageSize: 10,
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      search: '',
      setMe: (user) => set({ me: user }),
      getMe: async () => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMe();
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getUsers: async (search) => {
        useAuthStore.getState().setLoading(true);
        const like = JSON.stringify({
          name: search || get().search,
        });

        const params: IGetUser = {
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
          const { data } = await fetchUsers(payload, params);

          if (data) {
            set({
              users: data.data,
              currentPage: data.current_page,
              numberOfUsers: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setCurrentPage: (currentPage) =>
        set((state) => {
          state.currentPage = currentPage;
        }),
      setPageSize: (pageSize) =>
        set((state) => {
          state.pageSize = pageSize;
        }),
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setSearch: (value) => set({ search: value }),
      addUser: async (newUser) => {
        useAuthStore.getState().setLoading(true);
        try {
          await createUser(newUser);
          get().getUsers();
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      changeUser: async (id, payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          await updateUser(id, payload);
          get().getUsers();
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getMonitoredUser: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchUser(id);
          if (data) {
            set({ monitoredUser: data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setMonitoredUserId: (id) => {
        set({ monitoredUserId: id });
      },
      getRoleUsers: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchRoleUser(id);
          if (data) {
            set({ roleUsers: data.data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      reset: () => set({ users: [] }),
    })),
    {
      name: 'users',
      partialize: (state) => ({
        me: state.me,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        sorting: state.sorting,
        monitoredUser: state.monitoredUser,
        monitoredUserId: state.monitoredUserId,
      }),
    }
  )
);
