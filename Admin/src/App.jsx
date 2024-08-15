import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Slidebar/Slidebar';
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoutes.jsx';  // Import your ProtectedRoute component

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Router>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-grow p-6 bg-gray-100">
          <button
            className="md:hidden text-gray-800 mb-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <Routes>
            {/* Wrap protected routes with ProtectedRoute */}
            <Route
              path="/certificates-requests"
              element={
                <ProtectedRoute>
                  <CertificatesRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Addworkshop"
              element={
                <ProtectedRoute>
                  <AddWorkShop />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
