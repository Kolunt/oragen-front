import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import {
  ICommonResponse,
  IGetResponse,
  IPaginationPayload,
} from 'api/contactApi';
import { IUser } from 'api/userApi';

export type ReportStatusType = 'new' | 'filled';

export type ReportQuestionType =
  | 'field'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'percent';

export interface IReportQuestion {
  advice: string;
  answer: string[];
  question: string;
  type: ReportQuestionType;
  variants: string[];
}

export interface IReport {
  id: number;
  name: string;
  created_by: number;
  visit_id: null | number;
  visit_pharmacy_id: null | number;
  questions: IReportQuestion[];
  status: ReportStatusType;
  created_at: Date;
  updated_at: Date;
}

export interface ICreatePollPayload {
  name: string;
  visit_id?: number;
  questions: IReportQuestion[];
}

export interface IUpdatePollPayload {
  name?: string;
  visit_id?: number;
  status?: string;
  questions: IReportQuestion[];
}

export interface IPollByVisitPharmacyRequest extends IGeneralRequest {
  visit_pharmacy_id: number;
}

export interface IPollByVisitRequest extends IGeneralRequest {
  visit_id: number;
}

export interface IPollByIdRequest extends IGeneralRequest {
  id: number;
}

export interface IFillOutReportPayload {
  id: number;
  questions: string;
  loyality: number;
  potential: number;
}

export const fetchCreatePoll = (payload: ICreatePollPayload) => {
  const data = {
    type: 'createPoll',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const fetchFreePolls = (payload: IPaginationPayload) => {
  return authServiceClient.post<
    IReport[],
    AxiosResponse<IGetResponse<IReport>>,
    IGeneralRequest
  >('', { type: 'getFreePolls', ...payload });
};

export const fetchFreePollsBySearch = (search: string) => {
  return authServiceClient.post<
    IReport[],
    AxiosResponse<IGetResponse<IReport>>,
    IGeneralRequest & { name: string }
  >('', { type: 'getFreePolls', name: search });
};

export const fetchPollByVisitPharmacy = (id: number) => {
  const data = { type: 'getPollByVisitPharmacy', visit_pharmacy_id: id };
  return authServiceClient.post<
    IReport,
    AxiosResponse<IReport>,
    IPollByVisitPharmacyRequest
  >('', data);
};

export const fetchPollByVisit = (id: number) => {
  const data = { type: 'getPollByVisit', visit_id: id };
  return authServiceClient.post<
    IReport,
    AxiosResponse<IReport>,
    IPollByVisitRequest
  >('', data);
};

export const fetchPollById = (id: number) => {
  const data = { type: 'getPollById', id: id };
  return authServiceClient.post<
    IReport,
    AxiosResponse<IReport>,
    IPollByIdRequest
  >('', data);
};

export const fetchDeletePoll = (id: number) => {
  const data = { type: 'deletePoll', id: id };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IPollByIdRequest
  >('', data);
};

export const fetchUpdatePoll = (id: number, payload: IUpdatePollPayload) => {
  const data = {
    type: 'updatePoll',
    id,
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const fillOutReport = (params: IFillOutReportPayload) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', { type: 'fillOutReport', ...params });
};
