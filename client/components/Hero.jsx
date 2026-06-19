'use client'

import { useEffect, useState } from 'react'
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site.config'
import './Hero.css'

const AnimatedCounter = ({ value }) => {
  const numericPart = parseInt(value, 10)
  const suffix = value.replace(String(numericPart), '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1500
    const increment = numericPart / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericPart) {
        setCount(numericPart)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [numericPart])

  return <>{count}{suffix}</>
}

const Hero = () => {
  const { hero, techBadges, booking } = SITE_CONFIG

  return (
    <section className="hero" id="home" aria-label="Hero section">

      <div className="grid-bg" aria-hidden="true" />
      <div className="orb orb-teal hero__orb-1" aria-hidden="true" />
      <div className="orb orb-purple hero__orb-2" aria-hidden="true" />

      <div className="container hero__inner">

        <div className="hero__badge" role="text">
          <span className="hero__badge-dot" aria-hidden="true" />
          Available for new projects
        </div>

        <h1 className="hero__headline">
          {hero.headline}{' '}
          <span className="gradient-text">{hero.headlineAccent}</span>
        </h1>

        <p className="hero__sub">{hero.subheadline}</p>

        <div className="hero__ctas">
          <a
            href={booking.calendly.startsWith('http') ? booking.calendly : getWhatsAppUrl('Hi! I\'d like to book a free discovery call.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hero__cta-primary"
            aria-label="Book a free discovery call"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {booking.calendlyLabel}
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp Us
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(hero.ctaSecondary.href)?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {hero.ctaSecondary.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="hero__stats" role="list" aria-label="Company statistics">
          {hero.stats.map((stat, i) => (
            <div key={i} className="hero__stat" role="listitem">
              <div className="hero__stat-value">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="hero__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__badges-wrap" aria-label="Technologies we work with">
        <div className="hero__badges-track">
          {[...techBadges, ...techBadges].map((badge, i) => (
            <span key={i} className="hero__badge-pill">{badge}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
