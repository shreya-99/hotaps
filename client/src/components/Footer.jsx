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

            {/* Social Icons — LinkedIn + Gmail only */}
            <div className="footer__social" aria-label="Social media links">
              <SocialLink
                href={social.linkedin}
                label="LinkedIn"
                icon={<LinkedInIcon />}
                external
              />
              <SocialLink
                href={`mailto:${contact.email}`}
                label="Email us on Gmail"
                icon={<GmailIcon />}
              />
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
              <li><a href="#why-us" onClick={(e) => scrollTo(e, '#why-us')}>Why {brand.shortName}</a></li>
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
const SocialLink = ({ href, label, icon, external }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="footer__social-link"
    aria-label={label}
  >
    {icon}
  </a>
);

/* ── Icons: LinkedIn + Gmail only ── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

/* Gmail "M" envelope icon */
const GmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6l8.586 6.293a2 2 0 0 0 2.828 0L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 6l7 5M22 6l-7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default Footer;
