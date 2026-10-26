import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import TracksPage from '../pages/TracksPage';
import SchedulePage from '../pages/SchedulePage';
import PrizesPage from '../pages/PrizesPage';
import TeamPage from '../pages/TeamPage';
import FAQsPage from '../pages/FAQsPage';
import ContactPage from '../pages/ContactPage';
import RegisterPage from '../pages/RegisterPage';
import PaymentSuccessPage from '../pages/PaymentSuccessPage';
import PaymentFailurePage from '../pages/PaymentFailurePage';
import PaymentHistoryPage from '../pages/PaymentHistoryPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';

// Placeholder for future pages
const ComingSoon = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="font-display text-4xl font-bold text-white mb-3">{title}</h1>
      <p className="text-gray-400">This page is coming soon.</p>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Main */}
      <Route path="/"         element={<HomePage />} />
      <Route path="/about"    element={<AboutPage />} />
      <Route path="/tracks"   element={<TracksPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/prizes"   element={<PrizesPage />} />
      <Route path="/team"     element={<TeamPage />} />
      <Route path="/faqs"     element={<FAQsPage />} />
      <Route path="/contact"  element={<ContactPage />} />

      {/* Registration & Payment */}
      <Route path="/register"         element={<RegisterPage />} />
      <Route path="/payment/success"  element={<PaymentSuccessPage />} />
      <Route path="/payment/failure"  element={<PaymentFailurePage />} />
      <Route path="/payment/history"  element={<PaymentHistoryPage />} />

      {/* Admin */}
      <Route path="/admin/payments" element={<AdminDashboardPage />} />

      {/* 404 */}
      <Route path="*" element={<ComingSoon title="404 — Page Not Found" />} />
    </Routes>
  );
}
