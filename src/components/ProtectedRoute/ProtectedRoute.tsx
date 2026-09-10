import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { ROUTES } from 'enums';

export const ProtectedRoute = ({ children }: any) => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  return token ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.MAIN} replace state={location} />
  );
};
