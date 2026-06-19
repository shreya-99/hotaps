'use client'

import { SITE_CONFIG, getWhatsAppUrl } from '../config/site.config'
import { Icon } from './Icon'
import './Footer.css'

const currentYear = new Date().getFullYear()

const Footer = () => {
  const { brand, contact, social, services } = SITE_CONFIG

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer" role="contentinfo">

      <div className="footer__cta-banner">
        <div className="container footer__cta-inner">
          <div>
            <h2 className="footer__cta-title">Have a Project in Mind?</h2>
            <p className="footer__cta-sub">Let's turn your idea into a live product. First consultation is free.</p>
          </div>
          <div className="footer__cta-buttons">
            <a
              href={SITE_CONFIG.booking.calendly.startsWith('http') ? SITE_CONFIG.booking.calendly : getWhatsAppUrl('Hi! I\'d like to book a free discovery call.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {SITE_CONFIG.booking.calendlyLabel}
            </a>
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="btn btn-secondary">
              Send a Message
            </a>
          </div>
        </div>
      </div>

      <div className="footer__body">
        <div className="container footer__grid">

          <div className="footer__col footer__col--brand">
            <a href="/" className="footer__logo" aria-label={`${brand.name} — home`}>
              <svg className="footer__logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="url(#footer-logo-grad)" />
              <defs>
                <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00C9A7" />
                  <stop offset="100%" stopColor="#845EF7" />
                </linearGradient>
              </defs>
            </svg>
              <span className="footer__logo-name">{brand.shortName}</span>
            </a>
            <p className="footer__brand-desc">{brand.description}</p>
            <div className="footer__social" aria-label="Social media links">
              <SocialLink href={social.linkedin} label="LinkedIn" icon={<LinkedInIcon />} external />
              <SocialLink href="#contact" label="Email us — scroll to contact form" icon={<GmailIcon />} />
            </div>
          </div>

          <nav className="footer__col" aria-label="Services links">
            <h3 className="footer__col-title">Services</h3>
            <ul className="footer__links" role="list">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" onClick={(e) => scrollTo(e, '#services')}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Company links">
            <h3 className="footer__col-title">Company</h3>
            <ul className="footer__links" role="list">
              <li><a href="#why-us"    onClick={(e) => scrollTo(e, '#why-us')}>Why {brand.shortName}</a></li>
              <li><a href="#process"   onClick={(e) => scrollTo(e, '#process')}>How We Work</a></li>
              <li><a href="#tech-stack" onClick={(e) => scrollTo(e, '#tech-stack')}>Tech Stack</a></li>
              <li><a href="#team"       onClick={(e) => scrollTo(e, '#team')}>Our Team</a></li>
              <li><a href="#testimonials" onClick={(e) => scrollTo(e, '#testimonials')}>Reviews</a></li>
              <li><a href="#contact"    onClick={(e) => scrollTo(e, '#contact')}>Contact</a></li>
            </ul>
          </nav>

          <div className="footer__col" aria-label="Contact information">
            <h3 className="footer__col-title">Contact</h3>
            <ul className="footer__contact-list" role="list">
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="WhatsApp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">{contact.phone}</a>
              </li>
              <li>
                <Icon name="Mail" size={15} aria-label="Email" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <Icon name="MapPin" size={15} aria-label="Location" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

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
  )
}

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
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const GmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6l8.586 6.293a2 2 0 0 0 2.828 0L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 6l7 5M22 6l-7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default Footer
