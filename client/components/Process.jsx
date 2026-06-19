'use client'

import useScrollAnimation from '../hooks/useScrollAnimation'
import { SITE_CONFIG } from '../config/site.config'
import './Process.css'

const ProcessStep = ({ step, index, isLast }) => {
  const ref = useScrollAnimation()

  return (
    <div
      ref={ref}
      className="reveal process__step"
      style={{ transitionDelay: `${index * 100}ms` }}
      role="listitem"
    >
      <div className="process__track" aria-hidden="true">
        <div className="process__bubble">
          <span>{step.step}</span>
        </div>
        {!isLast && <div className="process__vline" />}
      </div>
      <div className={`process__content glass-card ${isLast ? '' : 'process__content--with-gap'}`}>
        <span className="process__step-label">Step {step.step}</span>
        <h3 className="process__title">{step.title}</h3>
        <p className="process__desc">{step.desc}</p>
      </div>
    </div>
  )
}

const Process = () => {
  const headingRef = useScrollAnimation()
  const totalSteps = SITE_CONFIG.process.length

  return (
    <section className="section process" id="process" aria-labelledby="process-heading">
      <div className="container">

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

        <div className="process__steps" role="list">
          {SITE_CONFIG.process.map((step, i) => (
            <ProcessStep key={i} step={step} index={i} isLast={i === totalSteps - 1} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Process
