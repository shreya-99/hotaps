'use client'

import { useState, useEffect } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { SITE_CONFIG, getWhatsAppUrl, getTelUrl, getMailtoUrl } from '../config/site.config'
import { Icon } from './Icon'
import './Contact.css'

const InfoCard = ({ icon, label, value, href, external, onClick, badge }) => (
  <a
    href={href}
    className="contact__info-card glass-card"
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    aria-label={`${label}: ${value}`}
    onClick={onClick}
  >
    <div className="contact__info-icon" aria-hidden="true">{icon}</div>
    <div>
      <p className="contact__info-label">{label}</p>
      <p className="contact__info-value">{value}</p>
    </div>
    {badge
      ? <span className="contact__info-badge">{badge}</span>
      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact__info-arrow" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
    }
  </a>
)

const Contact = () => {
  const headingRef = useScrollAnimation()
  const formRef    = useScrollAnimation()
  const infoRef    = useScrollAnimation()

  const [form, setForm] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hotaps_contact') || '{}')
      return { name: saved.name || '', email: saved.email || '', phone: saved.phone || '', service: '', message: '' }
    } catch { return { name: '', email: '', phone: '', service: '', message: '' } }
  })
  const [status, setStatus]     = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [errors, setErrors]     = useState({})
  const [touched, setTouched]   = useState({})
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [emailCopied, setEmailCopied]   = useState(false)
  const [phoneCopied, setPhoneCopied]   = useState(false)

  useEffect(() => {
    localStorage.setItem('hotaps_contact', JSON.stringify({ name: form.name, email: form.email, phone: form.phone }))
  }, [form.name, form.email, form.phone])

  const validate = (field, value) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required.'
        if (value.trim().length < 2) return 'Name must be at least 2 characters.'
        if (!/^[a-zA-Z\s'.‑-]+$/.test(value)) return 'Name should only contain letters.'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Please enter a valid email address.'
        return ''
      case 'phone': {
        if (!value) return ''
        const digits = value.replace(/[\s\-().+]/g, '')
        const valid = /^(91)?[6-9]\d{9}$/.test(digits) || /^\d{7,15}$/.test(digits)
        return valid ? '' : 'Please enter a valid phone number.'
      }
      case 'service':
        return value ? '' : 'Please select a service.'
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (touched[name]) setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleEmailCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(contact.email).then(() => {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    })
  }

  const handlePhoneCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(contact.phone).then(() => {
      setPhoneCopied(true)
      setTimeout(() => setPhoneCopied(false), 2000)
    })
  }

  const SUGGEST_TEMPLATES = {
    nodejs:     (n) => `Hi, I'm ${n || 'interested'} and looking to build a Node.js backend — REST APIs, database integration, and authentication. My target timeline is 2–3 months. Could we discuss scope and pricing?`,
    reactjs:    (n) => `Hi, I'm ${n || 'reaching out'} and need a React.js web app with a clean, responsive UI. I'd love to discuss the design, features, and timeline with your team.`,
    aws:        (n) => `Hi, I'm ${n || 'reaching out'} and need help setting up AWS infrastructure — cloud hosting, auto-scaling, and CI/CD pipelines. Please share your approach and pricing.`,
    android:    (n) => `Hi, I'm ${n || 'interested'} and want to build an Android app for my business. I need a polished, performant app with a great UX. Looking forward to discussing the project.`,
    ios:        (n) => `Hi, I'm ${n || 'interested'} and looking to develop an iOS application. Could we discuss the features, design, and estimated timeline for delivery?`,
    flutter:    (n) => `Hi, I'm ${n || 'reaching out'} and want a cross-platform Flutter app for both Android and iOS. Please share your process and how you handle UI consistency across platforms.`,
    multiple:   (n) => `Hi, I'm ${n || 'interested'} and need multiple services for my project — full-stack development, cloud, and possibly mobile. Let's schedule a call to go over everything.`,
    consulting: (n) => `Hi, I'm ${n || 'reaching out'} and looking for technical consulting to evaluate my project idea. I'd appreciate your expert opinion on the best tech stack and approach.`,
  }

  const handleSuggest = () => {
    setIsSuggesting(true)
    const template = SUGGEST_TEMPLATES[form.service] || ((n) => `Hi, I'm ${n || 'reaching out'} and interested in your services. Could we schedule a call to discuss my project requirements?`)
    const name = form.name.trim().split(' ')[0]
    setTimeout(() => {
      setForm((prev) => ({ ...prev, message: template(name) }))
      setIsSuggesting(false)
    }, 600)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    const fields = ['name', 'email', 'phone', 'service']
    const newErrors = {}
    const newTouched = {}
    fields.forEach(f => { newTouched[f] = true; newErrors[f] = validate(f, form[f]) })
    setTouched(newTouched)
    setErrors(newErrors)
    if (Object.values(newErrors).some(e => e)) return

    setStatus('loading')
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) {
        const detail = data?.errors?.map(err => err.msg).join(', ') || data?.message || 'Something went wrong.'
        setErrorMsg(detail)
        setStatus('error')
        return
      }
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
      setErrors({})
      setTouched({})
    } catch {
      setErrorMsg('Network error. Please check your connection.')
      setStatus('error')
    }
  }

  const { contact, booking } = SITE_CONFIG

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="orb orb-teal contact__orb" aria-hidden="true" />
      <div className="container">

        <div ref={headingRef} className="reveal">
          <p className="section-label">Get In Touch</p>
          <h2 id="contact-heading" className="section-heading">
            Ready to Build{' '}
            <span className="gradient-text">Something Great?</span>
          </h2>
          <p className="section-subheading">
            Tell us about your project and we'll get back to you within 24 hours.
            Or book a free discovery call — no pressure, just a conversation.
          </p>
        </div>

        <div className="contact__body">

          <div ref={infoRef} className="reveal contact__info">

            {/* Book a call — primary CTA */}
            <a
              href={booking.calendly.startsWith('http') ? booking.calendly : getWhatsAppUrl('Hi! I\'d like to book a free discovery call.')}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__book-btn btn btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {booking.calendlyLabel}
            </a>

            <InfoCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>}
              label="WhatsApp (Fastest Reply)"
              value={contact.phone}
              href={getWhatsAppUrl()}
              external
            />

            <InfoCard
              icon={<Icon name="Phone" size={20} />}
              label="Call Us (tap to copy number)"
              value={contact.phone}
              href={getTelUrl()}
              onClick={handlePhoneCopy}
              badge={phoneCopied ? '✓ Copied!' : null}
            />

            <InfoCard
              icon={<Icon name="Mail" size={20} />}
              label="Email (click to copy)"
              value={contact.email}
              href={getMailtoUrl()}
              onClick={handleEmailCopy}
              badge={emailCopied ? '✓ Copied!' : null}
            />

            <InfoCard
              icon={<Icon name="MapPin" size={20} />}
              label="Based In"
              value={contact.address}
              href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
              external
            />

            <p className="contact__response-note">
              <Icon name="Zap" size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: 'var(--accent-teal)' }} />
              Typical response time: <strong>under 2 hours</strong> on WhatsApp
            </p>
          </div>

          <div ref={formRef} className="reveal contact__form-wrap glass-card">
            {status === 'success' ? (
              <div className="contact__success" role="alert">
                <div className="contact__success-icon">
                  <Icon name="PartyPopper" size={40} style={{ color: 'var(--accent-teal)' }} />
                </div>
                <h3>Message Received!</h3>
                <p>Thank you, {form.name || 'friend'}! We'll get back to you within 24 hours. Or for instant reply, WhatsApp us.</p>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  WhatsApp Now
                </a>
                <button className="btn btn-secondary" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form" noValidate>
                <h3 className="contact__form-title">Send Us a Message</h3>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder="Arjun Mehta" autoComplete="name" className={errors.name ? 'input--error' : ''} />
                    {errors.name && <p className="contact__field-error"><Icon name="AlertTriangle" size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{errors.name}</p>}
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="text" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="arjun@startup.com" autoComplete="email" className={errors.email ? 'input--error' : ''} />
                    {errors.email && <p className="contact__field-error"><Icon name="AlertTriangle" size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{errors.email}</p>}
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+91 98765 43210" autoComplete="tel" className={errors.phone ? 'input--error' : ''} />
                    {errors.phone && <p className="contact__field-error"><Icon name="AlertTriangle" size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{errors.phone}</p>}
                  </div>
                  <div className="contact__field">
                    <label htmlFor="service">Service Needed *</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange} onBlur={handleBlur} className={errors.service ? 'input--error' : ''}>
                      <option value="">Select a service…</option>
                      {SITE_CONFIG.services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                      <option value="multiple">Multiple Services</option>
                      <option value="consulting">Consulting / Not Sure</option>
                    </select>
                    {errors.service && <p className="contact__field-error"><Icon name="AlertTriangle" size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{errors.service}</p>}
                  </div>
                </div>

                <div className="contact__field">
                  <div className="contact__message-header">
                    <label htmlFor="message">Tell Us About Your Project</label>
                    <button type="button" className="contact__suggest-btn" onClick={handleSuggest} disabled={isSuggesting}>
                      <Icon name="Sparkles" size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                      {isSuggesting ? 'Writing…' : 'Suggest'}
                    </button>
                  </div>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Describe your idea, timeline, and budget range…" rows="5" />
                </div>

                {status === 'error' && (
                  <p className="contact__error" role="alert">
                    {errorMsg || 'Something went wrong. Please try WhatsApp instead.'}
                  </p>
                )}

                <div className="contact__form-actions">
                  <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <><span className="contact__spinner" aria-hidden="true" />Sending…</>
                    ) : (
                      <>Send Message<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></>
                    )}
                  </button>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    WhatsApp Us
                  </a>
                </div>

                <p className="contact__privacy">
                  <Icon name="Lock" size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  Your information is private and will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
