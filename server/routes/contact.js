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
// Lazily creates the transporter — so it doesn't crash if SMTP isn't configured
const createTransport = () => {
  if (!config.email.user || !config.email.password) {
    console.warn('⚠️  SMTP not configured. Emails will not be sent. Set SMTP_USER and SMTP_PASSWORD in .env');
    return null;
  }
  return nodemailer.createTransport({
    host:   config.email.host,
    port:   config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  });
};

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
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters'),

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

/**
 * Auto-reply email sent to the person who submitted the form.
 * Confirms receipt and points them to WhatsApp for faster response.
 */
const buildAutoReplyEmail = (data) => ({
  from:    config.email.from,
  to:      data.email,
  subject: `Thanks ${data.name}! We got your message — HoTaps`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #00C9A7, #845EF7); padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
        <div style="font-size: 2.5rem;">⬡</div>
        <h1 style="color: white; margin: 8px 0 0; font-size: 1.5rem;">House of Technology</h1>
      </div>
      <div style="background: #0D0D1A; padding: 40px 32px; border-radius: 0 0 8px 8px; color: #F0F2F7;">
        <h2 style="margin: 0 0 16px; font-size: 1.3rem;">Hi ${escapeHtml(data.name)}, we've received your message! 🎉</h2>
        <p style="color: #8892A4; line-height: 1.7;">
          Thank you for reaching out. Our team has received your inquiry about
          <strong style="color: #F0F2F7;">${escapeHtml(data.service || 'our services')}</strong>
          and will get back to you within <strong style="color: #00C9A7;">24 hours</strong>.
        </p>
        <p style="color: #8892A4; line-height: 1.7;">
          For a faster response, feel free to WhatsApp us directly:
        </p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="https://wa.me/${config.whatsappNumber}"
             style="background: #25D366; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem;">
            💬 WhatsApp Us Now
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #1A1A30; margin: 28px 0;" />
        <p style="font-size: 0.82rem; color: #4A5568; text-align: center; margin: 0;">
          House of Technology · hotaps.com · ${config.phoneNumber}
        </p>
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
      // 2. Attempt to send emails (non-blocking — website won't fail if SMTP isn't set)
      const transporter = createTransport();
      if (transporter) {
        // Send both emails in parallel
        await Promise.all([
          transporter.sendMail(buildOwnerEmail(data)),
          transporter.sendMail(buildAutoReplyEmail(data)),
        ]);
        console.log(`📧 Contact form: emails sent for ${email}`);
      } else {
        // Log to console as fallback when SMTP isn't set up
        console.log('📝 New contact form submission (SMTP not configured):');
        console.log(JSON.stringify(data, null, 2));
      }

      // 3. Success response
      return res.status(200).json({
        success: true,
        message: 'Message received! We will get back to you within 24 hours.',
      });

    } catch (error) {
      console.error('❌ Contact form error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try WhatsApp instead.',
      });
    }
  }
);

module.exports = router;
