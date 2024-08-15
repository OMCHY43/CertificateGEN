import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminLayout from "./Layout/layout";
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen flex">
      <Router>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/" element={token ? <Navigate to="/admin/certificates-requests" /> : <AdminLogin />} />

          {/* Protected Admin Routes */}
          {token && (
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="certificates-requests" />} /> {/* Default route */}
              <Route path="certificates-requests" element={<CertificatesRequests />} />
              <Route path="addworkshop" element={<AddWorkShop />} />
            </Route>
          )}

          {/* Redirect to login if no token */}
          {!token && <Route path="*" element={<Navigate to="/" replace />} />}
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
