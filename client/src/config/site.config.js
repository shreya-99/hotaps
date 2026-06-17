/**
 * ================================================================
 * SITE CONFIGURATION — Edit this file to customize your website
 * ================================================================
 *
 * This is your single source of truth for all configurable content.
 * Change phone numbers, WhatsApp, services, team info, etc. here.
 * No need to touch individual components.
 *
 * HOW TO USE:
 *   import { SITE_CONFIG } from '../config/site.config';
 *   then use SITE_CONFIG.contact.phone, etc.
 */

export const SITE_CONFIG = {

  // ── BRANDING ──────────────────────────────────────────────────
  brand: {
    name: 'House of Technology',
    shortName: 'HOT',
    tagline: 'We Build Digital Products That Scale.',
    description:
      'We are a premier software development agency crafting high-performance web apps, mobile apps, and cloud solutions for startups and enterprises.',
    foundedYear: 2020,
    logo: '/logo.svg', // Place your logo in client/public/
  },

  // ── CONTACT — Change these to your real numbers ───────────────
  contact: {
    /**
     * WhatsApp number (with country code, no spaces or dashes)
     * Used to generate the wa.me link for the WhatsApp CTA button.
     * Example: '919876543210' for India +91 98765 43210
     */
    whatsapp: '919211845544',

    /**
     * Default WhatsApp message pre-filled for the user
     */
    whatsappMessage: 'Hi HoTaps! I\'d like to discuss a project with your team.',

    /**
     * Display phone number (shown in UI, formatted for readability)
     */
    phone: '+91 9211845544',

    /**
     * Business email address
     */
    email: 'business@houseoftechnology.co.in',

    /**
     * Physical / registered address (optional — shown in footer)
     */
    address: 'Delhi, India',
  },

  // ── SOCIAL LINKS ──────────────────────────────────────────────
  social: {
    linkedin: 'https://www.linkedin.com/company/house-of-technology-hot/',
  },

  // ── SEO ───────────────────────────────────────────────────────
  seo: {
    siteUrl: 'https://hotaps.com',
    defaultTitle: 'House of Technology | Node.js, React, AWS, Flutter Development',
    titleTemplate: '%s | HoTaps',
    defaultDescription:
      'HoTaps is a premium software agency building scalable Node.js, React, AWS, Android, iOS & Flutter solutions.',
    ogImage: 'https://hotaps.com/og-image.jpg',
  },

  // ── HERO SECTION ──────────────────────────────────────────────
  hero: {
    headline: 'We Build Digital Products',
    headlineAccent: 'That Scale.',
    subheadline:
      'From MVPs to enterprise platforms — we engineer fast, beautiful, and bulletproof software using the world\'s best modern tech stack.',
    ctaPrimary: { label: 'Start a Project', href: '#contact' },
    ctaSecondary: { label: 'View Services', href: '#services' },
    stats: [
      { value: '50+', label: 'Projects Shipped' },
      { value: '30+', label: 'Happy Clients' },
      { value: '4+', label: 'Years Experience' },
      { value: '99%', label: 'Client Retention' },
    ],
  },

  // ── SERVICES ──────────────────────────────────────────────────
  // Each service shows as a card in the Services section.
  // Add, remove, or edit entries freely.
  services: [
    {
      id: 'nodejs',
      icon: '⬡',                        // Emoji or replace with icon component
      title: 'Node.js Development',
      shortDesc: 'High-performance backend APIs and microservices.',
      description:
        'We architect and build scalable REST & GraphQL APIs, real-time systems with WebSockets, and microservice infrastructures using Node.js and Express/Fastify. From authentication to payment integration — we handle the full backend lifecycle.',
      features: [
        'REST & GraphQL APIs',
        'Real-time WebSocket systems',
        'Microservices architecture',
        'Authentication & Authorization',
        'Database design (SQL & NoSQL)',
        'Third-party API integrations',
      ],
      color: '#43A047',   // Brand color for this service card
    },
    {
      id: 'reactjs',
      icon: '⚛',
      title: 'React.js Development',
      shortDesc: 'Modern, fast, and beautiful web applications.',
      description:
        'We build production-grade React applications with a focus on performance, accessibility, and pixel-perfect UI. From SPAs to complex dashboards — our frontend engineers deliver delightful user experiences with clean, maintainable code.',
      features: [
        'Single Page Applications (SPA)',
        'Next.js / SSR / SSG',
        'Reusable component libraries',
        'State management (Redux, Zustand)',
        'Performance optimization',
        'Responsive & accessible UI',
      ],
      color: '#00BCD4',
    },
    {
      id: 'aws',
      icon: '☁',
      title: 'AWS Cloud Services',
      shortDesc: 'Cloud-native infrastructure that grows with you.',
      description:
        'We design, deploy, and manage cloud infrastructure on AWS — from serverless functions to containerized workloads. We help startups go to production fast and enterprises optimize costs while improving reliability.',
      features: [
        'EC2, ECS & Lambda deployments',
        'S3, CloudFront & CDN setup',
        'RDS, DynamoDB & ElastiCache',
        'CI/CD with CodePipeline & GitHub Actions',
        'Infrastructure as Code (Terraform)',
        'Cost optimization & monitoring',
      ],
      color: '#FF9800',
    },
    {
      id: 'android',
      icon: '📱',
      title: 'Android Development',
      shortDesc: 'Native Android apps that users love.',
      description:
        'Our Android engineers build native Kotlin applications following Material Design guidelines. We focus on smooth performance, offline support, and deep OS integration to deliver apps that feel truly native.',
      features: [
        'Kotlin & Jetpack Compose',
        'Material Design 3',
        'Offline-first with Room DB',
        'Push notifications & FCM',
        'Google Maps & Location services',
        'Play Store deployment',
      ],
      color: '#4CAF50',
    },
    {
      id: 'ios',
      icon: '🍎',
      title: 'iOS Development',
      shortDesc: 'Polished, premium iOS experiences.',
      description:
        'We craft high-quality iOS apps using Swift and SwiftUI that pass Apple\'s rigorous review process. Our team has deep experience with Core Data, ARKit, HealthKit, and all major Apple frameworks.',
      features: [
        'Swift & SwiftUI',
        'Core Data & CloudKit',
        'HealthKit & ARKit integration',
        'Apple Pay & StoreKit',
        'Push notifications & APNs',
        'App Store submission & ASO',
      ],
      color: '#9C27B0',
    },
    {
      id: 'flutter',
      icon: '💙',
      title: 'Flutter Development',
      shortDesc: 'One codebase. Every platform.',
      description:
        'Build beautiful cross-platform apps from a single Dart codebase with Flutter. We deliver pixel-perfect UI on Android, iOS, Web, and Desktop — reducing cost without compromising quality.',
      features: [
        'Cross-platform (iOS, Android, Web)',
        'Custom widget development',
        'State management (Bloc, Riverpod)',
        'Firebase & Supabase integration',
        'Platform channels for native code',
        'Performance profiling & optimization',
      ],
      color: '#03A9F4',
    },
  ],

  // ── WHY CHOOSE US ─────────────────────────────────────────────
  whyUs: [
    {
      icon: '🚀',
      title: 'Ship Fast, Ship Right',
      desc: 'We use battle-tested agile workflows to deliver MVPs in weeks — not months. Speed without cutting corners.',
    },
    {
      icon: '🏗',
      title: 'Architecture First',
      desc: 'Every project starts with solid architecture planning so your codebase stays maintainable as it grows.',
    },
    {
      icon: '🔐',
      title: 'Security by Default',
      desc: 'OWASP practices, encrypted data, secure auth flows, and regular security audits built into every project.',
    },
    {
      icon: '📊',
      title: 'Data-Driven Decisions',
      desc: 'We integrate analytics from day one so you always know what your users are doing and why.',
    },
    {
      icon: '🤝',
      title: 'Transparent Communication',
      desc: 'Daily standups, sprint demos, and a shared project board mean you\'re never left wondering about status.',
    },
    {
      icon: '🔄',
      title: 'Post-Launch Support',
      desc: 'We don\'t disappear after go-live. Ongoing maintenance, monitoring, and feature development available.',
    },
  ],

  // ── PROCESS STEPS ─────────────────────────────────────────────
  process: [
    { step: '01', title: 'Discovery Call', desc: 'We understand your business goals, target users, and technical requirements.' },
    { step: '02', title: 'Proposal & Scope', desc: 'You receive a detailed proposal with timeline, cost breakdown, and tech stack recommendation.' },
    { step: '03', title: 'Design & Architecture', desc: 'UI/UX wireframes and system architecture are finalized before a single line of code is written.' },
    { step: '04', title: 'Agile Development', desc: 'Bi-weekly sprints with demos. You see progress at every milestone.' },
    { step: '05', title: 'QA & Testing', desc: 'Automated tests, manual QA, performance audits, and security checks before release.' },
    { step: '06', title: 'Launch & Support', desc: 'Smooth production deployment with monitoring, and a dedicated support period post-launch.' },
  ],

  // ── TESTIMONIALS ──────────────────────────────────────────────
  testimonials: [
    {
      name: 'Arjun Mehta',
      role: 'Founder, FinVault',
      avatar: 'AM',
      text: 'HoTaps delivered our fintech dashboard in 8 weeks. The Node.js backend handles 10k concurrent users without breaking a sweat. Absolutely stellar work.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'CTO, EduLearn',
      avatar: 'PS',
      text: 'Their Flutter app looked identical on both iOS and Android and passed App Store review on the first try. The team is incredibly professional.',
      rating: 5,
    },
    {
      name: 'David Okafor',
      role: 'CEO, LogiTrack',
      avatar: 'DO',
      text: 'AWS infrastructure setup was flawless. We went from zero to production in 2 weeks. Our infra costs dropped 40% after their optimization audit.',
      rating: 5,
    },
  ],

  // ── TECH STACK BADGES (used in Hero scrolling strip) ─────────
  techBadges: [
    'Node.js', 'React.js', 'Next.js', 'TypeScript', 'Flutter', 'Dart',
    'Swift', 'Kotlin', 'AWS', 'Firebase', 'MongoDB', 'PostgreSQL',
    'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'Terraform', 'GitHub Actions',
  ],

  // ── TECH STACK SECTION (full categorised grid) ────────────────
  // Each category has an icon, label, color accent, and a list of tools.
  // Add/remove tools or whole categories freely here.
  techStack: [
    {
      id: 'frontend',
      icon: '🖥',
      category: 'Frontend',
      color: '#00BCD4',
      tools: [
        { name: 'React.js',    icon: '⚛',  desc: 'UI library'         },
        { name: 'Next.js',     icon: '▲',  desc: 'SSR framework'      },
        { name: 'TypeScript',  icon: '𝙏𝙎', desc: 'Typed JavaScript'   },
        { name: 'Vite',        icon: '⚡',  desc: 'Build tool'         },
        { name: 'Tailwind CSS',icon: '🎨',  desc: 'Utility CSS'        },
        { name: 'GraphQL',     icon: '◈',  desc: 'Query language'     },
      ],
    },
    {
      id: 'backend',
      icon: '⚙',
      category: 'Backend',
      color: '#43A047',
      tools: [
        { name: 'Node.js',    icon: '⬡',  desc: 'JS runtime'         },
        { name: 'Express',    icon: '🚂',  desc: 'Web framework'      },
        { name: 'Fastify',    icon: '🏎',  desc: 'Fast framework'     },
        { name: 'REST APIs',  icon: '🔗',  desc: 'API design'         },
        { name: 'WebSockets', icon: '🔌',  desc: 'Real-time'          },
        { name: 'Microservices', icon: '🔷', desc: 'Architecture'    },
      ],
    },
    {
      id: 'mobile',
      icon: '📱',
      category: 'Mobile',
      color: '#03A9F4',
      tools: [
        { name: 'Flutter',     icon: '💙',  desc: 'Cross-platform'    },
        { name: 'Dart',        icon: '🎯',  desc: 'Flutter language'  },
        { name: 'Swift',       icon: '🍎',  desc: 'iOS native'        },
        { name: 'SwiftUI',     icon: '🖼',  desc: 'iOS UI framework'  },
        { name: 'Kotlin',      icon: '🤖',  desc: 'Android native'    },
        { name: 'Jetpack Compose', icon: '📐', desc: 'Android UI'    },
      ],
    },
    {
      id: 'cloud',
      icon: '☁',
      category: 'Cloud & DevOps',
      color: '#FF9800',
      tools: [
        { name: 'AWS',           icon: '☁',  desc: 'Cloud platform'   },
        { name: 'Docker',        icon: '🐳',  desc: 'Containers'       },
        { name: 'Kubernetes',    icon: '⎈',  desc: 'Orchestration'    },
        { name: 'Terraform',     icon: '🏗',  desc: 'Infra as code'    },
        { name: 'GitHub Actions',icon: '⚙',  desc: 'CI/CD pipelines'  },
        { name: 'Firebase',      icon: '🔥',  desc: 'BaaS platform'    },
      ],
    },
    {
      id: 'database',
      icon: '🗄',
      category: 'Databases',
      color: '#9C27B0',
      tools: [
        { name: 'PostgreSQL', icon: '🐘',  desc: 'Relational DB'     },
        { name: 'MongoDB',    icon: '🍃',  desc: 'Document DB'       },
        { name: 'Redis',      icon: '🟥',  desc: 'In-memory cache'   },
        { name: 'MySQL',      icon: '🐬',  desc: 'Relational DB'     },
        { name: 'DynamoDB',   icon: '⚡',  desc: 'AWS NoSQL'         },
        { name: 'Supabase',   icon: '💚',  desc: 'Open source BaaS'  },
      ],
    },
  ],
};

// ── UTILITY HELPERS ───────────────────────────────────────────────────────────

/**
 * Returns the full WhatsApp wa.me URL.
 * Use this wherever you want a "Chat on WhatsApp" button.
 */
export const getWhatsAppUrl = (customMessage) => {
  const msg = encodeURIComponent(customMessage || SITE_CONFIG.contact.whatsappMessage);
  return `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${msg}`;
};

/**
 * Returns the mailto link.
 */
export const getMailtoUrl = (subject = 'Project Inquiry') => {
  return `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}`;
};

/**
 * Returns the tel: link for click-to-call.
 */
export const getTelUrl = () => {
  return `tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`;
};
