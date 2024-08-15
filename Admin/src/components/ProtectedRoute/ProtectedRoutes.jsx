import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Outlet is used to render child routes

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); 

  return token ? <Outlet /> : <Navigate to="/AdminLogin" />;
};

export default ProtectedRoute;
