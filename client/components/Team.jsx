'use client'

import useScrollAnimation from '../hooks/useScrollAnimation'
import { SITE_CONFIG } from '../config/site.config'
import './Team.css'

const TeamCard = ({ member, index }) => {
  const ref = useScrollAnimation()

  return (
    <div
      ref={ref}
      className="reveal team__card glass-card"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="team__avatar-wrap">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="team__avatar-img"
            width={96}
            height={96}
          />
        ) : (
          <div className="team__avatar-initials" aria-hidden="true">
            {member.avatar}
          </div>
        )}
      </div>

      <div className="team__info">
        <h3 className="team__name">{member.name}</h3>
        <p className="team__role">{member.role}</p>
        {member.bio && <p className="team__bio">{member.bio}</p>}
      </div>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="team__linkedin"
          aria-label={`${member.name} on LinkedIn`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          LinkedIn
        </a>
      )}
    </div>
  )
}

const Team = () => {
  const headingRef = useScrollAnimation()
  const { team } = SITE_CONFIG

  if (!team || team.length === 0) return null

  return (
    <section className="section team" id="team" aria-labelledby="team-heading">
      <div className="orb orb-teal team__orb" aria-hidden="true" />
      <div className="container">

        <div ref={headingRef} className="reveal">
          <p className="section-label">The Team</p>
          <h2 id="team-heading" className="section-heading">
            The People Behind{' '}
            <span className="gradient-text">Your Product</span>
          </h2>
          <p className="section-subheading">
            Senior engineers and product thinkers — not juniors, not outsourced.
            You work directly with the people building your software.
          </p>
        </div>

        <div className="team__grid">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Team
