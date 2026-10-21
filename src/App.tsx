import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { PageTransition } from './components/reactbits/PageTransition';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { QuotationPage } from './pages/QuotationPage';
import { CareersPage } from './pages/CareersPage';
import { PortfolioPage } from './pages/PortfolioPage';

import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { Squares } from './components/reactbits/Squares';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isPortfolioRoute = location.pathname === '/portfolio';

  return (
    <div className="flex flex-col min-h-screen bg-[#050816] text-[#F5F8FF] selection:bg-[#2563FF]/30 selection:text-[#22D3EE] relative">
      <ScrollToTop />

      {/* Global Top-to-Bottom Animated Ambient Grid & Scanbeam across all pages */}
      {!isAdminRoute && !isPortfolioRoute && (
        <>
          <div className="fixed inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
            <Squares
              direction="down"
              speed={0.35}
              squareSize={48}
              borderColor="rgba(148, 163, 184, 0.06)"
              hoverFillColor="rgba(37, 99, 255, 0.12)"
            />
          </div>
          <div className="top-to-bottom-scanbeam" />
        </>
      )}

      {!isAdminRoute && !isPortfolioRoute && <Navbar />}
      <PageTransition>
        <main className="flex-grow relative z-10">
          <Routes>
            {/* Public Agency Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/founder" element={<Navigate to="/portfolio" replace />} />
            <Route path="/kabil" element={<Navigate to="/portfolio" replace />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quotation" element={<Navigate to="/admin/quotation" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Admin & Server Management Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/quotation" element={<QuotationPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </PageTransition>
      {!isAdminRoute && !isPortfolioRoute && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
