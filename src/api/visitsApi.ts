import { IUser } from 'api/userApi';
import { IDrug } from 'api/drugsApi';
import { authServiceClient } from 'config/authServiceClient';
import {
  ICommonResponse,
  IGetResponse,
  IPaginationPayload,
} from 'api/contactApi';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { IContact } from 'store/useContactsStore';
import { IVideoCallUser } from 'store/useVideoCallStore';
import { IReportQuestion } from 'api/pollsApi';

export interface ICommentsVisit {
  id: number;
  visit_id: number;
  created_by: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  creator: IUser;
}

export interface IVisitParentTargetList {
  id: number;
  parent_target_list: number;
  performer_id: number;
  drug_id: number;
  started_at: Date;
  finished_at: Date;
  visits_count: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export type VisitCreationType = 'generated' | 'manual';

export type VisitApprovalType =
  | 'not_processed'
  | 'accepted'
  | 'declined'
  | 'canceled';

export type VisitOrderType = 'full_name' | 'position' | 'company';

export type VisitStatusType = 'upcoming' | 'live' | 'finished' | 'archived';

export type VisitModeType = 'local' | 'remote';

export interface IVisitReport {
  created_at: Date;
  created_by: Date;
  id: number;
  name: string;
  questions: IReportQuestion[];
  status: string;
  updated_at: Date;
  visit_id: number;
  visit_pharmacy_id: number | null;
}

export interface IVisit {
  id: number;
  creation_type: VisitCreationType;
  approval: VisitApprovalType;
  status: VisitStatusType;
  performer_id: number;
  contact_id: number;
  target_list_id: number | null;
  drug_id: number;
  description: string | null;
  planned_at: Date | null;
  started_at: Date | null;
  finished_at: Date | null;
  created_at: Date;
  updated_at: Date;
  performer: Omit<IUser, 'roles'>;
  drug: IDrug;
  contact: IContact;
  parent_target_list: IVisitParentTargetList;
  creator: IUser;
  comments_with_author: ICommentsVisit[];
  geotags?: any[];
  videocall: IVideoCallUser | null;
  videocall_id: number | null;
  mode: VisitModeType;
  report: null | IVisitReport;
  participants_list: IUser[] | null;
  files: string[] | null;
}

export type GenerateVisitsType = 'local' | 'global';

export interface IGenerateVisitsPayload {
  mode: GenerateVisitsType;
  id: number;
}

export interface ISetApprovalStatusVisitPayload {
  id: number;
  plannedDate?: string;
  comment?: string;
}

export interface ISetAcceptVisitPayload extends ISetApprovalStatusVisitPayload {
  mode: VisitModeType;
  duration?: number;
}

export interface IUpdateVisitPerformerPayload {
  id: number;
  performerId: number;
  comment?: string;
}

export interface IUpdateVisitDatePayload {
  id: number;
  newDate: string;
  comment?: string;
}

export interface IUpdateVisitModePayload {
  id: number;
  mode: 'local' | 'remote';
  duration?: number;
}

export interface IUpdateVisitParticipantsPayload {
  visit_id: number;
  participants: string;
}

export interface IUpdateVisitFilesPayload {
  visit_id: number;
  files: string;
  comment?: string;
}

export interface IGenerateVisitsRequest extends IGeneralRequest {
  id: number;
  mode: GenerateVisitsType;
}

export interface IDeleteVisitRequest extends IGeneralRequest {
  id: number;
}

export interface ICreateVisitPayload {
  performer_id: number;
  contact_id: number;
  drug_id: number;
  planned_at: string;
  participantsList?: number[];
  poll_id: number;
  files?: string[];
}

export interface ICreateVisitRemotePayload extends ICreateVisitPayload {
  duration: number;
}

export interface ICreateVisitRequest extends IGeneralRequest {
  payload: string;
}

export interface IFetchVisitsRequest {
  approval?: VisitApprovalType;
  performer_id?: number;
  drug_id?: number;
  order?: string;
  contact_id?: number;
  organization_id?: number;
  address?: string;
  mode?: VisitModeType;
  orderBy?: string;
  target_list_id?: number | string;
  status?: VisitStatusType;
}

export interface IFetchVisitRequest extends IGeneralRequest {
  id: number;
}

export const fetchGenerateVisits = (payload: IGenerateVisitsPayload) => {
  const data = {
    type: 'generateVisits',
    mode: payload.mode,
    id: payload.id,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGenerateVisitsRequest
  >('', data);
};

export const fetchVisits = (
  payload: IPaginationPayload,
  params: IFetchVisitsRequest
) => {
  return authServiceClient.post<
    IVisit[],
    AxiosResponse<IGetResponse<IVisit>>,
    IGeneralRequest & IPaginationPayload & IFetchVisitsRequest
  >('', { type: 'getVisit', ...payload, ...params });
};

export const fetchVisit = (id: number) => {
  return authServiceClient.post<
    IVisit,
    AxiosResponse<IVisit>,
    IFetchVisitRequest
  >('', { type: 'getVisit', id });
};

export const deleteVisit = (id: number) => {
  const data = {
    type: 'deleteVisit',
    id,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IDeleteVisitRequest
  >('', data);
};

export const createVisit = (payload: ICreateVisitPayload) => {
  const data = {
    type: 'createVisit',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateVisitRequest
  >('', data);
};

export const createVisitRemote = (payload: ICreateVisitRemotePayload) => {
  const data = {
    type: 'createVisitRemote',
    payload: JSON.stringify(payload),
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    ICreateVisitRequest
  >('', data);
};

export const fetchAcceptVisit = (payload: ISetAcceptVisitPayload) => {
  const data = {
    type: 'acceptVisit',
    visit_id: payload.id,
    mode: payload.mode,
    planned_at: payload.plannedDate,
    comment: payload.comment,
    duration: payload.duration,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const fetchDeclineVisit = (payload: ISetApprovalStatusVisitPayload) => {
  const data = {
    type: 'declineVisit',
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

export const fetchCancelVisit = (payload: ISetApprovalStatusVisitPayload) => {
  const data = {
    type: 'cancelVisit',
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

export const fetchUpdateVisitPerformer = (
  payload: IUpdateVisitPerformerPayload
) => {
  const data = {
    type: 'updateVisitPerformer',
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

export const fetchUpdateVisitDate = (payload: IUpdateVisitDatePayload) => {
  const data = {
    type: 'updateVisitDate',
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

export const updateVisitMode = (payload: IUpdateVisitModePayload) => {
  const data = {
    type: 'updateVisitMode',
    visit_id: payload.id,
    mode: payload.mode,
    duration: payload.duration,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', data);
};

export const updateVisitParticipants = (
  payload: IUpdateVisitParticipantsPayload
) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', { type: 'updateVisitParticipants', ...payload });
};

export const updateVisitFiles = (payload: IUpdateVisitFilesPayload) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest
  >('', { type: 'updateVisitFiles', ...payload });
};

export const fetchStartVisit = (visit_id: number) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest & { visit_id: number }
  >('', { type: 'startVisit', visit_id });
};

export const fetchStopVisit = (visit_id: number) => {
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IGeneralRequest & { visit_id: number }
  >('', { type: 'stopVisit', visit_id });
};
