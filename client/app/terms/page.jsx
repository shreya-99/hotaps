import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for House of Technology (HoTaps).',
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-teal)' }}>{title}</h2>
    {children}
  </div>
)

export default function Terms() {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px' }}>

        <Link href="/" style={{ color: 'var(--accent-teal)', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, margin: '32px 0 8px' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>
          Last updated: June 2025
        </p>

        <Section title="1. Services">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            House of Technology ("HoTaps", "we", "us") provides software development services including
            web development, mobile app development, and cloud infrastructure. Specific deliverables, timelines,
            and pricing are defined in individual project agreements.
          </p>
        </Section>

        <Section title="2. Project Agreements">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            All projects begin with a signed Statement of Work (SOW) or contract that specifies scope, milestones,
            payment terms, and intellectual property rights. These terms are binding only after both parties
            sign the project agreement.
          </p>
        </Section>

        <Section title="3. Payment">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Payment terms are defined in individual project contracts. Typically, projects require an upfront
            deposit before work begins. Failure to pay on time may result in work being paused.
          </p>
        </Section>

        <Section title="4. Intellectual Property">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Upon full payment, clients receive full ownership of the custom code developed for their project.
            We retain the right to reference the project in our portfolio unless a separate NDA is signed.
          </p>
        </Section>

        <Section title="5. Limitation of Liability">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Our liability is limited to the total amount paid for the specific project. We are not liable
            for indirect, consequential, or incidental damages arising from use of delivered software.
          </p>
        </Section>

        <Section title="6. Contact">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            For any questions regarding these terms, contact us at{' '}
            <a href="mailto:business@houseoftechnology.co.in" style={{ color: 'var(--accent-teal)' }}>
              business@houseoftechnology.co.in
            </a>
          </p>
        </Section>

      </div>
    </div>
  )
}
