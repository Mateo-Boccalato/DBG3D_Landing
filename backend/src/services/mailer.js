import nodemailer from 'nodemailer'

const hasSmtp =
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.NOTIFY_EMAIL

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null

if (!transporter) {
  // Email is optional; DB persistence remains the critical path.
  console.warn('[mailer] SMTP not configured. Notification emails are disabled.')
}

async function send(subject, text) {
  if (!transporter) return
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NOTIFY_EMAIL,
      subject,
      text,
    })
  } catch (err) {
    console.warn('[mailer] Failed to send notification:', err?.message || err)
  }
}

export async function sendContactNotification(payload) {
  await send(
    'DBG3D Contact Submission',
    `New contact submission\n\nName: ${payload.name}\nEmail: ${payload.email}\nService: ${payload.service || 'n/a'}\n\nDetails:\n${payload.details}`,
  )
}

export async function sendYTNotification(payload) {
  await send(
    'DBG3D YouTube Submission',
    `New YouTube request\n\nName: ${payload.name}\nEmail: ${payload.email}\nType: ${payload.type}\nEpisode: ${payload.episode || 'n/a'}\n\nDetails:\n${payload.details || ''}`,
  )
}

export async function sendDownloadNotification(payload) {
  await send(
    'DBG3D Download Submission',
    `New download request\n\nName: ${payload.name}\nEmail: ${payload.email}\nFilename: ${payload.filename || 'n/a'}\nAgreed: ${payload.agreed ? 'yes' : 'no'}`,
  )
}

export async function sendEmailSignupNotification(payload) {
  await send(
    'DBG3D Email Signup',
    `New email signup\n\nEmail: ${payload.email}\nSource: ${payload.source || 'n/a'}`,
  )
}
