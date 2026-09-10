import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { IFreeBrick } from 'api/brickApi';
import { IUser } from 'api/userApi';
import { IDrug } from 'api/drugsApi';
import { ISpecialty } from 'api/commonApi';
import {
  ICommonResponse,
  IGetResponse,
  IPaginationPayload,
  OrderByType,
} from 'api/contactApi';
import { ITargetLocal } from './targetListApiLocal';
import { OrganizationType } from 'TypeInterface';
import { IReport } from 'api/pollsApi';

export type TargetOrderType =
  | 'name'
  | 'started_at'
  | 'finished_at'
  | 'visits_count';

export interface ITarget {
  id: number;
  created_by: number;
  owner_id: number;
  name: string;
  drug_id: number;
  started_at: Date;
  finished_at: Date;
  visits_count: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  owner: Omit<IUser, 'roles'>;
  creator: IUser;
  drug: IDrug;
  positions: ISpecialty[];
  blocks: IFreeBrick[];
  poll_id: number;
  type: OrganizationType;
  loyality_range: ILoyaltyRange[];
  potential_range: ILoyaltyRange[];
  files: null | string[];
  report: IReport;
}

export interface IGetTargetList {
  order: TargetOrderType;
  orderBy: OrderByType;
  performer_id?: number;
}

export interface ILoyaltyRange {
  from: number;
  to: number;
  name: string;
  value?: number;
}

export interface ICreateTargetListPayload {
  name: string;
  drug_id: number;
  owner_id: number;
  started_at: string;
  finished_at: string;
  visits_count: number;
  blocks_list: number[];
  positions_list: number[];
  poll_id: number;
  type: OrganizationType;
  loyality_range?: ILoyaltyRange[];
  potential_range?: ILoyaltyRange[];
  files: string[];
}

export interface ICreateTargetListRequest extends IGeneralRequest {
  payload: string;
}

export interface IDeleteTargetList extends IGeneralRequest {
  id: number;
}

export const fetchTargetList = (
  payload: IPaginationPayload,
  params: IGetTargetList
) => {
  return authServiceClient.post<
    ITarget[],
    AxiosResponse<IGetResponse<ITarget>>,
    IGeneralRequest & IPaginationPayload & IGetTargetList
  >('', { type: 'getTargetList', ...payload, ...params });
};

export const fetchTargetListLocal = (
  payload: IPaginationPayload,
  params: IGetTargetList
) => {
  return authServiceClient.post<
    ITargetLocal[],
    AxiosResponse<IGetResponse<ITargetLocal>>,
    IGeneralRequest & IPaginationPayload & IGetTargetList
  >('', { type: 'getTargetListLocal', ...payload, ...params });
};

export const fetchTargetListLocalById = (id: number) => {
  return authServiceClient.post<
    ITargetLocal[],
    AxiosResponse<IGetResponse<ITargetLocal>>
  >('', { type: 'getTargetListLocal', id });
};

export const fetchMonitoredTarget = (id: number) => {
  return authServiceClient.post<
    ITarget,
    AxiosResponse<ITarget>,
    IGeneralRequest & { id: number }
  >('', { type: 'getTargetList', id });
};

export const createTargetList = (payload: ICreateTargetListPayload) => {
  const data = {
    type: 'createTargetList',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateTargetListRequest
  >('', data);
};

export const deleteTargetList = (id: number) => {
  const data = {
    type: 'deleteTargetList',
    id,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IDeleteTargetList
  >('', data);
};

export const generateLocalLists = (id: number) => {
  const data = {
    type: 'generateLocalLists',
    id,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IDeleteTargetList
  >('', data);
};

export const resetLocalLists = (id: number) => {
  const data = {
    type: 'resetLocalLists',
    id,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IDeleteTargetList
  >('', data);
};

export const updateTargetList = (
  id: number,
  payload: ICreateTargetListPayload
) => {
  const data = {
    type: 'updateTargetList',
    id,
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateTargetListRequest
  >('', data);
};
