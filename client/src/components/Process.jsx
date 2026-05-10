/**
 * Process Component
 * ─────────────────────────────────────────────────────────────
 * Shows the 6-step engagement process as a connected timeline.
 * Data comes from SITE_CONFIG.process.
 */
import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG } from '../config/site.config';
import './Process.css';

const Process = () => {
  const headingRef = useScrollAnimation();

  return (
    <section className="section process" id="process" aria-labelledby="process-heading">
      <div className="container">

        {/* Section header */}
        <div ref={headingRef} className="reveal">
          <p className="section-label">How We Work</p>
          <h2 id="process-heading" className="section-heading">
            A Process Built for{' '}
            <span className="gradient-text">Zero Surprises</span>
          </h2>
          <p className="section-subheading">
            From first call to launch day — a clear, collaborative process
            with full visibility at every stage.
          </p>
        </div>

        {/* Steps — alternating layout on desktop, linear on mobile */}
        <div className="process__steps">
          {SITE_CONFIG.process.map((step, i) => {
            const ref = useScrollAnimation();
            return (
              <div
                key={i}
                ref={ref}
                className={`reveal process__step ${i % 2 === 1 ? 'process__step--right' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Connector line between steps (hidden for last) */}
                {i < SITE_CONFIG.process.length - 1 && (
                  <div className="process__connector" aria-hidden="true" />
                )}

                {/* Step number bubble */}
                <div className="process__bubble" aria-hidden="true">
                  <span>{step.step}</span>
                </div>

                {/* Content */}
                <div className="process__content glass-card">
                  <h3 className="process__title">{step.title}</h3>
                  <p className="process__desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
