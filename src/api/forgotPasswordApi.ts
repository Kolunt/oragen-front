import { authServiceClient } from '../config/authServiceClient';
import { AxiosResponse } from 'axios/index';
import { IGeneralRequest, IRefreshTokenResponse } from './authApi';

export interface ISendCodeEmail {
  email: string;
}

export interface IChangePassword {
  email: string;
  password: string;
  password_confirmation: string;
  code: string;
}

export const changePassword = (params: IChangePassword) => {
  return authServiceClient.post<
    IChangePassword,
    AxiosResponse,
    IGeneralRequest
  >('', { type: 'confirmResetPassword', ...params });
};

export const sendCodeEmail = (params: ISendCodeEmail) => {
  return authServiceClient.post<ISendCodeEmail, AxiosResponse, IGeneralRequest>(
    '',
    { type: 'generateResetPasswordCode', ...params }
  );
};
