// src/App.jsx
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Layout from './Layout/Layout';
import Certificates from './components/Certificates/Certificates';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='/Certificates' element={<Certificates />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
