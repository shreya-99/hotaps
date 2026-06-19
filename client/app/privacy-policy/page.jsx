import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for House of Technology (HoTaps).',
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-teal)' }}>{title}</h2>
    {children}
  </div>
)

export default function PrivacyPolicy() {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px' }}>

        <Link href="/" style={{ color: 'var(--accent-teal)', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, margin: '32px 0 8px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>
          Last updated: June 2025
        </p>

        <Section title="1. Information We Collect">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            When you contact us through our website, we collect the information you provide: your name, email address,
            phone number (optional), and project details. We do not collect any information automatically beyond
            standard server logs.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We use your contact information solely to respond to your inquiry, discuss your project, and provide
            our services. We do not sell, trade, or share your personal information with third parties, except as
            required by law.
          </p>
        </Section>

        <Section title="3. Data Storage">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Contact form submissions are delivered to our business email and are stored securely. We retain
            correspondence for business and legal purposes. You may request deletion of your data at any time
            by emailing us.
          </p>
        </Section>

        <Section title="4. Cookies">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Our website uses localStorage to remember your contact form details for convenience (name, email, phone).
            No tracking cookies or third-party analytics cookies are used.
          </p>
        </Section>

        <Section title="5. Third-Party Services">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We use Google Fonts for typography. Our contact form uses SMTP email delivery. WhatsApp links
            redirect to WhatsApp's servers. These services have their own privacy policies.
          </p>
        </Section>

        <Section title="6. Contact">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            For privacy concerns or data deletion requests, email us at{' '}
            <a href="mailto:business@houseoftechnology.co.in" style={{ color: 'var(--accent-teal)' }}>
              business@houseoftechnology.co.in
            </a>
          </p>
        </Section>

      </div>
    </div>
  )
}
