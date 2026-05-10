/**
 * server/index.js — Express Application Entry Point
 * ─────────────────────────────────────────────────────────────
 * Sets up:
 *  - Security headers (helmet)
 *  - CORS (allows React dev server and production domain)
 *  - JSON parsing
 *  - API routes (/api/contact, etc.)
 *  - Static file serving (serves the React build in production)
 *  - SPA fallback (all unknown routes → index.html)
 *
 * Development: React runs on :3000, server on :5000
 * Production:  Server serves the built React app AND the API on :5000 (or PORT env var)
 */
const express = require('express');
const path    = require('path');
const cors    = require('cors');
const helmet  = require('helmet');
const config  = require('./config/config');

// Route modules
const contactRoute = require('./routes/contact');

const app = express();

// ── Security Headers ─────────────────────────────────────────
// helmet() sets a bunch of sensible HTTP security headers automatically
app.use(
  helmet({
    // Allow inline scripts for React (needed for some meta tags)
    contentSecurityPolicy: false,
  })
);

// ── CORS ─────────────────────────────────────────────────────
// Only allows requests from the domains in config.allowedOrigins
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (config.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: ${origin} not allowed`));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// ── Body Parsing ──────────────────────────────────────────────
// Parses incoming JSON request bodies (required for contact form)
app.use(express.json({ limit: '10kb' }));      // Reject payloads > 10kb
app.use(express.urlencoded({ extended: true }));

// ── Logging ───────────────────────────────────────────────────
// Simple request logger — replace with winston/morgan in production
app.use((req, res, next) => {
  if (config.nodeEnv !== 'production') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

// ── API Routes ────────────────────────────────────────────────
// All API endpoints live under /api/
app.use('/api/contact', contactRoute);

// Health check endpoint — useful for load balancers / uptime monitors
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: config.nodeEnv,
  });
});

// ── Static Files (Production) ─────────────────────────────────
// In production, Express serves the compiled React app from client/dist/
// This means you only need to run this one server process.
if (config.isProduction) {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientBuildPath));

  // SPA Fallback: any route not caught by /api/* routes gets index.html
  // This allows React Router to handle client-side routing (e.g. /about, /blog)
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// ── Global Error Handler ──────────────────────────────────────
// Catches any unhandled errors from routes/middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: config.isProduction
      ? 'Something went wrong. Please try again.'
      : err.message,
  });
});

// ── Start Server ──────────────────────────────────────────────
app.listen(config.port, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log(`║  🚀 HoTaps Server running              ║`);
  console.log(`║  Port    : ${config.port}                       ║`);
  console.log(`║  Env     : ${config.nodeEnv.padEnd(12)}              ║`);
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  if (!config.isProduction) {
    console.log('  API: http://localhost:' + config.port + '/api/health');
    console.log('  React dev: http://localhost:3000');
    console.log('');
  }
});

module.exports = app;
