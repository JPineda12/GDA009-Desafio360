import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  allowedRoles?: number[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  console.log("abcde")

  if (!isAuthenticated()) {
    return <Navigate to="auth/login" />;
  }
  console.log("xxxx")

  if (allowedRoles && (!user || !allowedRoles.includes(user.idRol))) {
    return <Navigate to="auth/login" />;
  }
  console.log("redirect to home")
  return <Outlet />;
};

export default PrivateRoute;
