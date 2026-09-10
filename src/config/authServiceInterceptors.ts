import { authServiceClient } from 'config/authServiceClient';
import { fetchRefreshToken } from 'api/authApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { useMessageStore } from 'components';
import { handleErrorServiceInterceptors } from 'utils';

export const authServiceInterceptors = () => {
  authServiceClient.interceptors.request.use(
    (config) => {
      const tokenInfo = localStorage.getItem('auth');

      if (tokenInfo && config.headers) {
        const { state } = JSON.parse(tokenInfo);
        if (state.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authServiceClient.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        // originalRequest._isRetry = true;
        try {
          console.log('Зашел');
          const response = await fetchRefreshToken();
          if (response.data.access_token) {
            useAuthStore.getState().setToken(response.data.access_token);
            originalRequest._isRetry = true;
            return authServiceClient.request(originalRequest);
          }
        } catch (e) {
          originalRequest._isRetry = false;
          console.log('НЕ АВТОРИЗОВАН!!!');
          return useAuthStore.getState().logOut();
        }
      }
      console.log('Уровень дальше...');
      if (error.response.status !== 422 && error.response.data.message) {
        useMessageStore
          .getState()
          .showMessage('error', error.response.data.message);
      }
      // throw error;
      // handleErrorServiceInterceptors(error);
    }
  );
};
