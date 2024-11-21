import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // loading

  useEffect(() => {
    const verifyToken = async () => {
      try {
      
        const response = await axios.get("/api/v1/Admin/CheckToken", {
          withCredentials: true, 
        });

        if (response.status === 200 && response.data.token) {
          setIsAuthorized(true); 
        } else {
          setIsAuthorized(false); 
        }
      } catch (error) {
        console.error("Error verifying token", error);
        setIsAuthorized(false); 
      }
    };

    verifyToken();
  }, []);

  
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
