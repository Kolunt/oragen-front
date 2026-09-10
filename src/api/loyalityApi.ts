import { authServiceClient } from '../config/authServiceClient';
import { AxiosResponse } from 'axios/index';
import { IGetResponse, IPaginationPayload } from './contactApi';
import { IGeneralRequest } from './authApi';
import { IDrug } from 'api/drugsApi';

export interface IFetchLoyalityRequest {
  id: number;
}

export const fetchLoyality = (payload: IFetchLoyalityRequest) => {
  return authServiceClient.post<
    IDrug[],
    AxiosResponse<IGetResponse<IDrug>>,
    IGeneralRequest
  >('', { type: 'getContactLoyality', ...payload });
};
