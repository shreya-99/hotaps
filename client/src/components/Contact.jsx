/**
 * Contact Component
 * ─────────────────────────────────────────────────────────────
 * Two-column layout:
 *   Left  — Contact info cards (phone, WhatsApp, email, address)
 *   Right — Contact form that POSTs to /api/contact on the server
 *
 * WhatsApp number and phone are pulled from SITE_CONFIG.
 * The form submits to the Express backend which can send email/notify.
 */
import { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG, getWhatsAppUrl, getTelUrl, getMailtoUrl } from '../config/site.config';
import './Contact.css';

/** Individual info card (phone/email/etc) */
const InfoCard = ({ icon, label, value, href, external }) => (
  <a
    href={href}
    className="contact__info-card glass-card"
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    aria-label={`${label}: ${value}`}
  >
    <div className="contact__info-icon" aria-hidden="true">{icon}</div>
    <div>
      <p className="contact__info-label">{label}</p>
      <p className="contact__info-value">{value}</p>
    </div>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact__info-arrow" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </a>
);

const Contact = () => {
  const headingRef  = useScrollAnimation();
  const formRef     = useScrollAnimation();
  const infoRef     = useScrollAnimation();

  // ── Form State ──────────────────────────────────────────────
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // POSTs to Express route — see server/routes/contact.js
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const { contact } = SITE_CONFIG;

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">

      {/* Decorative orb */}
      <div className="orb orb-teal contact__orb" aria-hidden="true" />

      <div className="container">

        {/* Section header */}
        <div ref={headingRef} className="reveal">
          <p className="section-label">Get In Touch</p>
          <h2 id="contact-heading" className="section-heading">
            Ready to Build{' '}
            <span className="gradient-text">Something Great?</span>
          </h2>
          <p className="section-subheading">
            Tell us about your project and we'll get back to you within 24 hours.
            Or just WhatsApp us — we're always around.
          </p>
        </div>

        <div className="contact__body">

          {/* ── Left: Info Cards ── */}
          <div ref={infoRef} className="reveal contact__info">

            {/* WhatsApp — primary channel */}
            <InfoCard
              icon="💬"
              label="WhatsApp (Fastest Reply)"
              value={contact.phone}
              href={getWhatsAppUrl()}
              external
            />

            {/* Phone */}
            <InfoCard
              icon="📞"
              label="Call Us"
              value={contact.phone}
              href={getTelUrl()}
            />

            {/* Email */}
            <InfoCard
              icon="✉️"
              label="Email"
              value={contact.email}
              href={getMailtoUrl()}
            />

            {/* Address */}
            <InfoCard
              icon="📍"
              label="Based In"
              value={contact.address}
              href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
              external
            />

            {/* Response time note */}
            <p className="contact__response-note">
              ⚡ Typical response time: <strong>under 2 hours</strong> on WhatsApp
            </p>
          </div>

          {/* ── Right: Contact Form ── */}
          <div ref={formRef} className="reveal contact__form-wrap glass-card">
            {status === 'success' ? (
              // Success state
              <div className="contact__success" role="alert">
                <div className="contact__success-icon">🎉</div>
                <h3>Message Received!</h3>
                <p>Thank you, {form.name || 'friend'}! We'll get back to you within 24 hours. Or for instant reply, WhatsApp us.</p>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  💬 WhatsApp Now
                </a>
                <button className="btn btn-secondary" onClick={() => setStatus('idle')}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form" noValidate>
                <h3 className="contact__form-title">Send Us a Message</h3>

                {/* Name + Email row */}
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Arjun Mehta"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="arjun@startup.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Phone + Service row */}
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="service">Service Needed *</label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service…</option>
                      {SITE_CONFIG.services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                      <option value="multiple">Multiple Services</option>
                      <option value="consulting">Consulting / Not Sure</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="contact__field">
                  <label htmlFor="message">Tell Us About Your Project *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your idea, timeline, and budget range…"
                    rows="5"
                    required
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p className="contact__error" role="alert">
                    Something went wrong. Please try WhatsApp instead.
                  </p>
                )}

                {/* Submit */}
                <div className="contact__form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary contact__submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="contact__spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    💬 Or WhatsApp Us
                  </a>
                </div>

                <p className="contact__privacy">
                  🔒 Your information is private and will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
