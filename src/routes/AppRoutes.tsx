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
import PaymentPage from '../pages/payment/PaymentPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminPortalPage from '../pages/admin/AdminPortalPage';
import JudgePortalPage from '../pages/judge/JudgePortalPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterAuthPage from '../pages/auth/RegisterAuthPage';
import ParticipantDashboardPage from '../pages/dashboard/ParticipantDashboardPage';
import SubmitIdeaPage from '../pages/dashboard/SubmitIdeaPage';

// Placeholder for 404
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="text-center glass-card p-8 rounded-3xl border border-white/10 max-w-md mx-auto">
      <h1 className="font-display text-4xl font-bold text-white mb-2">404</h1>
      <p className="text-gray-400 text-sm mb-6">The page you are looking for does not exist.</p>
      <a href="/" className="btn-primary text-xs py-2 px-5 inline-block">
        Return Home
      </a>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/prizes" element={<PrizesPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterAuthPage />} />

      {/* Participant Dashboard */}
      <Route path="/dashboard" element={<ParticipantDashboardPage />} />
      <Route path="/dashboard/submit" element={<SubmitIdeaPage />} />

      {/* Judge & Admin Portals */}
      <Route path="/judge" element={<JudgePortalPage />} />
      <Route path="/admin" element={<AdminPortalPage />} />
      <Route path="/admin/payments" element={<AdminDashboardPage />} />

      {/* Registration & Payments */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route path="/payment/failure" element={<PaymentFailurePage />} />
      <Route path="/payment/history" element={<PaymentHistoryPage />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
