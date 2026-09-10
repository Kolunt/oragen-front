import { AxiosResponse } from 'axios';
import { authServiceClient } from 'config/authServiceClient';
import { IUser } from 'api/userApi';

export interface IGeneralRequest {
  type: string;
}

export interface IAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  user: IUser;
}

export interface IRefreshTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  user: null;
}

export interface IAuthRequest extends IGeneralRequest {
  email: string;
  password: string;
}

export const fetchAuth = (email: string, password: string) => {
  const data = {
    type: 'login',
    email: email,
    password: password,
  };
  return authServiceClient.post<
    IAuthResponse,
    AxiosResponse<IAuthResponse>,
    IAuthRequest
  >('', data);
};

export const fetchRefreshToken = () => {
  return authServiceClient.post<
    IRefreshTokenResponse,
    AxiosResponse<IRefreshTokenResponse>,
    IGeneralRequest
  >('', { type: 'refresh' });
};
