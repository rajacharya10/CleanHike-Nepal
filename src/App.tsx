import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';

import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/admin/AdminLayout';

import { HomePage } from './pages/HomePage';
import { HikesPage } from './pages/HikesPage';
import { HikeDetailPage } from './pages/HikeDetailPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { DonatePage } from './pages/DonatePage';
import { SponsorsPage } from './pages/SponsorsPage';

import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminDonationsPage } from './pages/admin/AdminDonationsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';

function App() {
  return (
    <BrowserRouter>
      {/* ✅ ADD THIS */}
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="hikes" element={<HikesPage />} />
          <Route path="hikes/:id" element={<HikeDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="sponsors" element={<SponsorsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="donations" element={<AdminDonationsPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;