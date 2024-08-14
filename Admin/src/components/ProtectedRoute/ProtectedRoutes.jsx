import React from 'react';
import { Navigate } from 'react-router-dom';

// Check if token exists in local storage to verify authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  // If no token, redirect to login page
  return token ? children : <Navigate to="https://full-stack-bytesminders.onrender.com/api/v1/admin/login" />;
};

export default ProtectedRoute;
