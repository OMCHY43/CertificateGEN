import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null for loading

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Make a request to the backend to verify the token
        const response = await axios.get("http://localhost:5000/api/v1/Admin/CheckToken", {
          withCredentials: true, 
        });

        if (response.status === 200 && response.data.token) {
          setIsAuthorized(true); // Token is valid
        } else {
          setIsAuthorized(false); // Token is invalid
        }
      } catch (error) {
        console.error("Error verifying token", error);
        setIsAuthorized(false); // Error occurred, treat as unauthorized
      }
    };

    verifyToken();
  }, []);

  // Show a loading indicator while checking authorization
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // If not authorized, redirect to login
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  // If authorized, render the children components
  return children;
};

export default ProtectedRoute;
