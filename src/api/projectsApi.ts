import { authServiceClient } from '../config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGetResponse, OrderByType } from './contactApi';
import { IGeneralRequest } from './authApi';
import { IPagination, TasksOrderType } from './tasksApi';
import { IProject } from 'store/useProjectsStore';

export interface IGetProject {
  id?: number;
  displayMode?: string;
  order?: TasksOrderType;
  orderBy?: OrderByType;
  like?: string;
}

export interface ICreateProjectResponse {
  id: number;
  success: boolean;
}

export interface ICreateProjectRequest extends IGeneralRequest {
  payload: string;
}

export interface ICreateProjectPayload {
  name: string;
  description: string;
  watchers_list: number[];
}

export const fetchProjects = (payload: IPagination, params?: IGetProject) => {
  return authServiceClient.post<
    IProject[],
    AxiosResponse<IGetResponse<IProject>>,
    IGetProject & IGeneralRequest & IPagination
  >('', { type: 'getProject', ...payload, ...params });
};

export const fetchMonitoredProject = (id: number) => {
  return authServiceClient.post<
    IProject,
    AxiosResponse<IProject>,
    IGeneralRequest & { id: number; displayMode: string }
  >('', { type: 'getProject', id, displayMode: 'full' });
};

export const createProject = (payload: ICreateProjectPayload) => {
  const data = {
    type: 'createProject',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICreateProjectResponse,
    AxiosResponse<ICreateProjectResponse>,
    ICreateProjectRequest
  >('', data);
};
