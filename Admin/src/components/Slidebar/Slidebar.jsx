import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="text-center py-4 text-xl font-bold border-b border-blue-700">Admin Panel</div>
      <nav className="flex-grow">
        <Link to="/certificates-requests" className="block px-4 py-2 hover:bg-blue-700">
          Certificates Requests
        </Link>
      </nav>
      <div className="p-4 text-sm border-t border-blue-700">
        Logged in as Admin
      </div>
    </div>
  );
}

export default Sidebar;
