'use client'

import useScrollAnimation from '../hooks/useScrollAnimation'
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site.config'
import { Icon } from './Icon'
import './Services.css'

const ServiceCard = ({ service, index }) => {
  const ref = useScrollAnimation()
  const { brand } = SITE_CONFIG
  const whatsappMsg = `Hi ${brand.shortName}! I'm interested in your ${service.title} service. Can we discuss?`

  return (
    <article
      ref={ref}
      className="reveal service-card glass-card"
      style={{ '--card-accent': service.color, transitionDelay: `${index * 80}ms` }}
      aria-labelledby={`service-${service.id}-title`}
    >
      <div className="service-card__accent-bar" aria-hidden="true" />
      <div className="service-card__icon" aria-hidden="true">
        <Icon name={service.icon} size={28} />
      </div>
      <h3 id={`service-${service.id}-title`} className="service-card__title">{service.title}</h3>
      <p className="service-card__short-desc">{service.shortDesc}</p>
      <p className="service-card__desc">{service.description}</p>
      <ul className="service-card__features" aria-label={`${service.title} features`}>
        {service.features.map((f, i) => (
          <li key={i}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <a
        href={getWhatsAppUrl(whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="service-card__cta"
        aria-label={`Discuss ${service.title} with us on WhatsApp`}
      >
        Discuss this service
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  )
}

const Services = () => {
  const headingRef = useScrollAnimation()
  const ctaRef = useScrollAnimation()

  return (
    <section className="section services" id="services" aria-labelledby="services-heading">
      <div className="orb orb-purple services__orb" aria-hidden="true" />
      <div className="container">
        <div ref={headingRef} className="reveal">
          <p className="section-label" aria-label="Section: Services">Our Services</p>
          <h2 id="services-heading" className="section-heading">
            Everything You Need to{' '}
            <span className="gradient-text">Ship Great Software</span>
          </h2>
          <p className="section-subheading">
            We cover the full product development stack — from backend APIs to mobile apps to
            cloud infrastructure. One team, all the expertise you need.
          </p>
        </div>

        <div className="services__grid reveal-stagger">
          {SITE_CONFIG.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="services__bottom-cta reveal" ref={ctaRef}>
          <p>Not sure which service you need?</p>
          <a
            href={getWhatsAppUrl(`Hi ${SITE_CONFIG.brand.shortName}! I need help figuring out the right tech solution for my project.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Let's Talk — It's Free
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
