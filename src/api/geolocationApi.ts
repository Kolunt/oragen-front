// getGeolocation
// createGeolocation

import { authServiceClient } from '../config/authServiceClient';
import { AxiosResponse } from 'axios/index';
import { IGetResponse } from './contactApi';
import { IUser } from './userApi';
import { IGeneralRequest } from './authApi';

// {
//   id: 1,
//   geotag: '37.4226711, -122.0849872',
//   updated_at: '2023-06-01T21:00:00.000Z',
//   created_at: '2023-06-01T21:00:00.000Z',
// }

export interface IFetchGeolocation {
  user_id: string | undefined;
  placed_after: string;
  placed_before: string;
}

export interface IGeolocation {
  id: string;
  geotag: string;
  updated_at: string;
  created_at: string;
}

export const fetchGeolocation = (params: IFetchGeolocation) => {
  return authServiceClient.post<
    IGeolocation[],
    AxiosResponse<IGetResponse<IGeolocation>>,
    IGeneralRequest
  >('', { type: 'getGeolocation', ...params });
};
