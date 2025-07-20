import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout, AdminLayout } from './layout'
import { HomePage, AboutPage, LoginPage, RegisterPage, PackagesPage, DestinationsPage, ContactPage, DashboardPage, BookingsPage } from '@zenra/pages'
import { useAppSelector } from '@zenra/store'
import { Navigate } from 'react-router-dom'
import { AdminPackagesPage } from './pages/admin'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  return !isAuthenticated || user?.role !== 'admin' ? <Navigate to="/login" /> : <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
        </Route> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="packages" element={<AdminPackagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App