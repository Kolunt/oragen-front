import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { ICreateEventPayload, IEvent } from '../store/useEventsStore';
import { IPagination } from 'api/tasksApi';
import { IGetResponse } from 'api/contactApi';

export interface IGetEventResponse {
  data: IEvent[];
  path: string;
  per_page: number;
  next_page_url: null;
  prev_page_url: null;
}

export interface IGetEvent {
  id?: number;
  owner_id?: number;
  like?: string;
  started_after?: string;
  started_before?: string;
}

export interface IPlusDurationEvent {
  id: number;
  duration: number;
}

export interface ICreateEventRequest extends IGeneralRequest {
  payload: string;
}

export interface ICreateEventResponse {
  id: number;
  success: boolean;
}

export const fetchEvents = (payload?: IPagination, params?: IGetEvent) => {
  return authServiceClient.post<
    IEvent[],
    AxiosResponse<IGetResponse<IEvent>>,
    IGetEvent & IGeneralRequest
  >('', { type: 'getVideocall', ...payload, ...params });
};

export const createEvent = (payload: ICreateEventPayload) => {
  const data = {
    type: 'createVideocall',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICreateEventResponse,
    AxiosResponse<ICreateEventResponse>,
    ICreateEventRequest
  >('', data);
};

export const deleteEvent = (id: number) => {
  return authServiceClient.post<
    ICreateEventResponse,
    AxiosResponse<ICreateEventResponse>,
    { id: number } & IGeneralRequest
  >('', { type: 'deleteVideocall', id });
};

export const fetchForceStart = (id: number) => {
  return authServiceClient.post<
    ICreateEventResponse,
    AxiosResponse<ICreateEventResponse>,
    { id: number } & IGeneralRequest
  >('', { type: 'forceStartVideocall', id });
};

export const fetchForceFinish = (id: number) => {
  return authServiceClient.post<
    ICreateEventResponse,
    AxiosResponse<ICreateEventResponse>,
    { id: number } & IGeneralRequest
  >('', { type: 'forceFinishVideocall', id });
};

export const fetchPlusDuration = (params: IPlusDurationEvent) => {
  return authServiceClient.post<
    ICreateEventResponse,
    AxiosResponse<ICreateEventResponse>,
    IPlusDurationEvent & IGeneralRequest
  >('', { type: 'plusDurationVideocall', ...params });
};
