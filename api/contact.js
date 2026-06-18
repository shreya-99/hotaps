const nodemailer = require('nodemailer');

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const validate = ({ name, email, service }) => {
  if (!name?.trim() || name.trim().length < 2) return 'Full name is required.';
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'Valid email is required.';
  if (!service) return 'Please select a service.';
  return null;
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body || {};
  const error = validate({ name, email, service });
  if (error) return res.status(422).json({ success: false, message: error });

  const data = {
    name:    name.trim(),
    email:   email.trim(),
    phone:   phone?.trim() || '',
    service: service || '',
    message: message?.trim() || '',
  };

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
  const emailTo  = process.env.EMAIL_TO  || 'business@houseoftechnology.co.in';
  const emailFrom = process.env.EMAIL_FROM || '"House of Technology" <business@houseoftechnology.co.in>';
  const waNumber  = process.env.WHATSAPP_NUMBER || '919211845544';

  if (!smtpUser || !smtpPass) {
    console.warn('SMTP not configured — set SMTP_USER and SMTP_PASSWORD in Vercel env vars');
    return res.status(200).json({ success: true, message: 'Message received!' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host:       process.env.SMTP_HOST     || 'smtpout.secureserver.net',
      port:       parseInt(process.env.SMTP_PORT) || 587,
      secure:     process.env.SMTP_SECURE   === 'true',
      requireTLS: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from:    emailFrom,
      to:      emailTo,
      subject: `New Lead: ${data.name} — ${data.service || 'General Inquiry'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#00C9A7;padding:24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#07070F;margin:0;font-size:1.4rem;">New Project Inquiry</h1>
          </div>
          <div style="background:#0D0D1A;padding:32px;border-radius:0 0 8px 8px;color:#F0F2F7;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#8892A4;width:120px;">Name</td><td style="padding:10px 0;font-weight:600;">${escapeHtml(data.name)}</td></tr>
              <tr><td style="padding:10px 0;color:#8892A4;">Email</td><td style="padding:10px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#00C9A7;">${escapeHtml(data.email)}</a></td></tr>
              <tr><td style="padding:10px 0;color:#8892A4;">Phone</td><td style="padding:10px 0;">${escapeHtml(data.phone || 'Not provided')}</td></tr>
              <tr><td style="padding:10px 0;color:#8892A4;">Service</td><td style="padding:10px 0;">${escapeHtml(data.service)}</td></tr>
              <tr><td style="padding:10px 0;color:#8892A4;vertical-align:top;">Message</td><td style="padding:10px 0;line-height:1.6;">${escapeHtml(data.message || 'Not provided').replace(/\n/g, '<br>')}</td></tr>
            </table>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid #1A1A30;">
              <a href="https://wa.me/${waNumber}?text=Hi+${encodeURIComponent(data.name)}!"
                 style="background:#25D366;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">
                Reply on WhatsApp
              </a>
            </div>
            <p style="margin-top:16px;font-size:0.8rem;color:#4A5568;">
              Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>
        </div>
      `,
    });

    console.log(`Email sent for submission from ${data.email}`);
    return res.status(200).json({ success: true, message: 'Message received! We will get back to you within 24 hours.' });

  } catch (err) {
    console.error('Email error:', err.message, err.code);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try WhatsApp instead.' });
  }
};
