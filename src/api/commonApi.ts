import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from './authApi';
import { ICommonResponse } from 'api/contactApi';

export interface ISpecialty {
  id: number;
  name: string;
}

export interface ICreateSpecialtyRequest extends IGeneralRequest {
  name: string;
}

export interface IGetFullLinkResponse {
  route: string;
  full: string;
  success: boolean;
}

export const fetchSpecialties = (name: string) => {
  return authServiceClient.post<
    ISpecialty[],
    AxiosResponse<ISpecialty[]>,
    ICreateSpecialtyRequest
  >('', { type: 'getPositions', name });
};

export const fetchGetFullLink = (code: string) => {
  return authServiceClient.post<
    IGetFullLinkResponse,
    AxiosResponse<IGetFullLinkResponse>,
    { type: string; code: string }
  >('', { type: 'getFullLink', code });
};
