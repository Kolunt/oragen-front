import { authServiceClient } from '../config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from './authApi';
import { IUser } from './userApi';
import { IGetResponse } from './contactApi';
import { IPagination } from './tasksApi';

export type NewsOrderType = 'created_at';

export type OrderByType = 'asc' | 'desc';

export interface IGetNews {
  order: NewsOrderType;
  orderBy: OrderByType;
}

export interface ICreateNews {
  title: string;
  text: string;
}

export interface ICreateNewsResponse {
  id: number;
  success: boolean;
}

export interface INew {
  title: string;
  text: string;
  created_at: string;
  creator: IUser;
}

export const createNews = (payload: ICreateNews) => {
  const data = {
    type: 'createNews',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    AxiosResponse<ICreateNewsResponse>,
    ICreateNews & IGeneralRequest
  >('', data);
};

export const fetchNews = (payload: IPagination, params: IGetNews) => {
  return authServiceClient.post<
    INew[],
    AxiosResponse<IGetResponse<INew>>,
    IGeneralRequest
  >('', { type: 'getNews', ...payload, ...params });
};

export const fetchListNews = (params: any) => {
  return authServiceClient.post<
    INew[],
    AxiosResponse<IGetResponse<INew>>,
    IGeneralRequest
  >('', {
    type: 'getDashboardNews',
    //@ts-ignore
    options: [
      {
        type: 'getOrganizationProposal',
        paginationMethod: 'full',
        page: '1',
        pageSize: '20',
        order: 'created_at',
        orderBy: 'asc',
      },
      {
        type: 'getContactProposal',
        user_agreement: '1',
        user_agreement_contact: '1',
        paginationMethod: 'full',
        page: '1',
        pageSize: '20',
        order: 'created_at',
        orderBy: 'asc',
      },
      {
        type: 'getTask',
        paginationMethod: 'full',
        page: '1',
        pageSize: '20',
        showSubTasks: 'false',
        orderBy: 'asc',
        mode: 'performed',
      },
      {
        type: 'getNews',
        paginationMethod: 'full',
        page: '1',
        pageSize: '20',
        order: 'created_at',
        orderBy: 'desc',
      },
      {
        type: 'getVisit',
        paginationMethod: 'full',
        page: '1',
        pageSize: '10',
        orderBy: 'asc',
      },
    ],
  });
};
