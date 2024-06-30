// components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth); // Get the user state from Redux
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
