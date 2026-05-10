/**
 * Services Component
 * ─────────────────────────────────────────────────────────────
 * Renders service cards from SITE_CONFIG.services.
 * Each card shows:
 *   - Icon, title, short description
 *   - Hover to reveal feature list
 *   - Colored top-border accent per service
 *
 * To add/edit services: update site.config.js → services array.
 */
import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site.config';
import './Services.css';

const ServiceCard = ({ service, index }) => {
  const ref = useScrollAnimation();

  // Custom WhatsApp message per service for better conversion
  const whatsappMsg = `Hi HoTaps! I'm interested in your ${service.title} service. Can we discuss?`;

  return (
    <article
      ref={ref}
      className="reveal service-card glass-card"
      style={{
        '--card-accent': service.color,
        transitionDelay: `${index * 80}ms`,
      }}
      aria-labelledby={`service-${service.id}-title`}
    >
      {/* Colored top border using CSS custom property */}
      <div className="service-card__accent-bar" aria-hidden="true" />

      {/* Icon */}
      <div className="service-card__icon" aria-hidden="true">{service.icon}</div>

      {/* Title */}
      <h3 id={`service-${service.id}-title`} className="service-card__title">
        {service.title}
      </h3>

      {/* Short description — visible by default */}
      <p className="service-card__short-desc">{service.shortDesc}</p>

      {/* Full description — visible on hover/focus */}
      <p className="service-card__desc">{service.description}</p>

      {/* Feature list */}
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

      {/* CTA link to WhatsApp with service-specific message */}
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
  );
};

const Services = () => {
  const headingRef = useScrollAnimation();

  return (
    <section className="section services" id="services" aria-labelledby="services-heading">

      {/* Decorative orb */}
      <div className="orb orb-purple services__orb" aria-hidden="true" />

      <div className="container">

        {/* Section header */}
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

        {/* Services grid — auto-fills columns based on available width */}
        <div className="services__grid reveal-stagger">
          {SITE_CONFIG.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="services__bottom-cta reveal" ref={useScrollAnimation()}>
          <p>Not sure which service you need?</p>
          <a
            href={getWhatsAppUrl('Hi HoTaps! I need help figuring out the right tech solution for my project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            💬 Let's Talk — It's Free
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
