import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { ITask } from '../store/useTasksStore';
import { IGetResponse, OrderByType } from './contactApi';
import { TaskStatusTypes } from '../enums/TaskStatusTypes';

export type TasksOrderType =
  | 'name'
  | 'finished_at'
  | 'started_at'
  | 'created_at'
  | 'creator';

export interface IPayloadUpdateTaskFinishedDate {
  id: number;
  finished_at: Date;
}

export interface IPayloadUpdateTaskStatus {
  id: number;
  status: TaskStatus;
}

export type TaskMode = 'created' | 'watched' | 'performed';

export type TaskStatus =
  | TaskStatusTypes.INPROGRESS
  | TaskStatusTypes.TODO
  | TaskStatusTypes.DONE
  | TaskStatusTypes.CANCELLED;

export interface IGetTask {
  id?: number;
  mode?: TaskMode;
  status?: TaskStatus;
  showSubTasks?: boolean;
  order?: TasksOrderType;
  orderBy?: OrderByType;
  like?: string;
  started_after?: string;
  started_before?: string;
}

export interface IPagination {
  paginationMethod: string;
  page: number;
  pageSize: number;
}

export interface ICreateTaskRequest extends IGeneralRequest {
  payload: string;
}

export interface ICreateTaskResponse {
  id: number;
  success: boolean;
}

export interface ICreateTaskPayload {
  performer_id: number;
  parent_task_id?: number;
  parent_project_id?: number;
  name: string;
  description: string;
  started_at: string;
  finished_at: string;
  watchers_list: number[];
}

export const fetchTasks = (payload: IPagination, params?: IGetTask) => {
  return authServiceClient.post<
    ITask[],
    AxiosResponse<IGetResponse<ITask>>,
    IGetTask & IGeneralRequest & IPagination
  >('', { type: 'getTask', ...payload, ...params });
};

export const fetchMonitoredTask = (id: number) => {
  return authServiceClient.post<
    ITask,
    AxiosResponse<ITask>,
    IGeneralRequest & { id: number }
  >('', { type: 'getTask', id });
};

export const updateTaskFinishedDate = (
  payload: IPayloadUpdateTaskFinishedDate
) => {
  return authServiceClient.post<
    ICreateTaskResponse,
    AxiosResponse<ICreateTaskResponse>,
    IGeneralRequest & IPayloadUpdateTaskFinishedDate
  >('', { type: 'updateTaskFinishedDate', ...payload });
};

export const updateTaskStatus = (payload: IPayloadUpdateTaskStatus) => {
  return authServiceClient.post<
    ICreateTaskResponse,
    AxiosResponse<ICreateTaskResponse>,
    IGeneralRequest & IPayloadUpdateTaskStatus
  >('', { type: 'updateTaskStatus', ...payload });
};

export const createTask = (payload: ICreateTaskPayload) => {
  const data = {
    type: 'createTask',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICreateTaskResponse,
    AxiosResponse<ICreateTaskResponse>,
    ICreateTaskRequest
  >('', data);
};
