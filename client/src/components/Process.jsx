/**
 * Process Component — Rewritten
 * ─────────────────────────────────────────────────────────────
 * Clean vertical timeline layout using flexbox only.
 *
 * Layout per step:
 *   [track]  [content card]
 *
 * Track = numbered bubble + vertical connector line (between steps).
 * No CSS grid tricks, no direction:rtl — just simple, reliable flex.
 *
 * Data from SITE_CONFIG.process in site.config.js.
 */
import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG } from '../config/site.config';
import './Process.css';

const Process = () => {
  const headingRef = useScrollAnimation();
  const totalSteps  = SITE_CONFIG.process.length;

  return (
    <section className="section process" id="process" aria-labelledby="process-heading">
      <div className="container">

        {/* ── Section Header ── */}
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

        {/* ── Steps ── */}
        <div className="process__steps" role="list">
          {SITE_CONFIG.process.map((step, i) => {
            const ref = useScrollAnimation();
            const isLast = i === totalSteps - 1;

            return (
              <div
                key={i}
                ref={ref}
                className="reveal process__step"
                style={{ transitionDelay: `${i * 100}ms` }}
                role="listitem"
              >
                {/*
                  ── Left track ──
                  Contains the numbered circle + the vertical
                  connecting line beneath it (hidden on last step).
                */}
                <div className="process__track" aria-hidden="true">
                  <div className="process__bubble">
                    <span>{step.step}</span>
                  </div>
                  {/* Vertical line connecting to next step */}
                  {!isLast && <div className="process__vline" />}
                </div>

                {/*
                  ── Content card ──
                  Always in the right column — never touches the
                  bubble column. This is what the old grid was getting wrong.
                */}
                <div className={`process__content glass-card ${isLast ? '' : 'process__content--with-gap'}`}>
                  {/* Step label pill */}
                  <span className="process__step-label">Step {step.step}</span>
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
