import React from 'react';

import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  


  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-blue-800 text-white flex flex-col z-50`}
    >
      <div className="text-center py-4 text-xl font-bold border-b border-blue-700">
        Admin Panel
      </div>
      <nav className="flex-grow">
        <Link
          to="/admin/Overview"
          className="block px-4 py-2 hover:bg-blue-700"
          onClick={() => setSidebarOpen(false)}
        >
          Overview
        </Link>
        <Link
          to="/admin/certificates-requests"
          className="block px-4 py-2 hover:bg-blue-700"
          onClick={() => setSidebarOpen(false)}
        >
          Certificates Requests
        </Link>
        <Link
          to="/admin/addworkshop"
          className="block px-4 py-2 hover:bg-blue-700"
          onClick={() => setSidebarOpen(false)}
        >
          Add Workshop
        </Link>
        <Link
          to="/admin/Types"
          className="block px-4 py-2 hover:bg-blue-700"
          onClick={() => setSidebarOpen(false)}
        >
          Types
        </Link>
      </nav>
      <div className="p-4 text-sm border-t border-blue-700">
        Logged in as Admin
      </div>
    </div>
  );
};

export default Sidebar;
