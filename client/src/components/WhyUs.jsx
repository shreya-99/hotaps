import useScrollAnimation from '../hooks/useScrollAnimation';
import { SITE_CONFIG } from '../config/site.config';
import './WhyUs.css';

const WhyUsCard = ({ item, index }) => {
  const ref = useScrollAnimation();
  return (
    <div
      ref={ref}
      className="reveal why-us__card glass-card"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="why-us__icon" aria-hidden="true">{item.icon}</div>
      <h3 className="why-us__title">{item.title}</h3>
      <p className="why-us__desc">{item.desc}</p>
    </div>
  );
};

const WhyUs = () => {
  const headingRef = useScrollAnimation();
  const { brand } = SITE_CONFIG;

  return (
    <section className="section why-us" id="why-us" aria-labelledby="why-us-heading">
      <div className="container">
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

        <div className="why-us__grid">
          {SITE_CONFIG.whyUs.map((item, i) => (
            <WhyUsCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
