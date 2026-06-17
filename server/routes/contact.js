/**
 * Contact Route — POST /api/contact
 * ─────────────────────────────────────────────────────────────
 * Handles contact form submissions:
 *  1. Validates input (express-validator)
 *  2. Sends notification email to the business owner (nodemailer)
 *  3. Sends auto-reply email to the lead
 *  4. Returns JSON success/error response
 *
 * Rate-limited to prevent spam (see config.js).
 */
const express    = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const rateLimit  = require('express-rate-limit');
const config     = require('../config/config');

const router = express.Router();

// ── Rate Limiter ─────────────────────────────────────────────
// Applied to this route only — prevents spam submissions
const contactLimiter = rateLimit({
  windowMs:          config.rateLimit.windowMs,
  max:               config.rateLimit.maxRequests,
  standardHeaders:   true,
  legacyHeaders:     false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later or use WhatsApp.',
  },
});

// ── Nodemailer Transport ──────────────────────────────────────
// Created once at startup and reused — avoids per-request TCP+TLS handshake
let transporter = null;
if (config.email.user && config.email.password) {
  transporter = nodemailer.createTransport({
    host:   config.email.host,
    port:   config.email.port,
    secure: config.email.secure,
    pool:   true,   // keep connection alive between sends
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  });
  console.log(`📬 SMTP ready — ${config.email.host}:${config.email.port} as ${config.email.user}`);
} else {
  console.warn('⚠️  SMTP not configured. Set SMTP_USER and SMTP_PASSWORD in .env');
}

// ── Input Validation Rules ────────────────────────────────────
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name is too long'),

  body('email')
    .trim()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 }).withMessage('Message must be under 2000 characters'),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 }).withMessage('Phone number too long'),

  body('service')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }),
];

// ── HTML Email Templates ──────────────────────────────────────

/**
 * Notification email sent to the business owner when a lead comes in.
 */
const buildOwnerEmail = (data) => ({
  from:    config.email.from,
  to:      config.email.to,
  subject: `🔔 New Lead: ${data.name} — ${data.service || 'General Inquiry'}`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #00C9A7; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #07070F; margin: 0; font-size: 1.4rem;">New Project Inquiry</h1>
      </div>
      <div style="background: #0D0D1A; padding: 32px; border-radius: 0 0 8px 8px; color: #F0F2F7;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #8892A4; width: 120px;">Name</td>
            <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #8892A4;">Email</td>
            <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #00C9A7;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #8892A4;">Phone</td>
            <td style="padding: 10px 0;">${escapeHtml(data.phone || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #8892A4;">Service</td>
            <td style="padding: 10px 0;">${escapeHtml(data.service || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #8892A4; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; line-height: 1.6;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #1A1A30;">
          <a href="https://wa.me/${config.whatsappNumber}?text=Hi+${encodeURIComponent(data.name)}%2C+thanks+for+your+enquiry+about+${encodeURIComponent(data.service || 'our services')}!"
             style="background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
            Reply on WhatsApp
          </a>
        </div>
        <p style="margin-top: 16px; font-size: 0.8rem; color: #4A5568;">Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
    </div>
  `,
});


// ── Utility: HTML Escape ──────────────────────────────────────
// Prevents XSS if user data is ever reflected in HTML email
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

// ── POST /api/contact ─────────────────────────────────────────
router.post(
  '/',
  contactLimiter,
  validateContact,
  async (req, res) => {
    // 1. Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, email, phone, service, message } = req.body;
    const data = { name, email, phone, service, message };

    try {
      if (transporter) {
        console.log(`📤 Sending notification for submission from: ${email}`);
        const ownerInfo = await transporter.sendMail(buildOwnerEmail(data));
        console.log(`📧 Owner notification sent — messageId: ${ownerInfo.messageId}`);
      } else {
        console.log('📝 New contact form submission (SMTP not configured):');
        console.log(JSON.stringify(data, null, 2));
      }

      // 3. Success response
      return res.status(200).json({
        success: true,
        message: 'Message received! We will get back to you within 24 hours.',
      });

    } catch (error) {
      console.error('❌ Email error:', error.message);
      console.error('   Code:', error.code);
      console.error('   Response:', error.response);
      console.error('   Response code:', error.responseCode);
      console.error('   Full error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try WhatsApp instead.',
      });
    }
  }
);

module.exports = router;
