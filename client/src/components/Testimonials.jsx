/**
 * Testimonials Component
 * ─────────────────────────────────────────────────────────────
 * Displays client testimonials in a card grid.
 * Edit SITE_CONFIG.testimonials to add/change reviews.
 */
import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG } from '../config/site.config';
import './Testimonials.css';

/** Renders N yellow stars */
const StarRating = ({ count = 5 }) => (
  <div className="testimonial__stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const headingRef = useScrollAnimation();

  return (
    <section className="section testimonials" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">

        <div ref={headingRef} className="reveal">
          <p className="section-label">Client Stories</p>
          <h2 id="testimonials-heading" className="section-heading">
            Trusted by Teams That{' '}
            <span className="gradient-text">Build the Future</span>
          </h2>
          <p className="section-subheading">
            Don't take our word for it — here's what our clients say.
          </p>
        </div>

        <div className="testimonials__grid">
          {SITE_CONFIG.testimonials.map((t, i) => {
            const ref = useScrollAnimation();
            return (
              <blockquote
                key={i}
                ref={ref}
                className="reveal glass-card testimonial__card"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Opening quote mark */}
                <div className="testimonial__quote-mark" aria-hidden="true">"</div>

                <StarRating count={t.rating} />

                <p className="testimonial__text">"{t.text}"</p>

                <footer className="testimonial__author">
                  {/* Avatar: initials in colored circle */}
                  <div className="testimonial__avatar" aria-hidden="true">{t.avatar}</div>
                  <div>
                    <cite className="testimonial__name">{t.name}</cite>
                    <p className="testimonial__role">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
