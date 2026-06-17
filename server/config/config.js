/**
 * Server Configuration
 * ─────────────────────────────────────────────────────────────
 * All server-side configuration is loaded from environment variables.
 * Never hardcode secrets — set them in your .env file (see .env.example).
 *
 * Priority:
 *   process.env value  →  fallback default
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const config = {

  // ── Server ──────────────────────────────────────────────────
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // ── CORS ────────────────────────────────────────────────────
  // In production, restrict to your actual domain
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:5173', 'https://hotaps.com'],

  // ── Contact / WhatsApp (configurable here OR in client's site.config.js) ──
  // These are used by the server to include in notification emails
  whatsappNumber: process.env.WHATSAPP_NUMBER || '919876543210',
  phoneNumber:    process.env.PHONE_NUMBER    || '+91 98765 43210',

  // ── Email (Nodemailer SMTP) ──────────────────────────────────
  // Set these in .env to enable email notifications for contact form submissions.
  // Supports Gmail (use App Password), SendGrid SMTP, Mailgun, etc.
  email: {
    host:     process.env.SMTP_HOST     || 'smtp.gmail.com',
    port:     parseInt(process.env.SMTP_PORT, 10) || 587,
    secure:   process.env.SMTP_SECURE   === 'true',   // true for port 465
    user:     process.env.SMTP_USER     || '',         // your@gmail.com
    password: process.env.SMTP_PASSWORD || '',         // App Password (not Gmail login)
    from:     process.env.EMAIL_FROM    || '"HoTaps Website" <no-reply@hotaps.com>',
    to:       process.env.EMAIL_TO      || 'business@houseoftechnology.co.in', // where to receive leads
  },

  // ── Rate Limiting ────────────────────────────────────────────
  // Prevents abuse of the contact form endpoint
  rateLimit: {
    windowMs:    15 * 60 * 1000,  // 15 minute window
    maxRequests: 10,              // Max 10 contact form submissions per IP per window
  },
};

module.exports = config;
