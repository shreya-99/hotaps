/**
 * Hero Component
 * ─────────────────────────────────────────────────────────────
 * Full-screen landing section with:
 *  - Animated headline (split into static + gradient accent)
 *  - Two CTA buttons (project start + view services)
 *  - Stat counters (animated on mount)
 *  - Decorative grid background + floating orbs
 *  - Floating tech badge strip
 */
import { useEffect, useState } from 'react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/site.config';
import './Hero.css';

/**
 * AnimatedCounter
 * Counts up from 0 to the target value over ~1.5s.
 * Only numbers are animated; suffixes like '+' or '%' are rendered as-is.
 */
const AnimatedCounter = ({ value }) => {
  // Separate numeric part from suffix (e.g. "50+" → 50, "+")
  const numericPart = parseInt(value, 10);
  const suffix = value.replace(String(numericPart), '');

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const increment = numericPart / (duration / 16); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        setCount(numericPart);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericPart]);

  return <>{count}{suffix}</>;
};

const Hero = () => {
  const { hero, techBadges } = SITE_CONFIG;

  return (
    <section className="hero" id="home" aria-label="Hero section">

      {/* ── Decorative grid pattern (CSS background) ── */}
      <div className="grid-bg" aria-hidden="true" />

      {/* ── Decorative colour orbs ── */}
      <div className="orb orb-teal hero__orb-1" aria-hidden="true" />
      <div className="orb orb-purple hero__orb-2" aria-hidden="true" />

      <div className="container hero__inner">

        {/* ── Pre-headline badge ── */}
        <div className="hero__badge" role="text">
          <span className="hero__badge-dot" aria-hidden="true" />
          Available for new projects
        </div>

        {/* ── Main headline ── */}
        <h1 className="hero__headline">
          {hero.headline}{' '}
          <span className="gradient-text">{hero.headlineAccent}</span>
        </h1>

        {/* ── Subheadline ── */}
        <p className="hero__sub">{hero.subheadline}</p>

        {/* ── CTA Buttons ── */}
        <div className="hero__ctas">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hero__cta-primary"
            aria-label="Start a project — chat on WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.528 5.855L.057 23.57a.75.75 0 0 0 .927.928l5.799-1.525A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.203-1.378l-.37-.217-3.844 1.01 1.027-3.764-.24-.389A10 10 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(hero.ctaSecondary.href)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {hero.ctaSecondary.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* ── Stats Row ── */}
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

      {/* ── Scrolling tech badge strip ── */}
      <div className="hero__badges-wrap" aria-label="Technologies we work with">
        <div className="hero__badges-track">
          {/* Render twice for seamless infinite scroll illusion */}
          {[...techBadges, ...techBadges].map((badge, i) => (
            <span key={i} className="hero__badge-pill">{badge}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
