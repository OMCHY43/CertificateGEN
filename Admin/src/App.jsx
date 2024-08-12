import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Slidebar/Slidebar';
import CertificatesRequests from './Pages/CerificatesRequest';
import AddWorkShop from './Pages/AddWorkShop';

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
            <Route path="/certificates-requests" element={<CertificatesRequests />} />
            <Route path='/Addworkshop' element={<AddWorkShop/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
