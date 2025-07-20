import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Header } from '../components/admin';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        <div className="sticky top-0 z-50 bg-white shadow">
          <Header onMenuClick={toggleSidebar} />
        </div>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};