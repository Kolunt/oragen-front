import { IGetResponse, IPaginationPayload } from 'api/contactApi';
import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { IFetchVisitsRequest } from 'api/visitsApi';
import { IUser } from 'api/userApi';
import { IDrug } from 'api/drugsApi';
import { IContact } from 'store/useContactsStore';
import { IOrganization } from 'store/useOrganizationsStore';

export interface IFetchVisitsGroupPharmacyRequest {
  drug_id?: number;
  contact_id?: number;
  address?: string;
  performer_id?: number;
  order?: string;
  orderBy?: string;
}

export interface IVisitGroupPharmacy {
  organization_id: number;
  performer_id: number;
  drug_id: number;
  planned_visits: number;
  finished_visits: number;
  archived_visits: number;
  completed_visits: number;
  performer: Omit<IUser, 'roles'>;
  drug: IDrug;
  organization: IOrganization;
}

export const fetchVisitsGroupedPharmacy = (
  payload: IPaginationPayload,
  params: IFetchVisitsRequest
) => {
  return authServiceClient.post<
    IVisitGroupPharmacy[],
    AxiosResponse<IGetResponse<IVisitGroupPharmacy>>,
    IGeneralRequest & IPaginationPayload & IFetchVisitsGroupPharmacyRequest
  >('', { type: 'getVisitPharmacyGrouped', ...payload, ...params });
};
