import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 

  return token ? children : <Navigate to="https://full-stack-bytesminders.onrender.com/api/v1/admin/login" />;
};

export default ProtectedRoute;
