import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const viewport = {
  themeColor: '#00C9A7',
}

export const metadata = {
  metadataBase: new URL('https://hotaps.com'),
  title: {
    default: 'House of Technology | Node.js, React, AWS, Flutter Development',
    template: '%s | HoTaps',
  },
  description:
    'House of Technology (HoTaps) is a premier software development agency specializing in Node.js, React.js, AWS Cloud, Android, iOS, and Flutter app development. Build scalable, modern digital products with us.',
  keywords: [
    'nodejs development', 'reactjs development', 'aws cloud services',
    'flutter app development', 'android app development', 'ios app development',
    'software agency', 'web development company', 'mobile app development', 'HOTaps',
  ],
  authors: [{ name: 'House of Technology' }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://hotaps.com/',
  },
  openGraph: {
    type: 'website',
    url: 'https://hotaps.com/',
    title: 'House of Technology | Premium App & Web Development',
    description:
      'We craft scalable digital products using Node.js, React, AWS, Flutter, Android & iOS. Let\'s build something great together.',
    siteName: 'House of Technology',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hotaps',
    title: 'House of Technology | Premium Dev Agency',
    description: 'Node.js, React, AWS, Flutter, Android & iOS development. Ship faster with HoTaps.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'House of Technology',
  alternateName: 'HoTaps',
  url: 'https://hotaps.com',
  logo: 'https://hotaps.com/logo.png',
  description:
    'Premium software development agency specializing in Node.js, React.js, AWS, Flutter, Android and iOS development.',
  foundingDate: '2020',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9211845544',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.linkedin.com/company/house-of-technology-hot/',
  ],
  service: [
    { '@type': 'Service', name: 'Node.js Development' },
    { '@type': 'Service', name: 'React.js Development' },
    { '@type': 'Service', name: 'AWS Cloud Services' },
    { '@type': 'Service', name: 'Flutter App Development' },
    { '@type': 'Service', name: 'Android Development' },
    { '@type': 'Service', name: 'iOS Development' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
