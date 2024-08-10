// src/pages/LandingPage.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <section className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg mb-8">Discover amazing products and offers!</p>
          <a
            href="#shop"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
