'use client'

import { useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { SITE_CONFIG } from '../config/site.config'
import { Icon } from './Icon'
import './TechStack.css'

const CategoryPanel = ({ cat, showHeader }) => {
  const ref = useScrollAnimation()
  return (
    <div ref={ref} className="reveal tech-stack__panel" style={{ '--cat-color': cat.color }}>
      {showHeader && (
        <div className="tech-stack__cat-header">
          <span className="tech-stack__cat-icon" aria-hidden="true"><Icon name={cat.icon} size={20} /></span>
          <h3 className="tech-stack__cat-title">{cat.category}</h3>
        </div>
      )}
      <div className="tech-stack__tools" role="list">
        {cat.tools.map((tool, i) => (
          <div
            key={i}
            className="tech-stack__tool glass-card"
            role="listitem"
            aria-label={`${tool.name} — ${tool.desc}`}
          >
            <span className="tech-stack__tool-icon" aria-hidden="true"><Icon name={tool.icon} size={18} /></span>
            <span className="tech-stack__tool-name">{tool.name}</span>
            <span className="tech-stack__tool-desc">{tool.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const BottomNote = () => {
  const ref = useScrollAnimation()
  return (
    <p className="tech-stack__note reveal" ref={ref}>
      Don't see your stack? We adapt. If you need something not listed here,{' '}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        let's talk
      </a>.
    </p>
  )
}

const TechStack = () => {
  const headingRef = useScrollAnimation()
  const [activeId, setActiveId] = useState('all')
  const { techStack } = SITE_CONFIG

  const visibleCategories =
    activeId === 'all' ? techStack : techStack.filter((cat) => cat.id === activeId)

  return (
    <section className="section tech-stack" id="tech-stack" aria-labelledby="tech-stack-heading">
      <div className="orb orb-purple tech-stack__orb" aria-hidden="true" />

      <div className="container">
        <div ref={headingRef} className="reveal">
          <p className="section-label">Our Arsenal</p>
          <h2 id="tech-stack-heading" className="section-heading">
            The Tech Behind{' '}
            <span className="gradient-text">Every Great Product</span>
          </h2>
          <p className="section-subheading">
            We pick the right tool for the right job — here's the full stack
            we work with across frontend, backend, mobile, cloud, and data.
          </p>
        </div>

        <div className="tech-stack__tabs" role="tablist" aria-label="Technology categories">
          <button
            role="tab"
            aria-selected={activeId === 'all'}
            className={`tech-stack__tab ${activeId === 'all' ? 'tech-stack__tab--active' : ''}`}
            onClick={() => setActiveId('all')}
          >
            <span className="tech-stack__tab-icon" aria-hidden="true"><Icon name="Boxes" size={16} /></span>
            All
          </button>
          {techStack.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeId === cat.id}
              className={`tech-stack__tab ${activeId === cat.id ? 'tech-stack__tab--active' : ''}`}
              onClick={() => setActiveId(cat.id)}
              style={{ '--tab-color': cat.color }}
            >
              <span className="tech-stack__tab-icon" aria-hidden="true"><Icon name={cat.icon} size={16} /></span>
              {cat.category}
            </button>
          ))}
        </div>

        <div className="tech-stack__panels">
          {visibleCategories.map((cat) => (
            <CategoryPanel key={cat.id} cat={cat} showHeader={activeId === 'all'} />
          ))}
        </div>

        <BottomNote />
      </div>
    </section>
  )
}

export default TechStack
