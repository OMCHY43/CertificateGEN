// src/App.jsx
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import Certificates from "./components/Certificates/Certificates";
import Verifyed from "./components/Verifyed/Verifyed";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route path="/" element={<Certificates />} />
          <Route path="/VerifyedUser/:id" element={<Verifyed />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
