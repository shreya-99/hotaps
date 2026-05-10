# ⬡ House of Technology (HoTaps) — Website

A full-stack agency website built with **React + Vite** (frontend) and **Node.js + Express** (backend). Designed to rank on Google, convert visitors into leads, and be fully customizable through a single config file.

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Design System](#3-design-system)
4. [Architecture](#4-architecture)
5. [Key Files Explained](#5-key-files-explained)
6. [Quick Start (Local Dev)](#6-quick-start-local-dev)
7. [Configuration Guide](#7-configuration-guide)
8. [SEO Strategy](#8-seo-strategy)
9. [Deployment Guide](#9-deployment-guide)
10. [Adding Features](#10-adding-features)

---

## 1. Project Overview

| Layer      | Technology                     | Purpose                              |
|------------|-------------------------------|--------------------------------------|
| Frontend   | React 18 + Vite                | UI, routing, SEO meta tags           |
| Backend    | Node.js + Express              | Contact form API, email notifications |
| Styling    | Pure CSS with CSS Variables    | Design system, animations            |
| Fonts      | Outfit + DM Sans (Google)      | Display + body typography            |
| Email      | Nodemailer (SMTP)              | Lead notification emails             |
| SEO        | react-helmet-async + JSON-LD   | Dynamic meta tags + rich results     |

---

## 2. Folder Structure

```
hotaps/
├── client/                         # React frontend (Vite)
│   ├── public/
│   │   └── robots.txt              # Search engine crawl rules
│   ├── src/
│   │   ├── components/             # All UI sections
│   │   │   ├── Navbar.jsx/.css     # Sticky nav with mobile menu
│   │   │   ├── Hero.jsx/.css       # Full-screen landing section
│   │   │   ├── Services.jsx/.css   # Service cards grid
│   │   │   ├── WhyUs.jsx/.css      # USP feature cards
│   │   │   ├── Process.jsx/.css    # Numbered timeline steps
│   │   │   ├── Testimonials.jsx/.css  # Client review cards
│   │   │   ├── Contact.jsx/.css    # Form + contact info
│   │   │   └── Footer.jsx/.css     # Links, social, legal
│   │   ├── config/
│   │   │   └── site.config.js      # ⭐ THE main config file
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js  # IntersectionObserver hook
│   │   ├── App.jsx                 # Root component + routing
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles + design tokens
│   ├── index.html                  # SEO-optimized HTML shell
│   ├── vite.config.js              # Vite + proxy config
│   └── package.json
│
├── server/                         # Express backend
│   ├── config/
│   │   └── config.js               # Reads from .env
│   ├── routes/
│   │   └── contact.js              # POST /api/contact handler
│   └── index.js                    # Express app setup
│
├── .env.example                    # Template — copy to .env
├── .gitignore
├── package.json                    # Root: monorepo scripts
└── README.md
```

---

## 3. Design System

### Aesthetic Direction: "Dark Luxury Tech"

A high-end software agency aesthetic — deep space blacks, electric teal primary, purple secondary, glass morphism cards.

### Color Palette (CSS Variables in `index.css`)

| Variable           | Value       | Usage                           |
|--------------------|-------------|----------------------------------|
| `--bg-base`        | `#07070F`   | Page background                  |
| `--bg-surface`     | `#0D0D1A`   | Cards, sections                  |
| `--accent-teal`    | `#00C9A7`   | Primary CTA, highlights, icons   |
| `--accent-purple`  | `#845EF7`   | Secondary accent, gradients      |
| `--text-primary`   | `#F0F2F7`   | Headlines, important text        |
| `--text-secondary` | `#8892A4`   | Body text, descriptions          |
| `--border`         | `rgba(255,255,255,0.07)` | Card borders, dividers |

### Typography

| Font       | Style    | Used For                          |
|-----------|----------|-----------------------------------|
| **Outfit** | Display  | All headings (H1–H6), numbers     |
| **DM Sans** | Body    | Paragraphs, labels, UI elements  |

Both are loaded from Google Fonts in `index.html` with `preconnect` for performance.

### Components

- **`.glass-card`** — Frosted glass card (backdrop-filter blur + rgba background). Used for service cards, testimonials, process steps.
- **`.gradient-text`** — Teal→purple gradient applied to text. Used in section headings for emphasis.
- **`.btn-primary`** — Teal filled button with hover glow.
- **`.btn-secondary`** — Ghost/outline button.
- **`.btn-whatsapp`** — WhatsApp green button.
- **`.reveal` + `.revealed`** — Scroll animation: hidden → visible via IntersectionObserver.

---

## 4. Architecture

### How Requests Flow

```
Browser ──► React App (port 3000 in dev)
               │
               ├── Renders all UI sections
               ├── Reads config from site.config.js
               └── On contact form submit:
                     │
                     ▼
              POST /api/contact
                     │
                     ▼
           Express Server (port 5000)
               │
               ├── Rate limiter check (10 req/15min per IP)
               ├── Input validation (express-validator)
               ├── Send email to owner (nodemailer)
               ├── Send auto-reply to lead
               └── Return JSON success/error
```

### In Production (Single Process)

```
Browser ──► Express (port 5000 or $PORT)
               │
               ├── /api/*  → API routes (contact form, etc.)
               └── *       → Serves client/dist/index.html (React SPA)
```

Express serves the pre-built React app as static files. This means **one server process handles everything** — easy to deploy on a single VPS/EC2 instance.

### Vite Dev Proxy

During development, Vite proxies `/api/*` requests from port 3000 → port 5000 automatically. This is configured in `client/vite.config.js`:

```js
server: {
  proxy: {
    '/api': { target: 'http://localhost:5000', changeOrigin: true }
  }
}
```

---

## 5. Key Files Explained

### `client/src/config/site.config.js` ⭐

**This is your single source of truth.** Change all content here:

```js
SITE_CONFIG.contact.whatsapp   // WhatsApp number (with country code)
SITE_CONFIG.contact.phone      // Display phone number
SITE_CONFIG.services           // Add/remove/edit service cards
SITE_CONFIG.hero.stats         // Update statistics
SITE_CONFIG.testimonials       // Add/edit client reviews
```

### `client/index.html`

Contains static SEO meta tags that are set before React loads:
- Open Graph (Facebook, LinkedIn, WhatsApp previews)
- Twitter Card
- JSON-LD structured data (tells Google this is a software agency)
- Google Fonts preconnect

### `client/src/hooks/useScrollAnimation.js`

Uses `IntersectionObserver` to watch elements and add `.revealed` class when they enter the viewport. Elements need the `.reveal` class in CSS to start hidden.

```jsx
const ref = useScrollAnimation();
return <div ref={ref} className="reveal">...</div>
```

### `server/routes/contact.js`

Handles `POST /api/contact`:
1. Rate limits (10 submissions per IP per 15 min)
2. Validates fields with `express-validator`
3. Sends notification email to you (owner)
4. Sends auto-reply to the lead
5. Falls back to console.log if SMTP not configured

---

## 6. Quick Start (Local Dev)

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# 1. Clone / download the project
cd hotaps

# 2. Install all dependencies (root + client + server)
npm run install:all

# 3. Set up environment variables
cp .env.example .env
# Open .env in your editor and fill in your values

# 4. Start both dev servers simultaneously
npm run dev
```

This starts:
- React frontend → http://localhost:3000
- Express backend → http://localhost:5000
- API health check → http://localhost:5000/api/health

### Running Separately

```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

---

## 7. Configuration Guide

### Step 1 — Update Contact Details

Open `client/src/config/site.config.js`:

```js
contact: {
  whatsapp: '919876543210',   // ← Your number with country code
  phone: '+91 98765 43210',   // ← Display format
  email: 'hello@hotaps.com',  // ← Your business email
  address: 'Bengaluru, India' // ← Your city
},
```

### Step 2 — Set Up Email (Optional but Recommended)

Edit `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASSWORD=your_16_char_app_password
EMAIL_TO=leads@yourcompany.com
```

**For Gmail:** Go to Google Account → Security → 2-Step Verification → App Passwords → Create one for "Mail".

If SMTP is not configured, form submissions are logged to the console (handy for testing).

### Step 3 — Update Branding

In `site.config.js`:
```js
brand: {
  name: 'Your Company Name',
  shortName: 'YCN',
  tagline: 'Your tagline here.',
}
```

### Step 4 — Update Services

Edit the `services` array in `site.config.js`. Each service needs:
```js
{
  id: 'unique-id',      // Used for anchor/key
  icon: '⚛',           // Emoji icon
  title: '...',
  shortDesc: '...',     // One-liner shown on card by default
  description: '...',   // Full description shown on hover
  features: ['...'],    // Checklist items
  color: '#00BCD4',     // Accent color for this card's top bar
}
```

---

## 8. SEO Strategy

The site is built for top search rankings through:

### Technical SEO
- **Semantic HTML** — `<section>`, `<article>`, `<nav>`, `<main>` with ARIA labels
- **JSON-LD Schema** — Organization schema in `index.html` for rich results
- **Canonical URL** — Prevents duplicate content penalties
- **robots.txt** — In `client/public/robots.txt`
- **Fast loading** — Vite code splitting, lazy loading, preconnect for fonts
- **Mobile-first** — Fully responsive, passes Core Web Vitals

### On-Page SEO
- **Title tag** — Keyword-rich: "Node.js, React, AWS, Flutter Development"
- **Meta description** — Action-oriented with keywords
- **H1/H2 hierarchy** — Proper heading structure throughout
- **Image alt text** — All images/icons have descriptive aria-labels
- **Internal linking** — All nav links, footer links point to page sections

### Open Graph
Every social share (WhatsApp, LinkedIn, Twitter) shows:
- Custom title and description
- OG image (1200×630px — create this and put in `client/public/og-image.jpg`)

### Content SEO Tips
- Add a blog/resources section (great for technical SEO)
- Create individual service pages (`/nodejs-development`, etc.)
- Add location-specific landing pages if targeting local clients
- Get backlinks from directories: Clutch, GoodFirms, UpCity

---

## 9. Deployment Guide

### Option A — Single VPS / EC2 (Recommended)

```bash
# On your server:

# 1. Clone repo
git clone https://github.com/your/hotaps.git && cd hotaps

# 2. Install deps
npm run install:all

# 3. Build React
npm run build

# 4. Set env variables
cp .env.example .env
nano .env   # Fill in production values: NODE_ENV=production, SMTP_*, etc.

# 5. Start with PM2 (process manager — keeps app alive)
npm install -g pm2
pm2 start server/index.js --name hotaps
pm2 save
pm2 startup
```

Then set up Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name hotaps.com www.hotaps.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Add SSL with: `certbot --nginx -d hotaps.com -d www.hotaps.com`

### Option B — Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
```bash
cd client
npx vercel --prod
```

**Backend on Railway:**
- Push `server/` to GitHub
- Connect repo to Railway
- Set environment variables in Railway dashboard
- Update `ALLOWED_ORIGINS` to include your Vercel URL

### Option C — AWS (Scalable)

- Frontend → S3 + CloudFront (static hosting)
- Backend → Elastic Beanstalk or ECS
- Email → AWS SES (replace nodemailer SMTP with SES SDK)

---

## 10. Adding Features

### Add a New Section

1. Create `client/src/components/NewSection.jsx` and `NewSection.css`
2. Import and add it to `client/src/App.jsx`
3. Add a nav link in `Navbar.jsx`'s `NAV_LINKS` array

### Add a New API Route

1. Create `server/routes/yourroute.js`
2. Register it in `server/index.js`:
   ```js
   const yourRoute = require('./routes/yourroute');
   app.use('/api/yourroute', yourRoute);
   ```

### Add a New Page (e.g., /blog)

1. Create `client/src/pages/Blog.jsx`
2. Add route in `App.jsx`:
   ```jsx
   <Route path="/blog" element={<Blog />} />
   ```

### Switch to TypeScript

Rename `.jsx` files to `.tsx`, install `@types/react`, and add `tsconfig.json`. Vite supports TypeScript out of the box.

---

## Environment Variables Reference

| Variable         | Required | Description                               |
|------------------|----------|-------------------------------------------|
| `PORT`           | No       | Server port (default: 5000)               |
| `NODE_ENV`       | Yes (prod)| `production` or `development`            |
| `ALLOWED_ORIGINS`| No       | Comma-separated CORS origins              |
| `WHATSAPP_NUMBER`| No       | Used in server email templates            |
| `PHONE_NUMBER`   | No       | Used in server email templates            |
| `SMTP_HOST`      | No       | SMTP server hostname                      |
| `SMTP_PORT`      | No       | SMTP port (default: 587)                  |
| `SMTP_USER`      | No       | SMTP username / email                     |
| `SMTP_PASSWORD`  | No       | SMTP password / app password              |
| `EMAIL_FROM`     | No       | From name/address in sent emails          |
| `EMAIL_TO`       | No       | Where to receive lead notifications       |

---

## Tech Stack Summary

```
React 18          — UI framework
Vite 5            — Build tool (fast HMR in dev, optimized build in prod)
react-router-dom  — Client-side routing
react-helmet-async — Dynamic SEO meta tags
react-hot-toast   — Toast notifications
lucide-react      — Icons (optional)

Express 4         — Node.js web framework
helmet            — HTTP security headers
cors              — Cross-Origin Resource Sharing
express-validator — Input validation
express-rate-limit — API rate limiting
nodemailer        — Email sending (SMTP)
dotenv            — Environment variable loading
nodemon           — Auto-restart in development
```

---

Made with ❤️ by House of Technology — hotaps.com
