/**
 * App.jsx — Root Application Component
 * ─────────────────────────────────────────────────────────────
 * Assembles all sections in order and wraps with:
 *  - HelmetProvider (for per-page SEO meta tags)
 *  - React Router (for future multi-page expansion)
 *  - Toaster (for toast notifications from the contact form)
 *
 * Page structure:
 *   Navbar → Hero → Services → WhyUs → Process → Testimonials → Contact → Footer
 */
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout components
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Services     from './components/Services';
import WhyUs        from './components/WhyUs';
import Process      from './components/Process';
import TechStack   from './components/TechStack';
import Testimonials from './components/Testimonials';
import Contact      from './components/Contact';
import Footer       from './components/Footer';

// Site config for SEO defaults
import { SITE_CONFIG } from './config/site.config';

// Global styles
import './index.css';

/**
 * HomePage
 * All sections assembled. Each section has its own id for anchor nav.
 */
const HomePage = () => (
  <>
    {/* ── Per-page SEO — overrides the static index.html defaults ── */}
    <Helmet>
      <title>{SITE_CONFIG.seo.defaultTitle}</title>
      <meta name="description" content={SITE_CONFIG.seo.defaultDescription} />
    </Helmet>

    {/* ── Sticky Navbar ── */}
    <Navbar />

    {/* ── Page Sections ── */}
    <main id="main-content">
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <TechStack />
      <Testimonials />
      <Contact />
    </main>

    <Footer />

    {/* ── Toast notification system ── */}
    {/* Used by contact form for success/error messages */}
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--bg-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
        },
        success: {
          iconTheme: { primary: '#00C9A7', secondary: '#07070F' },
        },
      }}
    />
  </>
);

/**
 * App
 * Router wrapper — easy to add /about, /blog, etc. pages in the future.
 */
const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        {/* Home / landing page */}
        <Route path="/" element={<HomePage />} />

        {/* 404 fallback — redirects to home (or build a 404 page here) */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
