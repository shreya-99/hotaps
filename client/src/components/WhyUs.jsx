/**
 * WhyUs Component
 * ─────────────────────────────────────────────────────────────
 * Shows the differentiators / USPs of HoTaps.
 * Data comes from SITE_CONFIG.whyUs — edit there to update.
 */
import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG } from '../config/site.config';
import './WhyUs.css';

const WhyUs = () => {
  const headingRef = useScrollAnimation();

  return (
    <section className="section why-us" id="why-us" aria-labelledby="why-us-heading">
      <div className="container">

        {/* Section header */}
        <div ref={headingRef} className="reveal">
          <p className="section-label">Why HoTaps</p>
          <h2 id="why-us-heading" className="section-heading">
            We Don't Just Write Code.{' '}
            <span className="gradient-text">We Solve Problems.</span>
          </h2>
          <p className="section-subheading">
            Every great product starts with the right team. Here's what makes working with us different.
          </p>
        </div>

        {/* Grid of USP cards */}
        <div className="why-us__grid">
          {SITE_CONFIG.whyUs.map((item, i) => {
            const ref = useScrollAnimation();
            return (
              <div
                key={i}
                ref={ref}
                className="reveal why-us__card glass-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Large emoji icon */}
                <div className="why-us__icon" aria-hidden="true">{item.icon}</div>
                <h3 className="why-us__title">{item.title}</h3>
                <p className="why-us__desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
