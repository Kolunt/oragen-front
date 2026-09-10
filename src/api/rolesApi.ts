import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { IGetResponse, IPaginationPayload, OrderByType } from 'api/contactApi';
import { IUser, UserOrderType } from 'api/userApi';

export type RoleTypeId = 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IRole {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  level: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: boolean | null;
}

export interface IGetResponseRoles {
  roles: IRole[];
  success: boolean;
}

export interface IGetRoleUsers {
  role_id?: number | string;
  order?: UserOrderType;
  orderBy?: OrderByType;
  where?: string;
  like?: string;
}

export const fetchRoles = () => {
  return authServiceClient.post<
    IRole[],
    AxiosResponse<IGetResponseRoles>,
    IGeneralRequest
  >('', { type: 'getRoles' });
};

export const fetchRoleUsers = (
  payload: IPaginationPayload,
  params?: IGetRoleUsers
) => {
  return authServiceClient.post<
    IUser[],
    AxiosResponse<IGetResponse<IUser>>,
    IGetRoleUsers & IGeneralRequest
  >('', { type: 'getRoleUsers', ...payload, ...params });
};
