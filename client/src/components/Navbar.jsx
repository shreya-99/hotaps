/**
 * Navbar Component
 * ─────────────────────────────────────────────────────────────
 * Features:
 *  - Transparent on top, frosted-glass on scroll
 *  - Smooth scroll to anchor links (#services, #contact, etc.)
 *  - Hamburger menu for mobile
 *  - Configurable contact info from site.config.js
 */
import { useState, useEffect } from 'react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site.config';
import './Navbar.css';

// Navigation links — edit labels/hrefs here to add/remove nav items
const NAV_LINKS = [
  { label: 'Services',    href: '#services' },
  { label: 'Why Us',      href: '#why-us' },
  { label: 'Process',     href: '#process' },
  { label: 'Tech Stack',  href: '#tech-stack' },
  { label: 'Contact',     href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false); // Has user scrolled?
  const [menuOpen, setMenuOpen]     = useState(false); // Is mobile menu open?
  const [activeLink, setActiveLink] = useState('');    // Currently active section

  // ── Detect scroll to switch navbar from transparent → glass ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close menu on resize to desktop width ────────────────────
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Smooth scroll handler ─────────────────────────────────────
  // Prevents default anchor jump and animates smoothly
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveLink(href);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">

        {/* ── Logo ── */}
        <a href="/" className="navbar__logo" aria-label="House of Technology — home">
          <span className="navbar__logo-icon">⬡</span>
          <div className="navbar__logo-text">
            <span className="navbar__logo-brand">{SITE_CONFIG.brand.shortName}</span>
            <span className="navbar__logo-sub">House of Technology</span>
          </div>
        </a>

        {/* ── Desktop Nav Links ── */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeLink === link.href ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA — WhatsApp button ── */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary navbar__cta"
          aria-label="Chat with us on WhatsApp"
        >
          {/* WhatsApp icon inline SVG */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp Us
        </a>

        {/* ── Mobile Hamburger Button ── */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp navbar__mobile-cta"
            >
              💬 Chat on WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
