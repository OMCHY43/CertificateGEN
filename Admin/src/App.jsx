import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Slidebar/Slidebar.jsx';
import CertificatesRequests from './pages/CerificatesRequest.jsx';

const App = () => {
  return (
    <div className="min-h-screen flex">
      <Router>
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/certificates-requests" element={<CertificatesRequests />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
