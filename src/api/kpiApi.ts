import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from './authApi';
import { IDrug } from 'api/drugsApi';
import { ITarget } from 'api/targetListApi';

export interface IKpiItem {
  plan: number;
  fact: number;
  left: number;
  percent: number;
}

export interface IKpi {
  cycle: IKpiItem;
  month: IKpiItem;
  week: IKpiItem;
}

export interface ITargetListKpi {
  id: number;
  created_at: string;
  updated_at: string;
  finished_at: string;
  started_at: string;
  drug: IDrug;
  drug_id: number;
  files: string[];
  kpi: IKpi;
  parent_target_list: ITarget;
  status: boolean;
  poll_id: number;
  performer_id: number;
  visits_count: number;
}

export interface ICalculateKpiResponse {
  success: boolean;
  all: IKpi;
  targetLists: ITargetListKpi[];
}

export interface ICalculateKpiRequest {
  target_list_id: number;
  local_shift: number;
  now?: string;
}

export const fetchCalculateKpi = (params: ICalculateKpiRequest) => {
  return authServiceClient.post<
    ICalculateKpiResponse,
    AxiosResponse<ICalculateKpiResponse>,
    IGeneralRequest & ICalculateKpiRequest
  >('', { type: 'calculateKpi', ...params });
};

export const fetchCalculateMyKpi = (local_shift: number) => {
  return authServiceClient.post<
    ICalculateKpiResponse,
    AxiosResponse<ICalculateKpiResponse>,
    IGeneralRequest & { local_shift: number }
  >('', { type: 'calculateMyKpi', local_shift });
};
