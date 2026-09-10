import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { fetchRoles, IRole } from 'api/rolesApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

interface IRolesStore {
  roles: IRole[];
  getRoles: () => void;
}

export const useRolesStore = create<IRolesStore>()(
  persist(
    immer((set) => ({
      roles: [],
      getRoles: async () => {
        useAuthStore.getState().setLoading(true);

        try {
          const { data } = await fetchRoles();

          if (data) {
            set({ roles: data.roles });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    { name: 'roles' }
  )
);
