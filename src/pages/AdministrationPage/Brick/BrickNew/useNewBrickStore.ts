import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { IOrganization } from 'store/useOrganizationsStore';
import { createBrick, fetchFreeSource } from 'api';
import {
  ICreateBrickPayload,
  IFreeBrick,
  IGetFreeSourcePayload,
  LevelBrickType,
} from 'api/brickApi';
import { useMessageStore } from 'components';
import { fetchUsersBySearch, IUser } from 'api/userApi';

interface INewBrickStore {
  organizations: IOrganization[];
  blocks: IFreeBrick[];
  setBlocks: (val: []) => void;
  setOrganizations: (val: []) => void;
  setHighBlocks: (val: []) => void;
  highBlocks: IFreeBrick[];
  performers: IUser[];
  getPerformers: (search: string) => void;
  getFreeSource: (
    mode: LevelBrickType,
    name?: string,
    address?: string
  ) => void;
  addBlock: (payload: ICreateBrickPayload, redirect: () => void) => void;
}

export const useNewBrickStore = create<INewBrickStore>()(
  immer((set, get) => ({
    organizations: [],
    blocks: [],
    highBlocks: [],
    performers: [],
    getFreeSource: async (mode, name, address) => {
      useAuthStore.getState().setLoading(true);
      try {
        const payload: IGetFreeSourcePayload = { mode, name, address };

        const { data } = await fetchFreeSource(payload);

        if (data) {
          if (mode === 'low') {
            set({ organizations: data as IOrganization[] });
          }
          if (mode === 'medium') {
            set({ blocks: data as IFreeBrick[] });
          }
          if (mode === 'high') {
            set({ highBlocks: data as IFreeBrick[] });
          }
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
    addBlock: async (payload, redirect) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await createBrick(payload);
        if (data.success) {
          useMessageStore
            .getState()
            .showMessage('success', 'Новый брик успешно создан!');
          redirect();
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
    setBlocks: (val) => {
      set({ blocks: val });
    },
    setOrganizations: (val) => {
      set({ organizations: val });
    },
    setHighBlocks: (val) => {
      set({ highBlocks: val });
    },
  }))
);
