import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Header } from '../components/admin';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'md:ml-64' : ''}`}>
        <Header onMenuClick={toggleSidebar} />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};