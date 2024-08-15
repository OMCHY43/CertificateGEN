import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Slidebar/Slidebar';
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./components/AdminLogin/AdminLogin";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen flex">
      <Router>
        {token && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <div className="flex-grow p-6 bg-gray-100">
          <button
            className="md:hidden text-gray-800 mb-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <Routes>
            <Route path="/AdminLogin" element={AdminLogin} />
            <Route path="/certificates-requests" element={<CertificatesRequests /> } />
            <Route path="/AddWorkShop" element={<AddWorkShop /> } />
            <Route path="/" element={<Navigate to={token ? (<Sidebar/>) : (<AdminLogin/> ) } />  } />
            <Route path="*" element={<Navigate to={token ? "/certificates-requests" : "/AdminLogin"} />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;