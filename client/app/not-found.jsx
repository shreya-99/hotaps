import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px',
      background: 'var(--bg-base)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ fontSize: '6rem', marginBottom: '16px' }}>404</div>
      <h1 style={{
        fontSize: '2rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        marginBottom: '12px',
      }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px' }}>
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          borderRadius: '8px',
          background: '#00C9A7',
          color: '#07070F',
          fontWeight: 600,
          textDecoration: 'none',
          fontFamily: 'var(--font-display)',
        }}
      >
        ← Back to Home
      </Link>
    </div>
  )
}
