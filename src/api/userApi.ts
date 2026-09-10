import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import {
  ICommonResponse,
  IGetResponse,
  IPaginationPayload,
  OrderByType,
} from 'api/contactApi';
import { RoleTypeId } from 'api/rolesApi';
import { RoleType } from 'enums/RoleTypes';

export type UserOrderType = 'name' | 'first_name' | 'last_name' | 'email';

export interface ISortingUser {
  order: UserOrderType;
  orderBy: OrderByType;
}

export interface IPivot {
  user_id: number;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IRoles {
  id: number;
  name: RoleType;
  slug: string;
  description: string;
  level: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: boolean | null;
  pivot: IPivot;
}

export interface IUser {
  id: number;
  name: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  email: string;
  phone: number | null;
  email_verified_at: boolean | null;
  signup_ip_address: string;
  signup_confirmation_ip_address: string;
  signup_sm_ip_address: boolean | null;
  admin_ip_address: boolean | null;
  updated_ip_address: boolean | null;
  deleted_ip_address: boolean | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: boolean | null;
  client_portal: number;
  roles: IRoles[];
}

export interface IGetUser {
  id?: number | string;
  order?: UserOrderType;
  orderBy?: OrderByType;
  where?: string;
  like?: string;
}

export interface ICreateUserRequest extends IGeneralRequest {
  payload: string;
}

export interface IUpdateUserRequest extends IGeneralRequest {
  payload: string;
}

export interface IFetchUser extends IGeneralRequest {
  id: number;
}

export interface IFetchRoleUser extends IGeneralRequest {
  role_id: number;
}

export interface ICreateUserPayload {
  email: string;
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: RoleTypeId;
  password: string;
  phone: number;
}

export interface IUpdateUserPayload {
  name: string;
  first_name: string;
  last_name: string;
  role: RoleTypeId;
  phone: number;
  middle_name: string;
  password?: string;
}

export const fetchMe = () => {
  return authServiceClient.post<IUser, AxiosResponse<IUser>, IGeneralRequest>(
    '',
    { type: 'getMe' }
  );
};

export const fetchUsers = (payload: IPaginationPayload, params?: IGetUser) => {
  return authServiceClient.post<
    IUser[],
    AxiosResponse<IGetResponse<IUser>>,
    IGetUser & IGeneralRequest
  >('', { type: 'getUser', ...payload, ...params });
};

export const fetchUser = (id: number) => {
  return authServiceClient.post<IUser, AxiosResponse<IUser>, IFetchUser>('', {
    type: 'getUser',
    id,
  });
};

export const fetchUsersBySearch = (search: string) => {
  return authServiceClient.post<
    IUser[],
    AxiosResponse<IGetResponse<IUser>>,
    IGeneralRequest & { like: string }
  >('', { type: 'getUser', like: search });
};

export const fetchRoleUser = (id: number) => {
  return authServiceClient.post<
    IUser[],
    AxiosResponse<IGetResponse<IUser>>,
    IFetchRoleUser
  >('', { type: 'getRoleUsers', role_id: id });
};

export const createUser = (payload: ICreateUserPayload) => {
  const data = {
    type: 'createUser',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateUserRequest
  >('', data);
};

export const updateUser = (id: number, payload: IUpdateUserPayload) => {
  const data = {
    type: 'updateUser',
    id,
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateUserRequest
  >('', data);
};
