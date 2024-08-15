import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Slidebar/Slidebar';
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';
import AdminLayout from "./Layout/layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./components/AdminLogin/AdminLogin";
import PrivateRoute from './components/PrivateRoute'; // For protecting routes

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen flex">
      <Router>
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            {/* Public Route - Admin Login */}
            <Route path="/" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<PrivateRoute token={token}><AdminLayout /></PrivateRoute>}>
              <Route path="certificates-requests" element={<CertificatesRequests />} />
              <Route path="Addworkshop" element={<AddWorkShop />} />
            </Route>

            {/* Redirect to login if no match */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Sidebar visible only if token exists */}
        {token && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
