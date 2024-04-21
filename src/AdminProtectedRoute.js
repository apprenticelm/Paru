import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const AdminProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!roles.includes(user?.user?.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};
