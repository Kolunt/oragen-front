import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { ITarget } from 'api/targetListApi';
import {
  ICommonResponse,
  IGetResponse,
  IPaginationPayload,
} from 'api/contactApi';
import { IUser } from 'api/userApi';
import { IDrug, NumberStatusType } from 'api/drugsApi';
import { IContact } from 'store/useContactsStore';
import { IOrganization } from 'store/useOrganizationsStore';
import { IKpi } from 'api/kpiApi';

export interface IPivotTargetLocal {
  comment: null | string;
  contact_id: number;
  planned_visits: number;
  status: boolean;
  target_list_id: number;
}

export interface IMatchedContact extends IContact {
  pivot: IPivotTargetLocal;
  loyality: number;
  potential: number;
}

export interface IMatchedOrganization extends IOrganization {
  pivot: IPivotTargetLocal;
}

export interface ITargetLocal {
  id: number;
  parent_target_list: number;
  performer_id: number;
  drug_id: number;
  started_at: Date;
  finished_at: Date;
  visits_count: number;
  created_at: Date;
  updated_at: Date;
  performer: IUser;
  parent_target_list_full_info: Omit<
    ITarget,
    'owner' | 'creator' | 'drug' | 'blocks'
  >;
  drug: IDrug;
  matched_contacts: IMatchedContact[];
  matched_organizations: IMatchedOrganization[];
  status: boolean;
  finished_visits_count?: number;
  planned_visits_count?: number;
  kpi: IKpi;
}

export interface IUpdateTargetListContactComment extends IGeneralRequest {
  target_list_id: number;
  contact_id: string;
  comment: string;
}

export interface IUpdateTargetListVisits extends IGeneralRequest {
  id: number;
  visits_count: number;
}

export interface IUpdateTargetListStatus extends IGeneralRequest {
  id: number;
  status: NumberStatusType;
}

export interface IUpdateTargetListContactVisits extends IGeneralRequest {
  target_list_id: number;
  contact_id: number;
  planned_visits: number;
}

export interface IUpdateTargetListOrganizationVisits extends IGeneralRequest {
  target_list_id: number;
  organization_id: number;
  planned_visits: number;
}

export interface IUpdateTargetListContactStatus extends IGeneralRequest {
  target_list_id: number;
  contact_id: number;
  status: NumberStatusType;
}

export interface IUpdateTargetListOrganizationStatus extends IGeneralRequest {
  target_list_id: number;
  organization_id: number;
  status: NumberStatusType;
}

export interface IUpdateContactStatusPayload {
  targetListId: number;
  contactId: number;
  status: NumberStatusType;
}

export interface IUpdateStatusPayload {
  id: number;
  status: NumberStatusType;
}

export const fetchTargetListLocal = (
  payload: IPaginationPayload,
  id?: number
) => {
  return authServiceClient.post<
    ITargetLocal[],
    AxiosResponse<IGetResponse<ITargetLocal>>,
    IGeneralRequest &
      IPaginationPayload & { parent_target_list?: number; order: string }
  >('', {
    type: 'getTargetListLocal',
    ...payload,
    parent_target_list: id,
    order: 'performer_id',
  });
};

export const fetchMonitoredTargetLocal = (id: number) => {
  return authServiceClient.post<
    ITargetLocal,
    AxiosResponse<ITargetLocal>,
    IGeneralRequest & { id: number }
  >('', { type: 'getTargetListLocal', id });
};

export const updateTargetListContactComment = (
  targetId: number,
  contactId: string,
  comment: string
) => {
  const data = {
    type: 'updateTargetListContactComment',
    target_list_id: targetId,
    contact_id: contactId,
    comment,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateTargetListContactComment
  >('', data);
};

export const updateTargetListVisits = (id: number, visitsCount: number) => {
  const data = {
    type: 'updateTargetListVisits',
    id,
    visits_count: visitsCount,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateTargetListVisits
  >('', data);
};

export const updateTargetListStatus = (payload: IUpdateStatusPayload) => {
  const data = {
    type: 'updateTargetListStatus',
    id: payload.id,
    status: payload.status,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateTargetListStatus
  >('', data);
};

export const updateTargetListContactVisits = (
  targetListId: number,
  contactId: number,
  plannedVisits: number
) => {
  const data = {
    type: 'updateTargetListContactVisits',
    target_list_id: targetListId,
    contact_id: contactId,
    planned_visits: plannedVisits,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateTargetListContactVisits
  >('', data);
};

export const updateTargetListOrganizationVisits = (
  targetListId: number,
  contactId: number,
  plannedVisits: number
) => {
  const data = {
    type: 'updateTargetListOrganizationVisits',
    target_list_id: targetListId,
    organization_id: contactId,
    planned_visits: plannedVisits,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateTargetListOrganizationVisits
  >('', data);
};

export const updateTargetListContactStatus = (
  payload: IUpdateContactStatusPayload
) => {
  const data = {
    type: 'updateTargetListContactStatus',
    target_list_id: payload.targetListId,
    contact_id: payload.contactId,
    status: payload.status,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateTargetListContactStatus
  >('', data);
};

export const updateTargetListOrganizationStatus = (
  payload: IUpdateContactStatusPayload
) => {
  const data = {
    type: 'updateTargetListOrganizationStatus',
    target_list_id: payload.targetListId,
    organization_id: payload.contactId,
    status: payload.status,
  };
  return authServiceClient.post<
    ICommonResponse,
    AxiosResponse<ICommonResponse>,
    IUpdateTargetListOrganizationStatus
  >('', data);
};
