import axios, { AxiosError } from 'axios';
import { useAuthStore } from 'pages/MainPage/useAuthStore';

export const handleErrorServiceInterceptors = (e: Error | AxiosError) => {
  const errorMsg: string = extractErrorMessage(e);

  if (
    axios.isAxiosError(e) &&
    (e.response?.status === 401 || e.response?.status === 403)
  ) {
    useAuthStore.getState().logOut();
  }

  useAuthStore.getState().setError(errorMsg);
};

export const extractErrorMessage = (
  e: Error | AxiosError | unknown
): string => {
  if (axios.isAxiosError(e)) {
    const statusCode = e.response?.status;

    if (statusCode) {
      if (e.response?.data?.message) {
        return e.response?.data?.message;
      }

      if (e.response?.data?.errors) {
        return Object.values(e.response?.data?.errors).flat()[0] as string;
      }

      if (statusCode >= 500 && e.response?.data?.error) {
        return e.response?.data?.error;
      }
    }
  } else if (e instanceof Error && e?.message) {
    return e.message;
  }

  return 'Something went wrong';
};
