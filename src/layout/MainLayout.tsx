import { Header, Footer } from '@zenra/components';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner'

export const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      <Toaster richColors />
    </div>
  );
};