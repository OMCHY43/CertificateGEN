// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Brand</div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/Certificates" className="hover:text-gray-400">Certificates</Link>
          <Link to="/" className="hover:text-gray-400">Arrivals</Link>
          <Link to="/" className="hover:text-gray-400">Contact</Link>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>
      <div
        className={`md:hidden fixed top-0 right-0 bg-gray-900 w-3/4 h-full p-6 transition-transform transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>
        <div className="mt-12 flex flex-col space-y-4">
          <Link to="/" className="text-xl">Home </Link>
          <Link to="/Certificates" className="text-xl">Certificates </Link>
          <Link to="/" className="text-xl">Arrivals </Link>
          <Link to="/" className="text-xl">Contact </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
