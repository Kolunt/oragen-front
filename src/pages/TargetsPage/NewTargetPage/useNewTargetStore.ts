import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchDrugsBySearch, IDrug } from 'api/drugsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchUsersBySearch, IUser } from 'api/userApi';
import { fetchBricksBySearch, IBrick } from 'api/brickApi';
import { createTargetList } from 'api';
import { OrganizationType } from 'TypeInterface';
import { ICreateTargetListPayload, ILoyaltyRange } from 'api/targetListApi';
import { useMessageStore } from 'components';
import { fetchFreePollsBySearch, IReport } from 'api/pollsApi';

export interface ICreateTargetPayload {
  blocks_list: number[];
  drug_id: number;
  name: string;
  owner_id: number;
  poll_id: number;
  positions_list: number[];
  started_at: string;
  finished_at: string;
  type: OrganizationType;
  visits: number;
  visitsA?: number;
  visitsB?: number;
  visitsC?: number;
  visitsD?: number;
  visitsF?: number;
  files: string[];
  potentialA?: number;
  potentialB?: number;
  potentialC?: number;
  potentialD?: number;
  potentialF?: number;
}

interface INewTargetStore {
  drugs: IDrug[];
  performers: IUser[];
  bricks: IBrick[];
  polls: IReport[];
  getDrugs: (search: string) => void;
  getPolls: (search: string) => void;
  getPerformers: (search: string) => void;
  getBricks: (search: string) => void;
  createTarget: (payload: ICreateTargetPayload, redirect: () => void) => void;
}

export const useNewTargetStore = create<INewTargetStore>()(
  immer((set, get) => ({
    drugs: [],
    performers: [],
    bricks: [],
    polls: [],
    getPolls: async (search) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await fetchFreePollsBySearch(search);
        if (data) {
          set({ polls: data.data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    getDrugs: async (search) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await fetchDrugsBySearch(search);
        if (data) {
          set({ drugs: data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    getPerformers: async (search) => {
      useAuthStore.getState().setLoading(true);
      const like = JSON.stringify({ name: search });
      try {
        const { data } = await fetchUsersBySearch(like);
        if (data) {
          set({ performers: data.data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    getBricks: async (search) => {
      useAuthStore.getState().setLoading(true);
      const like = JSON.stringify({ name: search });
      try {
        const { data } = await fetchBricksBySearch(like);
        if (data) {
          set({ bricks: data.data });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    createTarget: async (payload, redirect) => {
      useAuthStore.getState().setLoading(true);

      const loyalty: ILoyaltyRange[] = [
        { from: -1, to: -1, name: 'F', value: payload.visitsF },
        { from: 0, to: 24, name: 'D', value: payload.visitsD },
        { from: 25, to: 49, name: 'C', value: payload.visitsC },
        { from: 50, to: 74, name: 'B', value: payload.visitsB },
        { from: 75, to: 100, name: 'A', value: payload.visitsA },
      ];

      const potential: ILoyaltyRange[] = [
        { from: -1, to: -1, name: 'F', value: payload.potentialF },
        { from: 0, to: 24, name: 'D', value: payload.potentialD },
        { from: 25, to: 49, name: 'C', value: payload.potentialC },
        { from: 50, to: 74, name: 'B', value: payload.potentialB },
        { from: 75, to: 100, name: 'A', value: payload.potentialA },
      ];

      const newTargetPayload: ICreateTargetListPayload = {
        name: payload.name,
        drug_id: payload.drug_id,
        owner_id: payload.owner_id,
        started_at: payload.started_at,
        finished_at: payload.finished_at,
        blocks_list: payload.blocks_list,
        positions_list: payload.positions_list,
        poll_id: payload.poll_id,
        type: payload.type,
        visits_count: payload.visits,
        loyality_range: payload.type === 'mpi' ? loyalty : undefined,
        potential_range: payload.type === 'mpi' ? potential : undefined,
        files: payload.files,
      };
      try {
        const { data } = await createTargetList(newTargetPayload);
        if (data.success) {
          useMessageStore
            .getState()
            .showMessage('success', 'Таргет-лист успешно создан!');
          redirect();
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
