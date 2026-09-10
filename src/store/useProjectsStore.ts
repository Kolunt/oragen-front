import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ISortingTasks, ITask } from './useTasksStore';
import { useAuthStore } from '../pages/MainPage/useAuthStore';
import {
  createProject,
  fetchMonitoredProject,
  fetchProjects,
  ICreateProjectPayload,
  IGetProject,
} from 'api/projectsApi';
import { persist } from 'zustand/middleware';
import { IUser } from 'api/userApi';
import { createTask, ICreateTaskPayload } from 'api/tasksApi';
import { useMessageStore } from 'components';

export interface IProject {
  id: number;
  owner_id: number;
  name: string;
  description: string;
  started_at: Date;
  finished_at: Date;
  created_at: Date;
  updated_at: Date;
  creator: IUser;
  tasks_list_full_info: ITask[];
}

interface IProjectsStore {
  projects: IProject[];
  monitoredProjectId?: number;
  monitoredProject: IProject;
  currentPage: number;
  numberOfProjects: number;
  nextPageUrl: string | null;
  pageSize: number;
  setMonitoredProjectId: (newId: number) => void;
  getMonitoredProject: (id: number) => void;
  getProjects: (id?: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  addProject: (payload: ICreateProjectPayload, redirect?: () => void) => void;
  searchField: string;
  setSearchField: (newSearchField: string) => void;
  sorting: ISortingTasks;
  setSorting: (sorting: ISortingTasks) => void;
}

export const useProjectsStore = create<IProjectsStore>()(
  persist(
    immer((set, get) => ({
      projects: [],
      monitoredProjectId: undefined,
      monitoredProject: {} as IProject,
      numberOfProjects: 0,
      currentPage: 1,
      nextPageUrl: null,
      pageSize: 10,
      searchField: '',
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      getProjects: async (id) => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        const like = JSON.stringify({
          name: get().searchField,
        });

        const params: IGetProject = {
          id,
          displayMode: 'full',
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
          like,
        };

        try {
          const { data } = await fetchProjects(payload, params);

          if (data) {
            set({
              projects: data.data,
              nextPageUrl: data.next_page_url,
              currentPage: data.current_page,
              numberOfProjects: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setMonitoredProjectId: (id) => {
        set({ monitoredProjectId: id });
      },
      getMonitoredProject: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredProject(id);
          if (data) {
            set({ monitoredProject: data });
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
      addProject: async (payload, redirect) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createProject(payload);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Проект успешно создан!');
            redirect && redirect();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setSearchField: (newSearchField) => {
        set({ searchField: newSearchField });
      },
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
    })),
    {
      name: 'project',
      partialize: (state) => ({
        sorting: state.sorting,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        monitoredProjectId: state.monitoredProjectId,
      }),
    }
  )
);
