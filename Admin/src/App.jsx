import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminLayout from "./Layout/layout";
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If token exists, allow access
  return children;
};

const App = () => {
  return (
    <div className="min-h-screen flex">
      <Router>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="certificates-requests" element={<CertificatesRequests />} />
            <Route path="addworkshop" element={<AddWorkShop />} />
          </Route>

          {/* Redirect all unmatched routes to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
