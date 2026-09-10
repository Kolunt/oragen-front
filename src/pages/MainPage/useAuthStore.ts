import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { fetchAuth } from 'api';
import { useUserStore } from 'store/useUserStore';
import { IUser } from 'api/userApi';
import { fetchRefreshToken } from 'api/authApi';
import { AxiosError } from 'axios';

interface IAuthStore {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string;
  errorAuth: string[];
  token: string;
  changeLoggedIn: (login: string, password: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  logOut: () => void;
  // getRefreshToken: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      token: '',
      isLoggedIn: false,
      isLoading: false,
      error: '',
      errorAuth: [],
      changeLoggedIn: async (login, password) => {
        try {
          const { data } = await fetchAuth(login, password);
          if (data) {
            set({ isLoggedIn: true });
            set({ token: data.access_token });
            set({ error: '' });
            useUserStore.getState().setMe(data.user);
          }
        } catch (e) {
          if (e instanceof AxiosError) {
            const { response: { status, data } = {} } = e;
            // @ts-ignore
            set({ errorAuth: Object.values(data).flat() });
          }
        }
      },
      logOut: async () => {
        set({ isLoading: true });
        try {
          set({ token: '', isLoggedIn: false, isLoading: false, error: '' });
          useUserStore.getState().setMe({} as IUser);
          console.log('logout');
        } finally {
          set({ isLoading: false });
          localStorage.clear();
        }
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      /*   getRefreshToken: async () => {
        set({ isLoading: true });
        try {
          const { data } = await fetchRefreshToken();
          if (data) {
            set({ token: data.access_token });
          }
        } finally {
          set({ isLoading: false });
        }
      },*/
      setToken: (token) => set({ token: token }),
    })),
    {
      name: 'auth',
      partialize: (state) => ({
        token: state.token,
        error: state.error,
        userId: useUserStore.getState().me.id,
      }),
    }
  )
);
