import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { fetchUsers, IGetUser, IUser } from 'api/userApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import {
  IUpdateVisitParticipantsPayload,
  updateVisitParticipants,
} from 'api/visitsApi';

interface IAddVisitorStore {
  isShow: boolean;
  participants: IUser[];
  users: IUser[];
  changeIsShow: (value: boolean) => void;
  setParticipants: (participants: IUser[]) => void;
  getUsers: (search: string) => void;
}

export const useAddVisitorStore = create<IAddVisitorStore>()(
  persist(
    immer((set) => ({
      isShow: false,
      participants: [],
      users: [],
      changeIsShow: (value) => set({ isShow: value }),
      setParticipants: (data) => set({ participants: data }),
      getUsers: async (search) => {
        useAuthStore.getState().setLoading(true);
        const like = JSON.stringify({
          name: search,
        });

        const params: IGetUser = {
          like,
        };

        const payload = {
          paginationMethod: 'full',
          page: 1,
          pageSize: 10,
        };

        try {
          const { data } = await fetchUsers(payload, params);

          if (data) {
            set({ users: data.data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    { name: 'addVisitor' }
  )
);
