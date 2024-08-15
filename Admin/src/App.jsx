import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Slidebar/Slidebar';
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';
import AdminLayout from "./Layout/layout"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./components/AdminLogin/AdminLogin";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen flex">
      <Router>
        {/* Only show sidebar if token exists */}
        {token && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <div className="flex-grow p-6 bg-gray-100">
          {/* Sidebar Toggle Button - Only for mobile screens */}
          {token && (
            <button
              className="md:hidden text-gray-800 mb-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          )}

          <Routes>
            {/* Admin Login Route */}
            <Route path="/" element={<AdminLogin />} />

            {/* Admin Routes (Protected) */}
            {token ? (
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="certificates-requests" element={<CertificatesRequests />} />
                <Route path="add-workshop" element={<AddWorkShop />} />
              </Route>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </div>

        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
