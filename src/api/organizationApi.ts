import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { IOrganization } from 'store/useOrganizationsStore';
import { IGetResponse } from 'api/contactApi';

export type OrganizationOrderType =
  | 'name'
  | 'number_of_employees'
  | 'organization_type'
  | 'address';

export type OrderByType = 'asc' | 'desc';

interface ILinkOrganization {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IGetOrganizationsResponse {
  current_page: number;
  data: IOrganization[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILinkOrganization[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface IGetOrganizations {
  id?: number;
  order?: OrganizationOrderType;
  orderBy?: OrderByType;
  where?: string;
  like?: string;
}

export interface IOrganizationsPagination {
  paginationMethod: string;
  page: number;
  pageSize: number;
}

export const fetchOrganizations = (
  payload: IOrganizationsPagination,
  params?: IGetOrganizations
) => {
  return authServiceClient.post<
    IOrganization[],
    AxiosResponse<IGetOrganizationsResponse>,
    IGetOrganizations & IGeneralRequest
  >('', { type: 'getOrganization', ...payload, ...params });
};

export const fetchPharmacyBySearch = (search: string) => {
  return authServiceClient.post<
    IOrganization[],
    AxiosResponse<IGetResponse<IOrganization>>,
    IGeneralRequest & { like: string }
  >('', { type: 'getOrganization', like: search });
};

export const fetchMonitoredOrganization = (id: number) => {
  return authServiceClient.post<
    IOrganization,
    AxiosResponse<IOrganization>,
    IGeneralRequest & { id: number }
  >('', { type: 'getOrganization', id });
};
