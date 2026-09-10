import {
  ICommonResponse,
  IGetResponse,
  IPaginationPayload,
} from 'api/contactApi';
import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import {
  ICreateVisitRequest,
  IDeleteVisitRequest,
  IFetchVisitRequest,
  IFetchVisitsRequest,
  ISetAcceptVisitPayload,
  ISetApprovalStatusVisitPayload,
  IUpdateVisitDatePayload,
  IUpdateVisitFilesPayload,
  IUpdateVisitParticipantsPayload,
  IUpdateVisitPerformerPayload,
  IVisit,
} from 'api/visitsApi';
import { IOrganization } from 'store/useOrganizationsStore';
import { IGeneralRequest } from 'api/authApi';

export interface ICreateVisitPayloadPharmacy {
  performer_id: number;
  organization_id: number;
  drug_id: number;
  planned_at: string;
  participantsList?: number[];
  poll_id: number;
  files: string[];
}

export interface IVisitPharmacy
  extends Omit<IVisit, 'contact_id' | 'contact' | 'mode'> {
  organization_id: number;
  organization: IOrganization;
}

export const fetchVisitsPharmacy = (
  payload: IPaginationPayload,
  params: IFetchVisitsRequest
) => {
  return authServiceClient.post<
    IVisitPharmacy[],
    AxiosResponse<IGetResponse<IVisitPharmacy>>,
    IGeneralRequest & IPaginationPayload & IFetchVisitsRequest
  >('', { type: 'getVisitPharmacy', ...payload, ...params });
};

export const fetchVisitPharmacy = (id: number) => {
  return authServiceClient.post<
    IVisitPharmacy,
    AxiosResponse<IVisitPharmacy>,
    IFetchVisitRequest
  >('', { type: 'getVisitPharmacy', id });
};

export const createVisitPharmacy = (payload: ICreateVisitPayloadPharmacy) => {
  const data = {
    type: 'createVisitPharmacy',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateVisitRequest
  >('', data);
};

export const fetchAcceptVisitPharmacy = (
  payload: Omit<ISetAcceptVisitPayload, 'duration'>
) => {
  const data = {
    type: 'acceptVisitPharmacy',
    visit_id: payload.id,
    planned_at: payload.plannedDate,
    comment: payload.comment,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const fetchDeclineVisitPharmacy = (
  payload: ISetApprovalStatusVisitPayload
) => {
  const data = {
    type: 'declineVisitPharmacy',
    visit_id: payload.id,
    planned_at: payload.plannedDate,
    comment: payload.comment,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const fetchCancelVisitPharmacy = (
  payload: ISetApprovalStatusVisitPayload
) => {
  const data = {
    type: 'cancelVisitPharmacy',
    visit_id: payload.id,
    planned_at: payload.plannedDate,
    comment: payload.comment,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const fetchUpdateVisitPharmacyPerformer = (
  payload: IUpdateVisitPerformerPayload
) => {
  const data = {
    type: 'updateVisitPharmacyPerformer',
    visit_id: payload.id,
    performer_id: payload.performerId,
    comment: payload.comment,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const fetchUpdateVisitPharmacyDate = (
  payload: IUpdateVisitDatePayload
) => {
  const data = {
    type: 'updateVisitPharmacyDate',
    visit_id: payload.id,
    planned_at: payload.newDate,
    comment: payload.comment,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const deleteVisitPharmacy = (id: number) => {
  const data = {
    type: 'deleteVisitPharmacy',
    id,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IDeleteVisitRequest
  >('', data);
};

export const updateVisitPharmacyParticipants = (
  payload: IUpdateVisitParticipantsPayload
) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', { type: 'updateVisitPharmacyParticipants', ...payload });
};

export const updateVisitPharmacyFiles = (payload: IUpdateVisitFilesPayload) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', { type: 'updateVisitPharmacyFiles', ...payload });
};

export const fetchStartVisitPharmacy = (visit_id: number) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest & { visit_id: number }
  >('', { type: 'startVisitPharmacy', visit_id });
};

export const fetchStopVisitPharmacy = (visit_id: number) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest & { visit_id: number }
  >('', { type: 'stopVisitPharmacy', visit_id });
};
