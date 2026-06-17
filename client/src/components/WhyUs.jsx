import { useState, useEffect, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG } from '../config/site.config';
import './WhyUs.css';

const STATS = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5,  suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

const StatCounter = ({ value, suffix, label, animate }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = null;
    const duration = 1600;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate, value]);

  return (
    <div className="why-us__stat">
      <span className="why-us__stat-number">{count}{suffix}</span>
      <span className="why-us__stat-label">{label}</span>
    </div>
  );
};

const WhyUs = () => {
  const headingRef  = useScrollAnimation();
  const statsRef    = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { brand } = SITE_CONFIG;
  const items = SITE_CONFIG.whyUs;
  const active = items[activeIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 4s when user hasn't clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="section why-us" id="why-us" aria-labelledby="why-us-heading">
      <div className="container">

        {/* Header */}
        <div ref={headingRef} className="reveal">
          <p className="section-label">Why {brand.shortName}</p>
          <h2 id="why-us-heading" className="section-heading">
            We Don't Just Write Code.{' '}
            <span className="gradient-text">We Solve Problems.</span>
          </h2>
          <p className="section-subheading">
            Every great product starts with the right team. Here's what makes working with us different.
          </p>
        </div>

        {/* Animated Stats Row */}
        <div ref={statsRef} className="why-us__stats">
          {STATS.map((stat, i) => (
            <StatCounter key={i} {...stat} animate={statsVisible} />
          ))}
        </div>

        {/* Interactive Feature Explorer */}
        <div className="why-us__explorer">

          {/* Left: clickable feature list */}
          <div className="why-us__list" role="tablist" aria-label="Why choose us">
            {items.map((item, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeIndex === i}
                className={`why-us__list-item ${activeIndex === i ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className="why-us__list-num">0{i + 1}</span>
                <span className="why-us__list-icon" aria-hidden="true">{item.icon}</span>
                <span className="why-us__list-title">{item.title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="why-us__list-arrow" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div
            className="why-us__detail glass-card"
            key={activeIndex}
            role="tabpanel"
          >
            <div className="why-us__detail-glow" aria-hidden="true" />
            <div className="why-us__detail-top">
              <span className="why-us__detail-num">0{activeIndex + 1} / 0{items.length}</span>
              <div className="why-us__detail-icon" aria-hidden="true">{active.icon}</div>
            </div>
            <h3 className="why-us__detail-title">{active.title}</h3>
            <p className="why-us__detail-desc">{active.desc}</p>

            {/* Progress dots */}
            <div className="why-us__dots" aria-hidden="true">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`why-us__dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  tabIndex={-1}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
