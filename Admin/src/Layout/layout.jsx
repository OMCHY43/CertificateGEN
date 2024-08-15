import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/Slidebar/Slidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
