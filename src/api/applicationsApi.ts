import { IGeneralRequest } from 'api/authApi';
import { authServiceClient } from 'config/authServiceClient';
import {
  CreateContactApplicationType,
  CreateOrganizationApplicationType,
  IContactApplication,
  IOrganizationApplication,
} from 'store/useApplicationsStore';
import { AxiosResponse } from 'axios';
import { ICommonResponse, IGetContact } from 'api/contactApi';
import { IContact } from 'store/useContactsStore';
import { IPagination } from '../TypeInterface';

export interface IGetContactApplicationsResponse {
  data: IContactApplication[];
  path: string;
  per_page: number;
  next_page_url: null;
  prev_page_url: null;
  current_page: number;
  total: number;
}

export interface IGetOrganizationApplicationsResponse {
  data: IOrganizationApplication[];
  path: string;
  per_page: number;
  next_page_url: null;
  prev_page_url: null;
  current_page: number;
  total: number;
}

export interface ICreateApplicationRequest extends IGeneralRequest {
  payload?: string;
}

export interface ICreateApplicationResponse {
  id: number;
  success: boolean;
}

export type UserAgreementType = 1 | 0;

export interface IUserAgreementPayload {
  proposal_id: number;
  user_agreement_contact: UserAgreementType;
  user_agreement_mail: UserAgreementType;
  user_agreement_sms: UserAgreementType;
}

export interface IAcceptContactResponse {
  id: number;
  success: boolean;
  contact: IContact;
}

export interface IAcceptOrganizationResponse {
  id: number;
  success: boolean;
  contact: IContact;
}

export interface IGetContactProposal extends IGetContact {
  user_agreement?: UserAgreementType;
  user_agreement_contact?: UserAgreementType;
}

export const fetchContactApplications = (
  params?: IGetContactProposal,
  payload?: IPagination
) => {
  return authServiceClient.post<
    IContactApplication[],
    AxiosResponse<IGetContactApplicationsResponse>,
    IGeneralRequest
  >('', { type: 'getContactProposal', ...params, ...payload });
};

export const fetchOrganizationApplications = (
  params?: IGetContact,
  payload?: IPagination
) => {
  return authServiceClient.post<
    IOrganizationApplication[],
    AxiosResponse<IGetOrganizationApplicationsResponse>,
    IGeneralRequest
  >('', { type: 'getOrganizationProposal', ...params, ...payload });
};

export const createOrganizationApplication = (
  payload: CreateOrganizationApplicationType
) => {
  const data = {
    type: 'createOrganizationProposal',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICreateApplicationResponse,
    AxiosResponse<ICreateApplicationResponse>,
    ICreateApplicationRequest
  >('', data);
};

export const createContactApplication = (
  payload: CreateContactApplicationType
) => {
  const data = {
    type: 'createContactProposal',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICreateApplicationResponse,
    AxiosResponse<ICreateApplicationResponse>,
    ICreateApplicationRequest
  >('', data);
};

export const acceptContactApplication = (id: number, payload?: any) => {
  const data = {
    type: 'acceptContactProposal',
    id,
    payload: JSON.stringify(payload),
  };

  return authServiceClient.post<
    IAcceptContactResponse,
    AxiosResponse<IAcceptContactResponse>,
    ICreateApplicationRequest & { id: number }
  >('', data);
};

export const acceptOrganizationApplication = (id: number, payload?: any) => {
  const data = {
    type: 'acceptOrganizationProposal',
    id,
    payload: JSON.stringify(payload),
  };

  return authServiceClient.post<
    IAcceptOrganizationResponse,
    AxiosResponse<IAcceptOrganizationResponse>,
    ICreateApplicationRequest & { id: number }
  >('', data);
};

export const declineContactApplication = (id: number) => {
  const data = {
    type: 'declineContactProposal',
    id,
  };

  return authServiceClient.post<
    ICreateApplicationResponse,
    AxiosResponse<ICreateApplicationResponse>,
    { id: number }
  >('', data);
};

export const declineOrganizationApplication = (id: number) => {
  const data = {
    type: 'declineOrganizationProposal',
    id,
  };

  return authServiceClient.post<
    ICreateApplicationResponse,
    AxiosResponse<ICreateApplicationResponse>,
    { id: number }
  >('', data);
};

export const getContactProposalUnAuth = (proposal_id: number) => {
  return authServiceClient.post<
    IContactApplication,
    AxiosResponse<IContactApplication>,
    IGeneralRequest & { proposal_id: number }
  >('', { type: 'getContactProposalUnAuth', proposal_id });
};

export const setContactProposalUserAgreement = (
  payload: IUserAgreementPayload
) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest & IUserAgreementPayload
  >('', { type: 'setContactProposalUserAgreement', ...payload });
};
