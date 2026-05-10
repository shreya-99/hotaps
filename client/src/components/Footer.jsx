/**
 * Footer Component
 * ─────────────────────────────────────────────────────────────
 * Multi-column footer with:
 *  - Brand + description
 *  - Services quick links
 *  - Contact info (configurable from site.config.js)
 *  - Social links
 *  - Copyright bar
 */
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site.config';
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
  const { brand, contact, social, services } = SITE_CONFIG;

  // Smooth scroll helper for footer anchor links
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">

      {/* ── Pre-footer CTA Banner ── */}
      <div className="footer__cta-banner">
        <div className="container footer__cta-inner">
          <div>
            <h2 className="footer__cta-title">Have a Project in Mind?</h2>
            <p className="footer__cta-sub">Let's turn your idea into a live product. First consultation is free.</p>
          </div>
          <div className="footer__cta-buttons">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              💬 WhatsApp Us
            </a>
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="btn btn-secondary">
              Send a Message
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="footer__body">
        <div className="container footer__grid">

          {/* Column 1 — Brand */}
          <div className="footer__col footer__col--brand">
            <a href="/" className="footer__logo" aria-label={`${brand.name} — home`}>
              <span className="footer__logo-icon">⬡</span>
              <span className="footer__logo-name">{brand.shortName}</span>
            </a>
            <p className="footer__brand-desc">{brand.description}</p>

            {/* Social Icons */}
            <div className="footer__social" aria-label="Social media links">
              <SocialLink href={social.linkedin} label="LinkedIn" icon={<LinkedInIcon />} />
              <SocialLink href={social.twitter}  label="Twitter/X" icon={<TwitterIcon />} />
              <SocialLink href={social.github}   label="GitHub" icon={<GitHubIcon />} />
              <SocialLink href={social.instagram} label="Instagram" icon={<InstagramIcon />} />
            </div>
          </div>

          {/* Column 2 — Services */}
          <nav className="footer__col" aria-label="Services links">
            <h3 className="footer__col-title">Services</h3>
            <ul className="footer__links" role="list">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" onClick={(e) => scrollTo(e, '#services')}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Company */}
          <nav className="footer__col" aria-label="Company links">
            <h3 className="footer__col-title">Company</h3>
            <ul className="footer__links" role="list">
              <li><a href="#why-us" onClick={(e) => scrollTo(e, '#why-us')}>Why HoTaps</a></li>
              <li><a href="#process" onClick={(e) => scrollTo(e, '#process')}>How We Work</a></li>
              <li><a href="#tech-stack" onClick={(e) => scrollTo(e, '#tech-stack')}>Tech Stack</a></li>
              <li><a href="#testimonials" onClick={(e) => scrollTo(e, '#testimonials')}>Reviews</a></li>
              <li><a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>Contact</a></li>
            </ul>
          </nav>

          {/* Column 4 — Contact */}
          <div className="footer__col" aria-label="Contact information">
            <h3 className="footer__col-title">Contact</h3>
            <ul className="footer__contact-list" role="list">
              <li>
                <span aria-label="WhatsApp">💬</span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <span aria-label="Email">✉️</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <span aria-label="Location">📍</span>
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar — Copyright + Legal ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {currentYear} {brand.name}. All rights reserved.
          </p>
          <div className="footer__legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ── Helper: Social Link ── */
const SocialLink = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="footer__social-link"
    aria-label={label}
  >
    {icon}
  </a>
);

/* ── Minimal SVG Icons ── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

export default Footer;
