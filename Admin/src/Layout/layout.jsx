import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Slidebar/Slidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default state for sidebar

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
