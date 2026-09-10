import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IContact, ICreateContactPayload } from 'store/useContactsStore';
import { IGeneralRequest } from 'api/authApi';
import { IUser } from 'api/userApi';
import { IDrug } from './drugsApi';

export type ContactOrderType =
  | 'full_name'
  | 'company'
  | 'phone'
  | 'position'
  | 'organization_type'
  | 'address'
  | 'email'
  | 'name'
  | 'representative'
  | 'created_at';

export type OrderByType = 'asc' | 'desc';

interface ILinkContact {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IGetResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILinkContact[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  drugs: IDrug[];
}

export interface IGetContact {
  id?: number;
  order?: ContactOrderType;
  orderBy?: OrderByType;
  where?: string;
  like?: string;
  drug_id?: number;
  created_by?: number;
}

export interface IPaginationPayload {
  paginationMethod: string;
  page: number;
  pageSize: number;
}

export interface ICreateContactRequest extends IGeneralRequest {
  payload: string;
}

export interface ICommonResponse {
  id: number;
  success: boolean;
}

export const fetchContacts = (
  payload: IPaginationPayload,
  params?: IGetContact
) => {
  return authServiceClient.post<
    IContact[],
    AxiosResponse<IGetResponse<IContact>>,
    IGetContact & IGeneralRequest & IPaginationPayload
  >('', { type: 'getContact', ...payload, ...params });
};

export const fetchMonitoredContact = (id: number) => {
  return authServiceClient.post<
    IContact,
    AxiosResponse<IContact>,
    IGeneralRequest & { id: number }
  >('', { type: 'getContact', id });
};

export const fetchContactBySearch = (search: string) => {
  return authServiceClient.post<
    IContact[],
    AxiosResponse<IGetResponse<IContact>>,
    IGeneralRequest & { like: string }
  >('', { type: 'getContact', like: search });
};

export const createContact = (payload: ICreateContactPayload) => {
  const data = {
    type: 'createContact',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateContactRequest
  >('', data);
};
