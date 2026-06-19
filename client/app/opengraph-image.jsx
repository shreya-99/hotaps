import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'House of Technology — We Build Digital Products That Scale'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#0C0C1E',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative teal glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,201,167,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00C9A7, #845EF7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            ⬡
          </div>
          <span style={{ color: '#F0F2F7', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            HOT
          </span>
          <span style={{ color: '#5C6882', fontSize: '18px', marginTop: '4px' }}>
            House of Technology
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#F0F2F7',
            marginBottom: '24px',
            maxWidth: '800px',
          }}
        >
          We Build Digital Products{' '}
          <span style={{ color: '#00C9A7' }}>That Scale.</span>
        </div>

        {/* Subheading */}
        <p
          style={{
            fontSize: '26px',
            color: '#9AA5B8',
            lineHeight: 1.5,
            maxWidth: '700px',
            margin: 0,
          }}
        >
          Node.js · React · AWS · Flutter · Android · iOS
        </p>

        {/* Bottom strip */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '80px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: '#5C6882', fontSize: '18px' }}>hotaps.com</span>
          <span
            style={{
              background: 'rgba(0,201,167,0.15)',
              border: '1px solid rgba(0,201,167,0.3)',
              borderRadius: '100px',
              padding: '6px 20px',
              color: '#00C9A7',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Available for projects
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
