import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';

interface PrivateRouteProps {
  allowedRoles?: number[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="auth/login" />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.idRol))) {
    return <Navigate to="auth/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
