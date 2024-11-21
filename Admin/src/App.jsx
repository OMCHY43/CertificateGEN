import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminLayout from './Layout/layout';
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; 
import Types from './Pages/Types';
import Overview from './Pages/Overview';

const App = () => {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes under AdminLayout */}
            <Route path='Overview' element={<Overview/>} />
            <Route path="certificates-requests" element={<CertificatesRequests />} />
            <Route path="addworkshop" element={<AddWorkShop />} />
            <Route path="Types" element={<Types />} />
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
