import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from '../pages/MainPage/useAuthStore';
import {
  createTask,
  fetchMonitoredTask,
  fetchTasks,
  ICreateTaskPayload,
  IGetTask,
  IPagination,
  IPayloadUpdateTaskFinishedDate,
  IPayloadUpdateTaskStatus,
  TaskMode,
  TasksOrderType,
  TaskStatus,
  updateTaskFinishedDate,
  updateTaskStatus,
} from 'api/tasksApi';
import { persist } from 'zustand/middleware';
import { OrderByType } from 'api/contactApi';
import { IUser } from 'api/userApi';
import { useMessageStore } from 'components';
import { ROUTES } from 'enums';

export interface ISortingTasks {
  order: TasksOrderType;
  orderBy: OrderByType;
}

export interface IUpdatedTask {
  finishedDate?: Date;
  taskStatus?: TaskStatus;
  taskPerformer?: number;
}

export interface IWatcher {
  id: 3;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: boolean | null;
  signup_ip_address: boolean | null;
  signup_confirmation_ip_address: boolean | null;
  signup_sm_ip_address: boolean | null;
  admin_ip_address: string;
  updated_ip_address: string;
  deleted_ip_address: boolean | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: boolean | null;
  client_portal: number;
}

export interface ISubTask {
  id: number;
  owner_id: number;
  performer_id: number;
  status: TaskStatus;
  name: string;
  description: string;
  started_at: Date;
  finished_at: Date;
  attachments: string | null;
  parent_project_id: number;
  parent_task_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ITask {
  id: number;
  owner_id: number;
  performer_id: number;
  status: TaskStatus;
  name: string;
  description: string;
  started_at: Date;
  finished_at: Date;
  attachments: string | null;
  parent_project_id: number | null;
  parent_task_id: number | null;
  created_at: Date;
  updated_at: Date;
  watchers_list: IWatcher[];
  sub_tasks: ISubTask[];
  creator: IUser;
  performer: IUser;
}

interface ITasksStore {
  tasks: ITask[];
  monitoredTaskId?: number;
  monitoredSubTaskId?: number;
  monitoredTask: ITask;
  currentPage: number;
  numberOfTasks: number;
  nextPageUrl: string | null;
  pageSize: number;
  isSubTaskCreate: boolean;
  setMonitoredTaskId: (newId: number) => void;
  setMonitoredSubTaskId: (newId: number) => void;
  getMonitoredTask: (id: number) => void;
  getTasks: () => void;
  changeTaskFinishedDate: (payload: IPayloadUpdateTaskFinishedDate) => void;
  changeTaskStatus: (payload: IPayloadUpdateTaskStatus) => void;
  updatedTask: IUpdatedTask;
  setUpdatedTask: (payload: IUpdatedTask) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  addTask: (payload: ICreateTaskPayload, redirect?: () => void) => void;
  sorting: ISortingTasks;
  setSorting: (sorting: ISortingTasks) => void;
  searchField: string;
  setSearchField: (newSearchField: string) => void;
  taskMode: TaskMode;
  setTaskMode: (newValue: TaskMode) => void;
  parentTask: ITask;
  setParentTask: (task: ITask) => void;
}

export const useTasksStore = create<ITasksStore>()(
  persist(
    immer((set, get) => ({
      tasks: [],
      parentTask: {} as ITask,
      monitoredTaskId: undefined,
      monitoredSubTaskId: undefined,
      monitoredTask: {} as ITask,
      numberOfTasks: 0,
      currentPage: 1,
      nextPageUrl: null,
      pageSize: 10,
      updatedTask: {} as IUpdatedTask,
      searchField: '',
      isSubTaskCreate: false,
      taskMode: 'performed',
      sorting: {
        order: 'name',
        orderBy: 'asc',
      },
      getTasks: async () => {
        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        const like = JSON.stringify({
          name: get().searchField,
        });

        const params: IGetTask = {
          mode: get().taskMode,
          showSubTasks: false,
          order: get().sorting.order,
          orderBy: get().sorting.orderBy,
          like,
        };

        try {
          const { data } = await fetchTasks(payload, params);

          if (data) {
            set({
              tasks: data.data,
              nextPageUrl: data.next_page_url,
              currentPage: data.current_page,
              numberOfTasks: data.total,
            });
          }
        } catch (e) {
          console.error(e);
        }
      },
      setMonitoredTaskId: (id) => {
        set({ monitoredTaskId: id });
      },
      setMonitoredSubTaskId: (id) => {
        set({ monitoredSubTaskId: id });
      },
      getMonitoredTask: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchMonitoredTask(id);

          if (data) {
            set({ monitoredTask: data, isSubTaskCreate: false });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      changeTaskFinishedDate: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          await updateTaskFinishedDate(payload);
        } catch (e) {
          console.error(e);
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      changeTaskStatus: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          await updateTaskStatus(payload);
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setUpdatedTask: (payload) => {
        set({ updatedTask: payload });
      },
      setCurrentPage: (currentPage) =>
        set((state) => {
          state.currentPage = currentPage;
        }),
      setPageSize: (pageSize) =>
        set((state) => {
          state.pageSize = pageSize;
        }),
      addTask: async (payload, redirect) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createTask(payload);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Задача успешно создана!');
            redirect && redirect();
            set({ isSubTaskCreate: true });
          }
        } catch (e) {
          console.error(e);
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setSorting: ({ order, orderBy }) =>
        set((state) => {
          state.sorting.order = order;
          state.sorting.orderBy = orderBy;
        }),
      setSearchField: (newSearchField) => {
        set({ searchField: newSearchField });
      },
      setTaskMode: (newValue) => {
        set({ taskMode: newValue });
      },
      setParentTask: (task) => {
        set({ parentTask: task });
      },
    })),
    {
      name: 'task',
      partialize: (state) => ({
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        sorting: state.sorting,
        taskMode: state.taskMode,
        monitoredTaskId: state.monitoredTaskId,
        monitoredSubTaskId: state.monitoredSubTaskId,
        parentTask: state.parentTask,
      }),
    }
  )
);
