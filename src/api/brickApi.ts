import { IUser } from 'api/userApi';
import { IOrganization } from 'store/useOrganizationsStore';
import { authServiceClient } from 'config/authServiceClient';
import {
  ICommonResponse,
  IGetResponse,
  IPaginationPayload,
  OrderByType,
} from 'api/contactApi';
import { IGeneralRequest } from 'api/authApi';
import { AxiosResponse } from 'axios';

export type BrickOrderType = 'name' | 'type';

export type LevelBrickType = 'low' | 'medium' | 'high';

export type BrickSourcesMediumListType = 'low';

export interface IBrickSourcesMediumList {
  id: number;
  created_by: number;
  owner_id: number;
  name: string;
  type: BrickSourcesMediumListType;
  created_at: Date;
  updated_at: Date;
}

export type BrickSourcesHighListType = 'medium' | 'high';

export interface IBrickSourcesHighList {
  id: number;
  created_by: number;
  owner_id: number;
  name: string;
  type: BrickSourcesHighListType;
  created_at: Date;
  updated_at: Date;
}

export interface IBrick {
  id: number;
  created_by: number;
  owner_id: number;
  name: string;
  type: LevelBrickType;
  created_at: Date;
  updated_at: Date;
  owner: IUser;
  creator: IUser;
  sources_low_list: IOrganization[];
  sources_medium_list: IBrickSourcesMediumList[];
  sources_high_list: IBrickSourcesHighList[];
  sources_high_high_list: any[];
}

export interface ICreateBrickPayload {
  name: string;
  type: LevelBrickType;
  owner_id: number;
  sources_list: number[];
}

export interface IFreeBrick {
  id: number;
  created_by: number;
  owner_id: number;
  name: string;
  type: LevelBrickType;
  created_at: Date;
  updated_at: Date;
}

export interface IGetBrick {
  id?: number;
  order?: BrickOrderType;
  orderBy?: OrderByType;
  like?: string;
}

export interface IGetFreeSourcePayload {
  mode: LevelBrickType;
  name?: string;
  address?: string;
}

export interface ICreateBrickRequest extends IGeneralRequest {
  payload: string;
}

export interface IGetFreeSourceRequest extends IGeneralRequest {
  mode: LevelBrickType;
}

export interface IDeleteBlock extends IGeneralRequest {
  id: number | string;
}

export const fetchBricks = (
  payload: IPaginationPayload,
  params?: IGetBrick
) => {
  return authServiceClient.post<
    IBrick[],
    AxiosResponse<IGetResponse<IBrick>>,
    IGeneralRequest
  >('', { type: 'getBlocks', ...payload, ...params });
};

export const fetchBricksBySearch = (search: string) => {
  return authServiceClient.post<
    IBrick[],
    AxiosResponse<IGetResponse<IBrick>>,
    IGeneralRequest & { like: string }
  >('', { type: 'getBlocks', like: search });
};

export const createBrick = (payload: ICreateBrickPayload) => {
  const data = {
    type: 'createBlock',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateBrickRequest
  >('', data);
};

export const fetchFreeSource = (payload: IGetFreeSourcePayload) => {
  return authServiceClient.post<
    IOrganization[] | IFreeBrick[],
    AxiosResponse<IOrganization[] | IFreeBrick[]>,
    IGetFreeSourceRequest
  >('', { type: 'getFreeSource', ...payload });
};

export const deleteBlock = (id: number | string) => {
  const data = {
    type: 'deleteBlock',
    id,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IDeleteBlock
  >('', data);
};

export const fetchMonitoredBlock = (id: number | string) => {
  return authServiceClient.post<
    IBrick,
    AxiosResponse<IBrick>,
    IGeneralRequest & { id: number | string }
  >('', { type: 'getBlocks', id });
};

export const createBlockSource = (block_id: number, source_id: number) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest & { block_id: number; source_id: number }
  >('', { type: 'addBlockSource', block_id, source_id });
};

export const deleteBlockSource = (block_id: number, source_id: number) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest & { block_id: number; source_id: number }
  >('', { type: 'deleteBlockSource', block_id, source_id });
};
