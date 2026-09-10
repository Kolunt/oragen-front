import { AxiosResponse } from 'axios';
import { authServiceClient } from 'config/authServiceClient';
import { IGeneralRequest } from 'api/authApi';
import {
  ICommonResponse,
  IPaginationPayload,
  IGetResponse,
  OrderByType,
} from 'api/contactApi';

export type DrugOrderType = 'name' | 'status';

export type DrugOrderByType = 'orderBy' | 'orderByDesc';

export interface IDrugSorting {
  order: DrugOrderType;
  orderBy: OrderByType;
}

export interface IDrug {
  id: number;
  name: string;
  status: boolean;
  loyality?: number;
}

export interface IGetDrug {
  name?: string;
  mode?: string;
  order?: DrugOrderType;
  orderBy?: OrderByType;
  where?: string;
  status?: number;
}

export interface ICreateDrugRequest extends IGeneralRequest {
  name: string;
}

export type NumberStatusType = 0 | 1;

export interface IUpdateDrugStatusPayload {
  id: number;
  status: NumberStatusType;
}

export interface IUpdateDrugStatusRequest {
  type: string;
  id: number;
  status: NumberStatusType;
}

export const fetchDrugs = (payload: IPaginationPayload, params?: IGetDrug) => {
  return authServiceClient.post<
    IDrug[],
    AxiosResponse<IGetResponse<IDrug>>,
    IGetDrug & IGeneralRequest & IPaginationPayload
  >('', { type: 'getDrugs', ...payload, ...params });
};

export const fetchDrugsBySearch = (search: string) => {
  return authServiceClient.post<
    IDrug[],
    AxiosResponse<IDrug[]>,
    IGeneralRequest & { name: string; status: number }
  >('', { type: 'getDrugs', name: search, status: 1 });
};

export const createDrug = (name: string) => {
  const data = {
    type: 'createDrug',
    name,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateDrugRequest
  >('', data);
};

export const updateDrugStatus = (payload: IUpdateDrugStatusPayload) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateDrugStatusRequest
  >('', { type: 'updateDrugStatus', ...payload });
};
